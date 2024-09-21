import { Box, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import UnifiedDatePicker from "../../components/YearMonthDayDatepicker";
import dayjs from "dayjs";
import InstructorReportTable from "./InstructorReportTable";

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
  const [listData, setListData] = useState(instructorCreditActivityReport);
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
            />
          </Box>
        </Box>
        <InstructorReportTable listData={listData} tableFields={tableFields} />
      </Box>
    </>
  );
}

export default InstructorReport;
