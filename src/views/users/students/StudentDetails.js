import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SessionReassignMentTable from "./SessionReassignement";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../../services/constant";
import { getData } from "../../../services/services";
import { head, upperFirst } from "lodash";
import Loader from "../../../components/Loader";
import NewSessionAssignModal from "./SessionReassignModal";
import useCustomToast from "../../../hooks/CustomToastHook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function StudentDetails() {
  //all constant
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id;
  const { showToast, ToastComponent } = useCustomToast();
  const tableFields = [
    "sessionName",
    "sessionCode",
    "status",
    "workbook",
    "instructor",
  ];
  const headers = [
    { id: "sessionName", numeric: false, label: "Session Name" },
    { id: "sessionCode", numeric: false, label: "Session Code" },
    { id: "status", numeric: false, label: "Status" },
    { id: "workbook", numeric: false, label: "Workbook" },
    { id: "instructor", numeric: false, label: "Instructor" },
    { id: "action", numeric: false, label: "Instructor Action" },
  ];

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
    paddingBottom: 2,
    paddingTop: 4,
  };

  //all states
  const [open, setOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState("");
  const [specificStudentSessionList, setSpecificStudentSessionList] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  //all functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewData = async () => {
    try {
      setIsLoading(true);
      const result = await getData(`${Api?.viewUser}/${userId}`);

      if (result?.success) {
        const response = result?.data;
        setStudentDetails(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const getSingleStudentSessionList = async () => {
    try {
      //
      setIsLoading(true);
      const result = await getData(
        `${Api?.studentSessionReassign}?userId=${userId}`
      );

      if (result?.success) {
        const response = result?.data;
        if (response.length > 0) {
          const sessionReassignmentList = response.map((item) => ({
            sessionName: item?.WorkbookSessionDetails?.name,
            workbookSessionId: item?.WorkbookSessionDetails?._id,
            sessionCode: item?.WorkbookSessionDetails?.activationCode,
            status: item?.WorkbookSessionDetails?.isArchive
              ? "Inactive"
              : "Active",
            workbook: item?.WorkbookDetails?.name,
            instructor: `${item?.InstructorDetails?.firstName} ${item?.InstructorDetails?.lastName}`,
          }));
          setSpecificStudentSessionList(sessionReassignmentList);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  //all useEffect
  useEffect(() => {
    viewData();
    getSingleStudentSessionList();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Tooltip title={"Go back"}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="button"
              startIcon={<ArrowBackIcon />} // Adding arrow icon
              onClick={() => navigate(-1)} // Assuming you're using React Router to navigate back
              sx={{
                marginBottom: "25px",
              }}
            >
              <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                Back
              </Typography>
            </Button>
          </Tooltip>
          <Box
            sx={{
              border: "2px solid",
              color: "#0055a4",
              padding: 2,
              position: "relative",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-12px", // Adjust this to make the text overlap more or less with the border
                left: "16px",
                backgroundColor: "#fff",
                padding: "0 8px",
                display: "inline-block",
                // color: 'red', // To match the border color
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <Typography
                variant="h7"
                fontWeight={600}
                component="label"
                htmlFor="mailingAddress"
              >
                Student Details
              </Typography>
            </Box>
            <Grid container mt={1} spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card>
                  <CardContent>
                    <Box display="flex" gap="15px">
                      <Avatar sx={{ bgcolor: "#673ab7" }}>
                        {" "}
                        {upperFirst(head(studentDetails?.firstName))}
                        {upperFirst(head(studentDetails?.lastName))}
                      </Avatar>
                      <Box display="flex" flexDirection="column" gap="8px">
                        <Box display="flex" gap="8px">
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color={"#2b2d3b"}
                            component="label"
                            htmlFor="firstName"
                          >
                            {`${studentDetails?.firstName} ${studentDetails?.lastName}`}
                          </Typography>
                        </Box>

                        <Box display="flex" gap="8px">
                          <Typography variant="subtitle1" fontWeight={400}>
                            Username: {studentDetails?.username}
                          </Typography>
                        </Box>

                        <Box display="flex" gap="8px">
                          <Typography variant="subtitle1" fontWeight={400}>
                            {studentDetails?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box mt={5}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" component="h6" mb={2}>
                  Sessions Reassignment
                </Typography>
                {specificStudentSessionList.length == 0 && (
                  <Tooltip
                    title={"Assign session"}

                    // onClick={() => {
                    //   handleOpen();
                    //   setCurrentSessionDetails(row);
                    // }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      type="button"
                      onClick={handleOpen}
                      sx={{
                        marginBottom: "15px",
                      }}
                      // mb='15px'
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                        Assign
                      </Typography>
                    </Button>
                  </Tooltip>
                )}
              </Box>
              <SessionReassignMentTable
                showToast={showToast}
                listData={specificStudentSessionList}
                getSingleStudentSessionList={getSingleStudentSessionList}
                tableFields={tableFields}
                headers={headers}
                userId={userId}
              />
            </Box>
          </Box>
        </>
      )}

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
          <NewSessionAssignModal
            showToast={showToast}
            cancel={handleClose}
            getSingleStudentSessionList={getSingleStudentSessionList}
            userId={userId}
          />
        </Box>
      </Modal>
      <ToastComponent />
    </>
  );
}

export default StudentDetails;
