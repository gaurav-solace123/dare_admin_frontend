import { Box, InputBase, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UnifiedDatePicker from "../../components/YearMonthDayDatepicker";
import dayjs from "dayjs";
import InstructorReportTable from "./InstructorReportTable";
import { getData } from "../../services/services";
import Api from "../../services/constant";

function InstructorReport() {
  //constant
  const instructorCreditActivityReport = [
    {
      instructorName: "John Doe",
      date: "2023-09-01",
      activityType: "Purchase",
      creditsPurchased: 200,
      creditsTransferredIn: 0,
      creditsTransferredOut: 0,
      remainingCredits: 200,
      transferredTo: "N/A",
      transferredFrom: "N/A",
    },
    {
      instructorName: "John Doe",
      date: "2023-09-05",
      activityType: "Transfer Out",
      creditsPurchased: 0,
      creditsTransferredIn: 0,
      creditsTransferredOut: 50,
      remainingCredits: 150,
      transferredTo: "Instructor A",
      transferredFrom: "N/A",
    },
    {
      instructorName: "John Doe",
      date: "2023-09-10",
      activityType: "Purchase",
      creditsPurchased: 100,
      creditsTransferredIn: 0,
      creditsTransferredOut: 0,
      remainingCredits: 250,
      transferredTo: "N/A",
      transferredFrom: "N/A",
    },
    {
      instructorName: "John Doe",
      date: "2023-09-12",
      activityType: "Transfer In",
      creditsPurchased: 0,
      creditsTransferredIn: 30,
      creditsTransferredOut: 0,
      remainingCredits: 280,
      transferredTo: "N/A",
      transferredFrom: "Instructor B",
    },
    {
      instructorName: "John Doe",
      date: "2023-09-15",
      activityType: "Transfer Out",
      creditsPurchased: 0,
      creditsTransferredIn: 0,
      creditsTransferredOut: 60,
      remainingCredits: 220,
      transferredTo: "Instructor C",
      transferredFrom: "N/A",
    },
    {
      instructorName: "John Doe",
      date: "2023-09-18",
      activityType: "Purchase",
      creditsPurchased: 150,
      creditsTransferredIn: 0,
      creditsTransferredOut: 0,
      remainingCredits: 370,
      transferredTo: "N/A",
      transferredFrom: "N/A",
    },
    {
      instructorName: "Jane Smith",
      date: "2023-09-02",
      activityType: "Purchase",
      creditsPurchased: 150,
      creditsTransferredIn: 0,
      creditsTransferredOut: 0,
      remainingCredits: 150,
      transferredTo: "N/A",
      transferredFrom: "N/A",
    },
    {
      instructorName: "Jane Smith",
      date: "2023-09-07",
      activityType: "Transfer In",
      creditsPurchased: 0,
      creditsTransferredIn: 50,
      creditsTransferredOut: 0,
      remainingCredits: 200,
      transferredTo: "N/A",
      transferredFrom: "Instructor D",
    },
  ];

  const tableFields = [
    "instructorName",
    "date",
    "activityType",
    "creditsPurchased",
    "creditsTransferredIn",
    "creditsTransferredOut",
    "remainingCredits",
    "transferredTo",
    "transferredTo",
  ];

  const calendarTabs = [
    { value: "day", label: "Day" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
    { value: "range", label: "Range" },
  ];
  //all states
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filter, setFilter] = useState("day");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState(instructorCreditActivityReport);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
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
        setListData(updatedData)
        
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust delay (500ms in this case) as needed

    // Cleanup function to clear the timeout if searchTerm changes within the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  // useEffect(() => {
    
  //   const pagination = {
  //     page,
  //     rowsPerPage,
  //     search: debouncedSearchTerm,
  //     userRole,
  //     sortBy: orderBy,
  //     sortOrder: order,
  //   };
  //   getListData(pagination);
  // }, [page, rowsPerPage, userRole,order,orderBy,debouncedSearchTerm,role]);

  
  return (
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
            Instructor Report
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"end"}
          marginBottom={"10px"}
        >
          <InputBase
            sx={{
              border: "1px solid grey", // Adds a border to all sides
              paddingX: "5px", // Padding inside the input
              paddingY: "2px",
              borderRadius: "4px", // Optional: Adds rounded corners
              width: "50%",
              height:'53px'
            }}
            //  value={searchTerm}
            //  onChange={(e)=>handleChangeSearch(e?.target?.value)}
            placeholder="Search"
          />
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
        </Box>
        <InstructorReportTable listData={listData} tableFields={tableFields} />
      </Box>
    </>
  );
}

export default InstructorReport;
