import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton"; // import Skeleton
import { TableSortLabel } from "@mui/material";

function InstructorReportTable({
  listData = [],
  tableFields,
  totalCount,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  order,
  setOrder,
  isLoading, // Add loading prop
}) {
  const [row, setRow] = React.useState(listData ? listData : []);
  const [orderBy, setOrderBy] = React.useState("_created_at");

  const headers = [
    { id: "instructorName", numeric: false, label: "Instructor Name" },
    { id: "date", numeric: false, label: "Date" },
    { id: "activityType", numeric: true, label: "Activity Type" },
    { id: "creditsPurchased", numeric: true, label: "Credit Purchased" },
    {
      id: "creditsTransferredIn",
      numeric: true,
      label: "Credits Transferred In",
    },
    {
      id: "creditsTransferredOut",
      numeric: true,
      label: "Credit Transferred out",
    },
    { id: "remainingCredits", numeric: true, label: "Remaining Credit" },
    { id: "transferredFrom", numeric: true, label: "Transferred from" },
    { id: "transferredTo", numeric: true, label: "Transferred To" },
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead
        style={{ backgroundColor: "#d9edf7", borderRadius: "0 0 10px 2" }}
      >
        <TableRow>
          {headers.map((headCell) => {
            const words = headCell.label.split(" ");
            const firstWord = words[0];
            const remainingWords = words.slice(1).join(" ");

            return (
              <TableCell
                key={headCell.id}
                align="center"
                sx={{ whiteSpace: "nowrap", padding: "20px" }}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell?.id === "date" ? (
                  <TableSortLabel
                    active={orderBy === "_created_at"}
                    direction={orderBy === "_created_at" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "_created_at")}
                  >
                    <Typography sx={{ flex: "1 1 100%" }} variant="tableHead">
                      <div>{firstWord}</div>
                      <div>{remainingWords}</div>
                    </Typography>
                  </TableSortLabel>
                ) : (
                  <Typography sx={{ flex: "1 1 100%" }} variant="tableHead">
                    <div>{firstWord}</div>
                    <div>{remainingWords}</div>
                  </Typography>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Adjust for 1-indexed page state
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };

  const visibleRows = React.useMemo(() => {
    return listData;
  }, [order, orderBy, page, rowsPerPage, row, listData]);

  React.useEffect(() => {
    setRow(listData);
  }, [listData, headers]);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer sx={{ borderRadius: "3px" }}>
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {isLoading ? (
                  Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      {headers.map((header, idx) => (
                        <TableCell key={idx} align="center">
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : visibleRows?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {tableFields.map((field) => (
                        <TableCell
                          key={field}
                          align="left"
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{ flex: "1 1 100%", textAlign: "center" }}
                            variant="tableText"
                          >
                            {row?.[field]}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default InstructorReportTable;
