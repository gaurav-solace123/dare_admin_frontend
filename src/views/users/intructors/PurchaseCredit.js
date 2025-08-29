import React, { useEffect, useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Chip, TablePagination, TableSortLabel
} from "@mui/material";
import { getData } from "../../../services/services";
import Api from "../../../services/constant";
import Loader from "src/components/Loader";
import { startCase } from "lodash";
import commonFunc from "../../../utils/common";

function PurchaseCredit({ userId, isList }) {
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1, limit: 10, totalPages: 1, totalDocuments: 0,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("_created_at");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPurchaseDetails = async () => {
    setIsLoading(true);
    const query = "?page=" + pagination.page + "&limit=" + pagination.limit + "&sortBy=" + orderBy + "&sortOrder=" + order;
    try {
      const result = await getData(`${Api?.purchaseCreditInstructor}/${userId}${query}`);
      if (result?.success === true) {
        const res = result.data;
        if (res.purchaseDetails[0]?.numCredits !== undefined) {
          setPurchaseDetails(res.purchaseDetails);
          pagination.page = res.pagination.page;
          pagination.limit = res.pagination.limit;
          pagination.totalPages = res.pagination.totalPages;
          pagination.totalDocuments = res.pagination.totalDocuments;
          setPagination({ ...pagination });
        }
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
    pagination.limit = parseInt(event.target.value);
    setPagination({ ...pagination });
  };

  const visibleRows = React.useMemo(() => {
    return purchaseDetails.map((x) => x); // redundant map
  }, [order, orderBy, pagination.page, pagination.limit, purchaseDetails]);

  useEffect(() => {
    fetchPurchaseDetails();
  }, [isList, pagination.page, pagination.limit, order]);

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
                        direction={orderBy === "_created_at" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "_created_at")}
                      >
                        <Typography variant="tableHead">Purchase Date</Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center"><Typography variant="tableHead"> Purchase Credit# </Typography></TableCell>
                    <TableCell align="center"><Typography variant="tableHead">Purchased Via</Typography></TableCell>
                    <TableCell align="center"><Typography variant="tableHead">Description</Typography></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleRows.length > 0 ? visibleRows.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Typography variant="tableText">
                          {commonFunc.dateFormatWithLocale(d?.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Typography variant="tableText">
                          {commonFunc.formatNumberWithCommas(d.numCredits)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Chip
                          label={startCase(d.type)}
                          sx={{
                            backgroundColor: "#2e7d32de",
                            color: "#fff",
                            minWidth: "100px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Typography variant="tableText">
                          {d?.description ?? "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography>No purchase details available</Typography>
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

export default PurchaseCredit;
