import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/shared/DashboardCard";
import MenuOption from "../dashboard/components/MenuOption";
import PieArcLabel from "../dashboard/components/PieArcLabel";
import CustomDatePicker from "./component/CustomDatePicker";
import Loader from "../../components/Loader";
import StudentReportPage from "./StudentReportPage";
import Api from "../../services/constant";

function StudentReport() {
  const [selectedDate, setSelectedDate] = useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const [elementrySchoolData,setElementrySchoolData]= useState('')
  const [middleSchoolData,setMiddleSchoolDataSchoolData]= useState('')

  const getReports= async(filters,type)=>{

    let searchQuery = `?schoolType=${type}`;
    
    for (const key in filters) {
      if (
        filters[key] !== "" &&
        filters[key] !== "schoolType" 
        
      ) {
        searchQuery += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    }
    try {
      setIsLoading(true);
      const result = await getData(`${Api.listUsers}${searchQuery}`); //
      if (result.status == 200) {
        const response = result?.data;
        const tempData = response.map((item) => ({label:`${item?.language} Regitered Students`,value:item?.totalStudents,percentage:item?.percentage}));
        if(type=='Elementary'){
          setElementrySchoolData(tempData)
        }
        else if(type=='Middle'){
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
    const filter={
      
    }
    getReports(filter,'Elementary')
    getReports(filter,'Middle')
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
              <CustomDatePicker
                label="Select a date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            }
          >
            <PieArcLabel data={data} size={{ height: 280 }} />
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
            <PieArcLabel data={data2} size={{ height: 280 }} />
          </StudentReportPage>
        </>
      )}
    </>
  );
}

export default StudentReport;
