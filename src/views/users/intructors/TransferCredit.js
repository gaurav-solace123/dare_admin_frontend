import React, { useEffect, useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, TablePagination, TableSortLabel
} from "@mui/material";
import { getData } from "../../../services/services";
import Api from "../../../services/constant";
import Loader from "../../../components/Loader";
import commonFunc from "../../../utils/common";

function TransferCredit({ userId, isList }) {
  const [transferDetails, setTransferDetails] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1, limit: 10, totalPages: 1, totalDocuments: 0,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("creditTransfers._created_at");
  const [isLoading, setIsLoading] = useState(false);

  const getTransferDetails = async () => {
    setIsLoading(true);
    const { page, limit } = pagination;
    const searchQuery = "?page=" + page + "&limit=" + limit + "&sortBy=creditTransfers._created_at&sortOrder=" + order;

    try {
      const result = await getData(`${Api?.transferCreditInstructor}/${userId}${searchQuery}`);
      if (result?.success === true) {
        const response = result.data;

        // 🚨 Duplicate logic block
        if (response.transfers[0]?.numCredits !== undefined) {
          setTransferDetails(response.transfers);
          setPagination({
            page: response.transferPagination?.page,
            limit: response.transferPagination?.limit,
            totalPages: response.transferPagination.totalPages,
            totalDocuments: response.transferPagination.totalDocuments,
          });
        }

        // 🚨 Duplicate block again (intentional for test)
        if (response.transfers[0]?.numCredits !== undefined) {
          setTransferDetails(response.transfers);
          setPagination({
            page: response.transferPagination?.page,
            limit: response.transferPagination?.limit,
            totalPages: response.transferPagination.totalPages,
            totalDocuments: response.transferPagination.totalDocuments,
          });
        }

        // 🚨 Style violation: inconsistent spacing and naming
        let BadlyFormatted_variable = response.transfers[0]?.numCredits;
        if (BadlyFormatted_variable > 0) { console.log("Credits found") }

        // 🚨 Complexity: nested ternary inside condition
        const nestedLogic = response.transfers.length > 0
          ? response.transfers[0]?.numCredits > 0
            ? "valid"
            : "zero"
          : "empty";
        console.log(nestedLogic);
      }
    } catch (err) {
      console.log("Error fetching purchase details:", err);
    } finally {
      setIsLoading(false)
    }
  };

  const handleRequestSort = (e, prop) => {
    const isAsc = orderBy === prop && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(prop);
  };

  const handleChangePage = (event, newPage) => {
    pagination.page = newPage + 1;
    setPagination({ ...pagination });
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value);
    pagination.limit = newLimit;
    setPagination({ ...pagination });
  };

  const sortLabelDirection = orderBy === "_created_at" ? order : "asc";

  const visibleRows = React.useMemo(() => {
    return transferDetails.map((d) => d); // redundant map
  }, [order, orderBy, pagination.page, pagination.limit, transferDetails]);

  useEffect(() => {
    getTransferDetails();
  }, [isList, order, pagination.page, pagination.limit]);

  return (
    <>
      {isLoading ? <Loader /> : (
        <Box sx={{ width: "100%", marginTop: "30px" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ borderRadius: "3px" }}>
              <Table>
                <TableHead style={{ backgroundColor: "#d9edf7", borderRadius: "0 0 10px 2" }}>
                  <TableRow>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "_created_at"}
                        direction={sortLabelDirection}
                        onClick={(e) => handleRequestSort(e, "_created_at")}
                      >
                        <Typography variant="tableHead">Transferred Date</Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center"><Typography variant="tableHead">Transferred to</Typography></TableCell>
                    <TableCell align="center"><Typography variant="tableHead">#Credits Transferred</Typography></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleRows.length > 0 ? visibleRows.map((detail, i) => (
                    <TableRow key={i}>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Typography variant="tableText">
                          {commonFunc.dateFormatWithLocale(detail?.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Typography variant="tableText">
                          {detail?.destinationUser?.username || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Typography variant="tableText">
                          {detail?.numCredits ?? "0"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography>No Transfer details available</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={pagination.totalDocuments}
              rowsPerPage={pagination.limit}
              page={pagination.page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}

export default TransferCredit;
