import {
  Box,
  Button,
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
  // Constants
  const tableFields = [
    "instructorName",
    "date",
    "activityType",
    "creditsPurchased",
    "creditsTransferredIn",
    "creditsTransferredOut",
    "remainingCredits",
    "transferredFrom",
    "transferredTo",
  ];

  const calendarTabs = [
    { value: "day", label: "Day" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
    { value: "range", label: "Range" },
  ];

  // All states
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filter, setFilter] = useState("day");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [isExportDisabled, setIsExportDisabled] = useState(true);

  const [order, setOrder] = useState("desc");
  const getFormattedDate = (date) => {
    if (!date) return dayjs().format("DD-MM-YYYY");

    switch (filter) {
      case "day":
        return date.format("YYYY-MM-DD");
      case "month":
        return date.format("MM");
      case "year":
        return date.format("YYYY");
      default:
        return dayjs().format("DD-MM-YYYY");
    }
  };

  const getInstructorReport = async () => {
    let searchQuery = `?page=${page}&limit=${rowsPerPage}&sortOrder=${order}`;
    
    if (filter === "range") {
      if (startDate) searchQuery += `&startDate=${startDate.format("YYYY-MM-DD")}`;
      if (endDate) searchQuery += `&endDate=${endDate.format("YYYY-MM-DD")}`;
    } else {
      const date = getFormattedDate(selectedDate);
      searchQuery += `&${filter}=${date}`;
      if (filter === "month") {
        const year = selectedDate.format("YYYY");
        searchQuery += `&year=${year}`;
      }
    }

    if (debouncedSearchTerm) {
      searchQuery += `&search=${debouncedSearchTerm}`;
    }

    try {
      setIsLoading(true);
      setIsExportDisabled(true)
      const result = await getData(`${Api.instructorReport}${searchQuery}`);
      
      if (result.success) {
        
        const response = result.data.results;
        const tempData = response.map((item) => ({
          instructorName: item.userDetails.displayName,
          date: commonFunc.dateFormatWithLocale(item?.purchaseDetails?.createdAt),
          activityType: startCase(lowerCase(item.purchaseDetails.type)),
          creditsPurchased: commonFunc.formatNumberWithCommas(item.purchaseDetails.numCredits),
          creditsTransferredIn: commonFunc.formatNumberWithCommas(item.incomingTransfers?.numCredits) ?? "-",
          creditsTransferredOut: commonFunc.formatNumberWithCommas(item.creditTransfers?.numCredits) ?? "-",
          remainingCredits: commonFunc.formatNumberWithCommas(item.availableCredits),
          transferredTo: item.creditTransfers?.destinationUser ?? "-",
          transferredFrom: item.incomingTransfers?.incomingSourceUser ?? "-",
        }));
        const tempCount= result.data.pagination.totalDocuments
        setTotalCount(tempCount);
        if(tempCount>0){
          setIsExportDisabled(false)
        }
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
      let searchQuery = `?page=${page}&limit=${rowsPerPage}&sortOrder=${order}`;
      if (filter === "range") {
        if (startDate) searchQuery += `&startDate=${startDate.format("YYYY-MM-DD")}`;
        if (endDate) searchQuery += `&endDate=${endDate.format("YYYY-MM-DD")}`;
      } else {
        const date = getFormattedDate(selectedDate);
        searchQuery += `&${filter}=${date}`;
        if (filter === "month") {
          const year = selectedDate.format("YYYY");
          searchQuery += `&year=${year}`;
        }
      }

      if (debouncedSearchTerm) {
        searchQuery += `&search=${debouncedSearchTerm}`;
      }
      setIsExportDisabled(true)
      const result = await getData(`${Api.instructorReportExport}${searchQuery}`);
      setIsLoading(false);
      setIsExportDisabled(false)
      commonFunc.DownloadCSV(result, "Instructor Report");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 900); // Debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    getInstructorReport();
  }, [startDate, endDate, selectedDate, debouncedSearchTerm, page, rowsPerPage,filter,order]);


  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
        <Box
          sx={{
            border: "2px solid",
            color: "#0055a4",
            padding: 2,
            position: "relative",
            borderRadius: 2,
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "85%",
              xl: "100%",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-12px",
              left: "16px",
              backgroundColor: "#fff",
              padding: "0 8px",
              display: "inline-block",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Instructor Report
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            alignItems={"end"}
            marginBottom={"10px"}
          >
            <Box display={"flex"} justifyContent={"start"} alignItems={"center"} flexGrow={1}>
              <InputBase
                sx={{
                  border: "1px solid grey",
                  paddingX: "5px",
                  paddingY: "2px",
                  borderRadius: "4px",
                  width: { xs: "100%", sm: "40ch" },
                  marginRight: "20px",
                  height: "53px",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
              />
              <Tooltip title="Download Instructor Report">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="button"
                  sx={{ height: "53px" }}
                  onClick={downLoadInstructorReport}
                  disabled={isExportDisabled} // Disable based on search results
                >
                  <Typography variant="h6">Export</Typography>
                  <FileDownloadIcon />
                </Button>
              </Tooltip>
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
            totalCount={totalCount}
            order={order}
            setOrder={setOrder}
            tableFields={tableFields}
            isLoading={isLoading}
            searchTerm={searchTerm} // Pass searchTerm if needed in the table
          />
        </Box>
      {/* // )} */}
    </>
  );
}

export default InstructorReport;
