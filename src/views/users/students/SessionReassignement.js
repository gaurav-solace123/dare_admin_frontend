import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
// import { getData } from '../../services/services';
// import Api from '../../services/constant';
import { Modal, Button, IconButton, Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReactSelect from "../../../components/forms/theme-elements/ReactSelect";
import { getData, patchData } from "../../../services/services";
import Api from "../../../services/constant";
import { useState } from "react";
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
  getSingleStudentSessionList,
  //   rowsPerPage,
  //   page,
  userRole,
  searchTerm,
  setUserRole,
  setSearchTerm,
  showToast,
  userId,
  //   orderBy,
  //   getListData,
  // order,
  // setOrder,
  // setOrderBy
}) {
  // const { showToast, ToastComponent } = useCustomToast();
  //all states
  const [row, setRow] = useState(listData ? listData : []);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("_created_at");
  const [page] = useState(0);
  const [rowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [activationCode, setActivationCode] = useState("");
  const [activationCodeId, setActivationCodeId] = useState("");
  const [currentSessionDetails, setCurrentSessionDetails] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
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
    label: `${item.sessionCode} ${item.sessionName}`,
    value: item?.sessionCode,
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #0055A4",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
    paddingBottom: 2,
    paddingTop: 4,
  };
  const getSessionList = async () => {
    try {
      setIsLoading(true);
      const result = await getData(Api?.sessionList);

      if (result?.success) {
        const response = result?.data?.sessions;
        // setStudentDetails(response);
        const updatedResponse = response.map((item) => ({
          label: `${item.activationCode}`,
          value: item?._id,
        }));
        setSessionList(updatedResponse);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const updateSessionCode = async () => {
    try {
      // 
      setIsLoading(true);
      const payload = {
        newId: activationCodeId,
        oldId:currentSessionDetails?.workbookSessionId,
        studentId :userId,
        
      };
      const result = await patchData(Api?.reAssignSession, payload);

      if (result?.success) {
        showToast(result?.message);
        getSingleStudentSessionList()
        handleClose();
        setIsLoading(false);
      } else {
        showToast(result?.message, "error");
        setIsLoading(false);
        handleClose();
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
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

  
  const visibleRows = React.useMemo(() => {
    return listData;
  }, [order, orderBy, page, rowsPerPage, row, listData]);
  React.useEffect(() => {
    setRow(listData);
    getSessionList();
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
                      <Tooltip
                        title={"Re-Assign"}
                        onClick={() => {
                          handleOpen();
                          setCurrentSessionDetails(row);
                        }}
                      >
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

{visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography>No Records found </Typography>
                    </TableCell>
                  </TableRow>
                )}
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
                  {/* <Box
										display={"flex"}
										flexDirection={"column"}
										gap={"10px"}
										padding={"15px 0"}
									>
										<Box display={"flex"} gap={"8px"}>
											<Typography
												color={"#0055A3"}
												fontWeight={"600"}
												variant="body1"
											>
												Session Code:
											</Typography>
											<Typography variant="body1">
												{currentSessionDetails?.sessionCode}
											</Typography>
										</Box>

										<Box display={"flex"} gap={"8px"}>
											<Typography
												color={"#0055A3"}
												fontWeight={"600"}
												variant="body1"
											>
												Session Name:
											</Typography>
											<Typography variant="body1">
												{currentSessionDetails?.sessionName}
											</Typography>
										</Box>

										<Box display={"flex"} gap={"8px"}>
											<Typography
												color={"#0055A3"}
												fontWeight={"600"}
												variant="body1"
											>
												Instructor Name:
											</Typography>
											<Typography variant="body1">
												{currentSessionDetails?.instructor}
											</Typography>
										</Box>
									</Box> */}

                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    gap={"10px"}
                    padding={"15px 0"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                      <Typography
                        color={"#0055A3"}
                        fontWeight={"600"}
                        variant="body1"
                      >
                        Session Code:
                      </Typography>
                      <Typography variant="body1">
                        {currentSessionDetails?.sessionCode}
                      </Typography>
                    </Box>

                    <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                      <Typography
                        color={"#0055A3"}
                        fontWeight={"600"}
                        variant="body1"
                      >
                        Session Name:
                      </Typography>
                      <Typography variant="body1">
                        {currentSessionDetails?.sessionName}
                      </Typography>
                    </Box>

                    <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                      <Typography
                        color={"#0055A3"}
                        fontWeight={"600"}
                        variant="body1"
                      >
                        Instructor Name:
                      </Typography>
                      <Typography variant="body1">
                        {currentSessionDetails?.instructor}
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
                    options={sessionList}
                    onChange={(option) => {
                      setActivationCode(option?.label || "");
                      setActivationCodeId(option?.value || "");
                    }}
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
                      onClick={handleClose}
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
                      onClick={updateSessionCode}
                      disabled={activationCode == ""}
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
      {/* <ToastComponent /> */}
    </div>
  );
}

export default SessionReassignMentTable;
