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
import Loader from "../../components/Loader";

function InstructorReport() {
  //constant

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
  //all states
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filter, setFilter] = useState("day");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [totalCount, setTotalCount] = useState("");
  const getFormattedDate = (date) => {
    let formattedDate;

    if (date) {
      switch (filter) {
        case "day":
          formattedDate = date.format("YYYY-MM-DD"); // Format for day view
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
        searchQuery += `&startDate=${startDate.format("YYYY-MM-DD")}`; // Add startDate if it's defined
      }
      if (endDate) {
        searchQuery += `&endDate=${endDate.format("YYYY-MM-DD")}`; // Add endDate if it's defined
      }
    } else {
      const date = getFormattedDate(selectedDate);
      searchQuery += `&${filter}=${date}`;

      if (filter == "month") {
        const year = selectedDate.format("YYYY");
        searchQuery += `&year=${year}`;
      }
    }

    if (debouncedSearchTerm) {
      searchQuery += `&search=${debouncedSearchTerm}`;
    }

    try {
      setIsLoading(true);
      const result = await getData(`${Api.instructorReport}${searchQuery}`);

      if (result.success) {
        const response = result?.data?.results;
        const tempData = response?.map((item) => ({
          instructorName: item?.userDetails?.displayName,
          date: dayjs(item?.purchaseDetails.createdAt).format("DD-MM-YYYY"),
          activityType: startCase(lowerCase(item?.purchaseDetails?.type)),
          creditsPurchased: commonFunc.formatNumberWithCommas(
            item?.purchaseDetails?.numCredits
          ),
          creditsTransferredIn:
            commonFunc.formatNumberWithCommas(
              item?.incomingTransfers?.numCredits
            ) ?? "-",
          creditsTransferredOut:
            commonFunc.formatNumberWithCommas(
              item?.creditTransfers?.numCredits
            ) ?? "-",
          remainingCredits: commonFunc.formatNumberWithCommas(
            item?.availableCredits
          ),
          transferredTo: item?.creditTransfers?.destinationUser ?? "-",
          transferredFrom: item?.incomingTransfers?.incomingSourceUser ?? "-",
        }));
        setTotalCount(result?.data?.pagination?.totalDocuments);

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
      // const params = new URLSearchParams();

      // Add pagination params if defined
      // if (page !== undefined) params.append("page", page);
      // if (rowsPerPage !== undefined) params.append("limit", rowsPerPage);

      // Handle date range or other filters
      // if (filter === "range") {
      //   if (startDate)
      //     params.append("startDate", startDate.format("DD-MM-YYYY"));
      //   if (endDate) params.append("endDate", endDate.format("DD-MM-YYYY"));
      // } else {
      //   const date = getFormattedDate(selectedDate);
      //   params.append(filter, date);
      // }

      // Construct the full URL with query params
      // const result = await getData(
      //   `${Api.instructorReportExport}?${params.toString()}`
      // );

      let searchQuery = `?page=${page}&limit=${rowsPerPage}`;
      if (filter === "range") {
        if (startDate) {
          searchQuery += `&startDate=${startDate.format("YYYY-MM-DD")}`; // Add startDate if it's defined
        }
        if (endDate) {
          searchQuery += `&endDate=${endDate.format("YYYY-MM-DD")}`; // Add endDate if it's defined
        }
      } else {
        const date = getFormattedDate(selectedDate);
        searchQuery += `&${filter}=${date}`;

        if (filter == "month") {
          const year = selectedDate.format("YYYY");
          searchQuery += `&year=${year}`;
        }
      }

      if (debouncedSearchTerm) {
        searchQuery += `&search=${debouncedSearchTerm}`;
      }

      const result = await getData(
        `${Api.instructorReportExport}${searchQuery}`
      );

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
    getInstructorReport();
  }, [
    startDate,
    endDate,
    selectedDate &&selectedDate,
    debouncedSearchTerm,
    page,
    rowsPerPage,
  ]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            border: "2px solid",
            color: "#0055a4",
            padding: 2,
            position: "relative",
            borderRadius: 2,
            width: {
              xs: "90%",
              sm: "90%",
              md: 950,
              lg: 1050,
              xl: "100%",
            },
            maxWidth: 1050,
            margin: "auto",
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
            <Typography
              variant="h6"
              fontWeight={600}
              component="label"
              htmlFor="mailingAddress"
            >
              Instructor Report
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }} // Stack on small screens, row on larger screens
            justifyContent={"space-between"}
            alignItems={"end"}
            marginBottom={"10px"}
          >
            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              flexGrow={1}
            >
              <InputBase
                sx={{
                  border: "1px solid grey",
                  paddingX: "5px",
                  paddingY: "2px",
                  borderRadius: "4px",
                  width: { xs: "100%", sm: "40ch" }, // Full width on mobile, 40ch on larger screens
                  marginRight: "20px",
                  height: "53px",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
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
            tableFields={tableFields}
          />
        </Box>
      )}
    </>
  );
}

export default InstructorReport;
