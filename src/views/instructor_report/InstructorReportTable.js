import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
// import { getData } from '../../services/services';
// import Api from '../../services/constant';
import EditIcon from "@mui/icons-material/Edit";
import InputBase from "@mui/material/InputBase";

function InstructorReportTable({
  children,
  role,
  Title,
  //   setRowsPerPage,
  //   setPage,
  listData = [],
  tableFields,
  setUserId,
  AddSvg,
  //   totalCount,
  setTotalCountgetListData,
  //   rowsPerPage,
  //   page,
  userRole,
  searchTerm,
  setUserRole,
  setSearchTerm,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  //   orderBy,
  //   getListData,
  // order,
  // setOrder,
  // setOrderBy
}) {
  const [row, setRow] = React.useState(listData ? listData : []);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("_created_at");

  // const [searchTerm,setSearchTerm]=React.useState('')
  // const [userRole,setUserRole]=React.useState('')
  // const [listData, setListData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState("");

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
  // React.useEffect(()=>{
  //  const pageIndex =page==0?1:page
  //   const pagination={
  //     page:pageIndex,rowsPerPage,searchTerm,userRole
  //   }
  //   // getListData(pagination)
  // },[page,rowsPerPage])

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
          {headers.map((headCell) => (
            <TableCell
              color="secondary"
              key={headCell.id}
              align="left"
              sx={{ whiteSpace: "nowrap" }}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography sx={{ flex: "1 1 100%" }} variant="tableHead">
                  {headCell.label}
                </Typography>

                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleChangePage = (event, newPage) => {

  //   setPage(page + newPage);
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Adjust for 1-indexed page state
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };
  const visibleRows = React.useMemo(() => {
    return listData;
    //   return stableSort(listData, getComparator(order, orderBy)).slice(
    //   page  * rowsPerPage,
    //   page * rowsPerPage + rowsPerPage,
    // )
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
                {visibleRows.map((row) => (
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
                        // sx={{}}
                        align="left"
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Typography
                          sx={{ flex: "1 1 100%" }}
                          variant="tableText"
                        >
                          {row?.[field]}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
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
