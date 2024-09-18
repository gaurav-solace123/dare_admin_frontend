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
import { Modal, TextField, Button, IconButton, Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomSelect from "../../../components/forms/theme-elements/CustomSelectField";
import ReactSelect from "../../../components/forms/theme-elements/ReactSelect";
function SessionReassignMentTable({
  children,
  role,
  Title,
  //   setRowsPerPage,
  //   setPage,
  listData = [],
  tableFields,
  setUserId,
  headers,

  //   totalCount,
  setTotalCountgetListData,
  //   rowsPerPage,
  //   page,
  userRole,
  searchTerm,
  setUserRole,
  setSearchTerm,
  //   orderBy,
  //   getListData,
  // order,
  // setOrder,
  // setOrderBy
}) {
  const [row, setRow] = React.useState(listData ? listData : []);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("_created_at");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [searchTerm,setSearchTerm]=React.useState('')
  // const [userRole,setUserRole]=React.useState('')
  // const [listData, setListData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState("");
  const sessionData = [
    {
      sessionCode: "F042J",
      sessionName: "Judy Room",
      instructorName: "John Doe",
    },
    {
      sessionCode: "5ZLY9",
      sessionName: "BT 220",
      instructorName: "Jane Smith",
    },
    {
      sessionCode: "285U0",
      sessionName: "Homeschool AE",
      instructorName: "Mark Johnson",
    },
    {
      sessionCode: "A34KL",
      sessionName: "Virtual Class 101",
      instructorName: "Emily Davis",
    },
    {
      sessionCode: "7YU53",
      sessionName: "Lab Room 3",
      instructorName: "Michael Brown",
    },
  ];

  const sessionArray = sessionData.map((item) => ({
    label: `${item.sessionCode} ${item.sessionName}`, value:item?.sessionCode
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #0055A4",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
  };

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
              //  align={headCell.numeric ? 'left' : 'right'}
              align="left"
              // style={{textAlign:'center'}}
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
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Tooltip title={"Re-Assign"} onClick={handleOpen}>
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          type="button"
                        >
                          <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                            Re-Assign
                          </Typography>
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#0055a4", // Default color
              "&:hover": {
                color: "red", // Change color to green on hover
              },
            }}
          >
            {/* <CloseIcon /> */}X
          </IconButton>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            color={"#0055A3"}
            fontSize={"24px"}
            fontWeight={600}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Re-assign Session
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
            }}
            // validationSchema={validationSchema}
            // onSubmit={onSubmit}
            // innerRef={formikRef}
          >
            {({ touched, errors, isSubmitting, values, handleChange }) => (
              <Form>
                <Grid item xs={12} mt={"15px"}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    color={"#0055A3"}
                    fontWeight={"600"}
                  >
                    Current Session Details
                  </Typography>
               <Box display={"flex"} flexDirection={"column"} gap={"10px"} padding={"15px 0"}>
               <Box display={"flex"}  gap={"8px"}><Typography color={"#0055A3"} fontWeight={"600"} variant="body1">
                    Session Code:
                  </Typography>
                  <Typography variant="body1">
                  F042J
                  </Typography></Box>

                  <Box display={"flex"}  gap={"8px"}>
                  <Typography color={"#0055A3"} fontWeight={"600"} variant="body1">
                    Session Name:
                  </Typography>
                  <Typography variant="body1">Judy Room
                  </Typography>
                 </Box>

                 <Box display={"flex"}  gap={"8px"}>
                 <Typography color={"#0055A3"} fontWeight={"600"} variant="body1">
                    Instructor Name: 
                  </Typography>
                  <Typography variant="body1">
                  Instructor Dashboard
                  </Typography>
                 </Box>
                 
               </Box>
               <hr></hr>
                </Grid>
                <Grid item xs={12} p={"7px"} mb={"20px"}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="userRole"
                  >
                    Select session to re-assign with
                    <span style={{ color: "red" }}>*</span>
                  </Typography>

                  <Field
                    as={ReactSelect}
                    id="userRole"
                    name="userRole"
                    label="Select your Session"
                    displayEmpty
                    options={sessionArray}
                    helperText={<ErrorMessage name="userRole" />}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} p={"7px"}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="large"
                      fullWidth
                      type="button"
                      //   onClick={() => {
                      //     // Handle cancel
                      //     cancel();
                      //     // navigate('/users');
                      //   }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6} p={"7px"}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                      //   disabled={isSubmitting}
                    >
                      Reassign
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

export default SessionReassignMentTable;
