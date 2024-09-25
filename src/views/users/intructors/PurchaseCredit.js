import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import { getData } from "../../../services/services";
import Api from "../../../services/constant";
import dayjs from "dayjs";
import Loader from "src/components/Loader";

import { startCase } from "lodash";

function PurchaseCredit({ userId ,isList}) {
  //all constant
  const mockPurchaseDetails = {
    status: 200,
    message: "Successfully retrieved user credit purchase details",
    data: {
      purchaseDetails: [
        {
          numCredits: 600,
          description: "Credits Purchase for 600 Workbook Session Credits",
          type: "CREDIT_CARD",
          createdAt: "2016-08-11T11:16:30.241Z",
        },
        {
          numCredits: 600,
          description: "Credits Purchase for 600 Workbook Session Credits",
          type: "CREDIT_CARD",
          createdAt: "2016-08-11T11:16:30.241Z",
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        totalDocuments: 2,
        totalPages: 1,
      },
    },
    success: true,
    error: false,
  };
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalDocuments: 0,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPurchaseDetails = async (
    page = 1,
    limit = 10,
    order = "asc",
    orderBy = "createdAt"
  ) => {
    setIsLoading(true);
    try {
      const searchQuery = `?page=${page}&limit=${limit}&sortBy=${orderBy} &sortOrder=${order}`;

        const result = await getData(
          `${Api?.purchaseCreditInstructor}/${userId}${searchQuery}`);
      // const result = mockPurchaseDetails;
      if (result?.success) {
        const response = result.data;

        setPurchaseDetails(response.purchaseDetails);
        setPagination({
          page: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: response.pagination.totalPages,
          totalDocuments: response.pagination.totalDocuments,
        });
      }
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseDetails();
  }, [isList]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    fetchPurchaseDetails(
      pagination.page,
      pagination.limit,
      isAsc ? "desc" : "asc",
      property
    );
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage + 1 });
    fetchPurchaseDetails(newPage + 1, pagination.limit, order, orderBy);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setPagination({ ...pagination, limit: newLimit });
    fetchPurchaseDetails(1, newLimit, order, orderBy); // Reset to page 1 when changing rows per page
  };

  const visibleRows = React.useMemo(() => {
    return purchaseDetails;
  }, [order, orderBy, pagination.page, pagination.limit, purchaseDetails]);

  return (
    <>
      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer sx={{ borderRadius: "3px" }}>
            <Table>
              <TableHead
                style={{
                  backgroundColor: "#d9edf7",
                  borderRadius: "0 0 10px 2",
                }}
              >
                <TableRow>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "createdAt"}
                      direction={orderBy === "createdAt" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "createdAt")}
                    >
                      <Typography variant="tableHead">Purchase Date</Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      variant="tableHead"
                      active={orderBy === "numCredits"}
                      direction={orderBy === "numCredits" ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, "numCredits")
                      }
                    >
                      <Typography variant="tableHead">
                        {" "}
                        Purchase Credit#
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="tableHead">Purchased Via</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="tableHead">Description</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography variant="tableText">
                        {dayjs(detail.createdAt).format("DD/MM/YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography variant="tableText">
                        {detail.numCredits}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Chip
                        label={
                          startCase(detail.type)
                        }
                        sx={{
                          backgroundColor:
                             "#2e7d32de",
                              
                          color: "#fff",
                          minWidth: "100px",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography variant="tableText">
                        {detail.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography>No purchase details available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
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
    </>
  );
}

export default PurchaseCredit;
