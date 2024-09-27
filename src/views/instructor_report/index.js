import {
  Box,
  Button,
  Grid,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UnifiedDatePicker from "../../components/YearMonthDayDatepicker";
import dayjs from "dayjs";
import InstructorReportTable from "./InstructorReportTable";
import { getData } from "../../services/services";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Api from "../../services/constant";
import { lowerCase, startCase } from "lodash";
import commonFunc from "../../utils/common";

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
  const getInstructorReport = async () => {
    let searchQuery = `?page=${page}&limit=${rowsPerPage}`;
    if (filter === "range") {
      if (startDate) {
        searchQuery += `&startDate=${startDate.format("DD-MM-YYYY")}`; // Add startDate if it's defined
      }
      if (endDate) {
        searchQuery += `&endDate=${endDate.format("DD-MM-YYYY")}`; // Add endDate if it's defined
      }
    } else {
      const date = getFormattedDate(selectedDate);
      searchQuery += `&${filter}=${date}`;
    }
    try {
      setIsLoading(true);
      const result = await getData(`${Api.instructorReport}${searchQuery}`);
      // const result = {
      //   status: 200,
      //   message: "Successfully retrieved user credit purchase details",
      //   data: [
      //     {
      //       availableCredits: 15,
      //       assignedCredits: 100,
      //       usedCredits: 0,
      //       userDetails: {
      //         _id: "AT4jSZtTs0",
      //         email: "mailto:sarge6340@gmail.com",
      //         userRole: "Instructor",
      //         firstName: "Kenneth",
      //         lastName: "Straughter",
      //         username: "kstraughter",
      //         accountApproved: false,
      //         isInitialized: true,
      //         displayName: "Kenneth Straughter",
      //         _hashed_password:
      //           "$2b$10$czQkFQt3gMSXzaylqq1Y6uR4J24qdK6lLN/uSuiG82L1S9ZGPzunG",
      //         _email_verify_token: "A4tGVUaBVKvdzdIg1l88igHAi",
      //         emailVerified: false,
      //         _wperm: ["AT4jSZtTs0"],
      //         _rperm: ["*", "AT4jSZtTs0"],
      //         _acl: {
      //           AT4jSZtTs0: {
      //             w: true,
      //             r: true,
      //           },
      //           "*": {
      //             r: true,
      //           },
      //         },
      //         _created_at: "2016-07-18T20:36:16.062Z",
      //         _updated_at: "2017-03-27T18:56:13.016Z",
      //       },
      //       purchaseDetails: {
      //         numCredits: 100,
      //         description: "Credits bonus for 100 Workbook Session Credits",
      //         type: "BONUS",
      //         createdAt: "2024-09-25T06:26:31.343Z",
      //       },
      //     },
      //     {
      //       availableCredits: 15,
      //       assignedCredits: 100,
      //       usedCredits: 0,
      //       userDetails: {
      //         _id: "AT4jSZtTs0",
      //         email: "mailto:sarge6340@gmail.com",
      //         userRole: "Instructor",
      //         firstName: "Kenneth",
      //         lastName: "Straughter",
      //         username: "kstraughter",
      //         accountApproved: false,
      //         isInitialized: true,
      //         displayName: "Kenneth Straughter",
      //         _hashed_password:
      //           "$2b$10$czQkFQt3gMSXzaylqq1Y6uR4J24qdK6lLN/uSuiG82L1S9ZGPzunG",
      //         _email_verify_token: "A4tGVUaBVKvdzdIg1l88igHAi",
      //         emailVerified: false,
      //         _wperm: ["AT4jSZtTs0"],
      //         _rperm: ["*", "AT4jSZtTs0"],
      //         _acl: {
      //           AT4jSZtTs0: {
      //             w: true,
      //             r: true,
      //           },
      //           "*": {
      //             r: true,
      //           },
      //         },
      //         _created_at: "2016-07-18T20:36:16.062Z",
      //         _updated_at: "2017-03-27T18:56:13.016Z",
      //       },
      //       purchaseDetails: {
      //         numCredits: 100,
      //         description: "Credits bonus for 100 Workbook Session Credits",
      //         type: "BONUS",
      //         createdAt: "2024-09-25T06:26:31.343Z",
      //       },
      //     },
      //   ],
      //   success: true,
      //   error: false,
      // };
      if (result.success) {
        const response = result?.data;
        const tempData = response.map((item) => ({
          instructorName: item?.userDetails?.displayName,
          date: dayjs(item?.purchaseDetails.createdAt).format("DD-MM-YYYY"),
          activityType: startCase(lowerCase(item?.purchaseDetails?.type)),
          creditsPurchased: item?.purchaseDetails?.numCredits,
          creditsTransferredIn: 50,
          creditsTransferredOut: 0,
          remainingCredits: item?.availableCredits,
          transferredTo: "N/A",
          transferredFrom: "Instructor D",
        }));

        setListData(tempData);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const downLoadInstructorReport = async () => {
    try {
      const params = new URLSearchParams();
  
      // Add pagination params if defined
      // if (page !== undefined) params.append("page", page);
      // if (rowsPerPage !== undefined) params.append("limit", rowsPerPage);
  
      // Handle date range or other filters
      if (filter === "range") {
        if (startDate) params.append("startDate", startDate.format("DD-MM-YYYY"));
        if (endDate) params.append("endDate", endDate.format("DD-MM-YYYY"));
      } else {
        const date = getFormattedDate(selectedDate);
        params.append(filter, date);
      }
  
      // Construct the full URL with query params
      const result = await getData(`${Api.instructorReportExport}?${params.toString()}`);
  
      console.log("result", result);
      // Optionally download the CSV
      commonFunc.DownloadCSV(result, "Instructor Report");
    } catch (error) {
      console.error(error);
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
  useEffect(() => {
    // const pagination = {
    //   page,
    //   rowsPerPage,
    //   // search: debouncedSearchTerm,
    //   userRole,
    //   sortBy: orderBy,
    //   sortOrder: order,
    // };
    getInstructorReport();
  }, []);

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
          <Box display={"flex"} justifyContent={"start"}>
            <>
              <InputBase
                sx={{
                  border: "1px solid grey", // Adds a border to all sides
                  paddingX: "5px", // Padding inside the input
                  paddingY: "2px",
                  borderRadius: "4px", // Optional: Adds rounded corners
                  width: "400px",
                  height: "53px",
                }}
                //  value={searchTerm}
                //  onChange={(e)=>handleChangeSearch(e?.target?.value)}
                placeholder="Search"
              />
            </>
            <Box marginLeft={"20px"}>
              <Tooltip title=" Download Instructor Report">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="button"
                  sx={{ height: "53px" }}
                  onClick={downLoadInstructorReport}
                >
                  <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                    Export
                  </Typography>
                  <FileDownloadIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>

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
        <InstructorReportTable
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          listData={listData}
          tableFields={tableFields}
        />
      </Box>
    </>
  );
}

export default InstructorReport;
