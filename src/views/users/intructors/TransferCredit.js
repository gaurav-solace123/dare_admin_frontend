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

function TransferCredit({ userId,isList }) {
  //all constant
  const mockTransferDetails = {
    status: 200,
    data: {
      transfers: [
        {
          numCredits: 150,
          createdAt: "2020-09-16T19:05:42.445Z",
          destinationUser: {
            _id: "4JJK9hFmry",
            firstName: "Fierre",
            lastName: "Johnson",
            email: "johnsf@co.comal.tx.us",
            username: "deputyjohnson",
          },
        },
        {
          numCredits: 75,
          createdAt: "2020-09-16T19:06:32.942Z",
          destinationUser: {
            _id: "8B5HmF1FzR",
            firstName: "Roxie",
            lastName: "Haik",
            email: "haikro@co.comal.tx.us",
            username: "roxiehaik",
          },
        },
      ],
      transferPagination: {
        transferPage: 1,
        transferPageSize: 10,
        totalTransfers: 1,
      },
    },
    success: true,
    error: false,
  };

  const [transferDetails, setTransferDetails] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalDocuments: 0,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [isLoading, setIsLoading] = useState(false);

  const getTransferDetails = async (
   
  ) => {
    const { page, limit } = pagination;

    setIsLoading(true);
    try {
      const searchQuery = `?page=${page}&limit=${limit}&sortBy=${orderBy} &sortOrder=${order}`;

        const result = await getData(
          `${Api?.transferCreditInstructor}/${userId}${searchQuery}`);
      // const result = mockTransferDetails;
      if (result?.success) {
        const response = result.data;

        setTransferDetails(response.transfers);
        setPagination({
          page: response.transferPagination.transferPage,
          limit: response.transferPagination.transferPageSize,
          totalPages: response.transferPagination.totalPages,
          totalDocuments: response.transferPagination.totalTransfers,
        });
      }
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransferDetails();
  }, [isList,order,pagination.page,
    pagination.limit,]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    getTransferDetails(
      pagination.page,
      pagination.limit,
      isAsc ? "desc" : "asc",
      property
    );
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage + 1 });
    getTransferDetails(newPage + 1, pagination.limit, order, orderBy);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setPagination({ ...pagination, limit: newLimit });
    getTransferDetails(1, newLimit, order, orderBy); // Reset to page 1 when changing rows per page
  };

  const visibleRows = React.useMemo(() => {
    return transferDetails;
  }, [order, orderBy, pagination.page, pagination.limit, transferDetails]);

  return (
    <>
      {" "}
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
                      <Typography variant="tableHead">
                        Transferred Date
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "username"}
                      direction={orderBy === "username" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "username")}
                    >
                      <Typography variant="tableHead">
                        Transferred to
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "numCredits"}
                      direction={orderBy === "numCredits" ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, "numCredits")
                      }
                    >
                      <Typography variant="tableHead">
                        #Credits Transferred
                      </Typography>
                    </TableSortLabel>
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
                        {dayjs(detail?.createdAt).format("DD/MM/YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography variant="tableText">
                        {detail?.destinationUser?.username}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography variant="tableText">
                        {detail?.numCredits}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

                {visibleRows.length === 0 && (
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
    </>
  );
}

export default TransferCredit;
