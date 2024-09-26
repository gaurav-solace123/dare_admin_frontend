import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "src/components/Loader";
import StudentReportPage from "./StudentReportPage";
import Api from "src/services/constant";
import UnifiedDatePicker from "src/components/YearMonthDayDatepicker";
import { getData } from "src/services/services";
import dayjs from "dayjs";
import PieChartStudentReports from "./component/PieChartStudentReports";

function StudentReport() {
  //all constants
  const colors = ["#74D3AE", "#DDBDD5", "#52D1DC"];
  //all states
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const [elementarySchoolData, setElementarySchoolData] = useState([]);
  const [middleSchoolData, setMiddleSchoolDataSchoolData] = useState([]);
  const calendarTabs = [
    { value: "day", label: "Day" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
    { value: "range", label: "Range" },
  ];
  const getFormattedDate = (date) => {
    let formattedDate;

    if (date) {
      switch (filter) {
        case "day":
          formattedDate = date.format("DD-MM-YYYY"); // Format for day view
          break;
        case "month":
          formattedDate = date.format("MM"); // Format for month view
          break;
        case "year":
          formattedDate = date.format("YYYY"); // Format for year view
          break;
        default:
          dayjs().format("DD-MM-YYYY");
          break;
      }
      return formattedDate;
    } else {
      return dayjs().format("DD-MM-YYYY");
    }
  };
  const getReports = async (type) => {
    let searchQuery = `?schoolType=${type}`;
    if (filter === 'range') {
      if (startDate) {

        searchQuery += `&startDate=${startDate.format("DD-MM-YYYY")}`; // Add startDate if it's defined
      }
      if (endDate) {
        searchQuery += `&endDate=${endDate.format("DD-MM-YYYY")}`; // Add endDate if it's defined
      }
    }
    else{

      const date = getFormattedDate(selectedDate);
      searchQuery+= `&${filter}=${date}`;

    }
    // let searchQuery = `?schoolType=${type}&${filter}=${date}`;
    try {
      setIsLoading(true);
      const result = await getData(`${Api.studentReports}${searchQuery}`); //
      if (result.status == 200) {
        const response = result?.data.sort((a, b) =>
          a.language.localeCompare(b.language)
        );
        const tempData = response.map((item) => ({
          label: `${item?.language} Workbook Students`,
          value: item?.totalStudents,
          percentage: Math.round(item?.percentage),
        }));
        const updatedData = tempData.map((item, index) => ({
          ...item,
          color: colors[index % colors.length], // Use modulo to ensure index doesn't go out of bounds
        }));

        if (type == "Elementary") {
          setElementarySchoolData(updatedData);
        } else if (type == "Middle School") {
          setMiddleSchoolDataSchoolData(updatedData);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const data = [
    { value: 25, label: " English Registered Students", percentage: 20 },
    { value: 33, label: " Spanish Registered Students", percentage: 50 },
    // { value: 25, label: 'Elementary Portuguese Workbook Stude' },
    { value: 17, label: "French Registered Students", percentage: 90 },
  ];
  const data2 = [
    { value: 25, label: " English Registered Students", percentage: 20 },
  ];

  useEffect(() => {
    getReports("Elementary");
    getReports("Middle School");
  }, [selectedDate,startDate,endDate]);
  return (
    <>
      {/* <Typography variant="h2">Elementary Student Report</Typography> */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              border: "2px solid",
              color: "#0055a4",
              padding: 2,
              position: "relative",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-12px", // Adjust this to make the text overlap more or less with the border
                left: "16px",
                backgroundColor: "#fff",
                padding: "0 8px",
                display: "inline-block",
                // color: 'red', // To match the border color
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <Typography
                variant="h7"
                fontWeight={600}
                component="label"
                htmlFor="mailingAddress"
              >
                Students Report
              </Typography>
            </Box>

            <StudentReportPage
              title={"Elementary"}
              action={
                <Box display={"flex"} justifyContent={"end"}>
                  <UnifiedDatePicker
                    label="Select a date"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setFilter={setFilter}
                    filter={filter}
                    calendarTabs={calendarTabs}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </Box>
              }
            >
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    p={"15px"}
                    boxShadow={
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;"
                    }
                  >
                    <Typography variant="h3" align="center" fontWeight={"500"}>
                      Elementary School
                    </Typography>

                    <PieChartStudentReports
                      data={elementarySchoolData}
                      size={{ height: 280 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    p={"15px"}
                    height={"100%"}
                    boxShadow={
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;"
                    }
                  >
                    <Typography variant="h3" align="center" fontWeight={"500"}>
                      Middle School
                    </Typography>

                    <PieChartStudentReports
                      data={middleSchoolData}
                      size={{ height: 280 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </StudentReportPage>
          </Box>
        </>
      )}
    </>
  );
}

export default StudentReport;
