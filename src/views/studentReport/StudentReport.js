import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/shared/DashboardCard";
import MenuOption from "../dashboard/components/MenuOption";
import PieArcLabel from "../dashboard/components/PieArcLabel";
import CustomDatePicker from "./component/CustomDatePicker";
import Loader from "../../components/Loader";
import StudentReportPage from "./StudentReportPage";
import Api from "../../services/constant";
// import UnifiedDatePicker from "../../components/PDatePicker";
import UnifiedDatePicker from "../../components/YearMonthDayDatepicker";
import PDatePicker from "../../components/PDatePicker";
import { getData } from "../../services/services";
import dayjs from 'dayjs';

function StudentReport() {
  const currentYear = dayjs().year();
const [selectedDate, setSelectedDate] = useState(null);
  const [filter,setFilter]=useState('year')
  const [isLoading, setIsLoading] = React.useState(false);
 

  const [elementrySchoolData,setElementrySchoolData]= useState([])
  const [middleSchoolData,setMiddleSchoolDataSchoolData]= useState([])

  const getFormatedDate = (date) => {
    let formattedDate;
    
    if (date) {
      switch (filter) {
        case "day":
          formattedDate = date.format("DD-MM-YYYY"); // Format for day view
          break;
        case "month":
          formattedDate = date.format("DD-MM"); // Format for month view
          break;
        case "year":
          formattedDate = date.format("YYYY"); // Format for year view
          break;
        default:
          currentYear
          break;
      }
      return formattedDate;
    } else {
      return currentYear
    }
  };
  const getReports= async(type)=>{
const date=getFormatedDate(selectedDate)
    let searchQuery = `?schoolType=${type}&${filter}=${date}`;
    try {
      setIsLoading(true);
      const result = await getData(`${Api.studentReports}${searchQuery}`); //
      if (result.status == 200) {
        const response = result?.data;
        const tempData = response.map((item) => ({label:`${item?.language} Regitered Students`,value:item?.totalStudents,percentage:item?.percentage}));
        if(type=='Elementary'){
          setElementrySchoolData(tempData)
        }
        else if(type=='Middle School'){
           setMiddleSchoolDataSchoolData(tempData)
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  const data = [
    { value: 25, label: " English Registered Students" ,percentage:20},
    { value: 33, label: " Spanish Registered Students",percentage:50 },
    // { value: 25, label: 'Elementary Portuguese Workbook Stude' },
    { value: 17, label: "French Registered Students" ,percentage:90},
  ];
  const data2 = [
    { value: 25, label: " English Registered Students" ,percentage:20},
  ];

  useEffect(()=>{
    
    getReports('Elementary')
    getReports('Middle School')
  },
[selectedDate])
  return (
    <>
      {/* <Typography variant="h2">Elementary Student Report</Typography> */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StudentReportPage
            title={"Elementary Students Report"}
            action={
              <>
              {/* <PDatePicker
                label="Select a date"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                /> */}
              <UnifiedDatePicker
                label="Select a date"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setFilter={setFilter}
                />
                </>
            }
          >
            <PieArcLabel data={elementrySchoolData} size={{ height: 280 }} />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                <Typography variant="h5">Middle Students Report</Typography>
              </Box>
            </Stack>
            <PieArcLabel data={middleSchoolData} size={{ height: 280 }} />
          </StudentReportPage>
        </>
      )}
    </>
  );
}

export default StudentReport;
