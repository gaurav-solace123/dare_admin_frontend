import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import React, { useEffect, useState } from "react";
import PurchaseCredit from "./PurchaseCredit";
import TransferCredit from "./TransferCredit";
import {  useNavigate, useParams } from "react-router";
import { head, upperFirst } from "lodash";
import { getData } from "../../../services/services";
import Api from "../../../services/constant";
import useCustomToast from "../../../hooks/CustomToastHook";
import BonusCredit from "./BonusCredit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function InstrutorsDetails() {
  //all constants
  const navigate = useNavigate()
  const { showToast, ToastComponent } = useCustomToast();
  const { id } = useParams()
  const userId = id;
  const styleModel = {
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
  const tableFields = ["sessionName", "sessionCode", "workbook", "instructor"];
  const headers = [
    { id: "sessionName", numeric: false, label: "Session Name" },
    { id: "sessionCode", numeric: false, label: "Session Code" },
    { id: "workbook", numeric: false, label: "Workbook" },
    { id: "instructor", numeric: false, label: "Instructor" },
    { id: "action", numeric: false, label: "Instructor Action" },
  ];
  //all states
  const [activeTab, setActiveTab] = useState("purchase_credit"); // Default to 'day' tab
  const [instructorDetails, setInstructorDetails] = useState("");
  const [allCredits, setAllCredits] = useState("");
  const [isList, setIsList] = useState(false);
  const [open, setOpen] = React.useState(false);

  //all functions
  const handleChangeList = () => {
    setIsList(!isList);
  };
  const viewData = async () => {
    
    try {
      const result = await getData(`${Api?.viewUser}/${userId}`);
      if (result?.success) {
        const response = result?.data
        response.usedCredits = result?.data?.usedCredits;
        response.assignedCredits = result?.data?.assignedCredits;
        response.availableCredits = result?.data?.availableCredits;
        response.totalCredits = result?.data?.totalCredits;
        setInstructorDetails(response);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCredits = async () => {
    try {
      const result = await getData(`${Api?.instructorDetails}/${userId}`);
      if (result?.success) {
        let response ={}
        response.usedCredits = result?.data?.usedCredits;
        response.assignedCredits = result?.data?.assignedCredits;
        response.availableCredits = result?.data?.availableCredits;
        response.totalCredits = result?.data?.totalCredits;
        setAllCredits(response);
      } 
    } catch (error) {
      console.error(error);
    }
  };
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleClose = () => setOpen(false);

  //all useEffects
  useEffect(() => {
    viewData();
    getAllCredits()
  }, []);
  return (
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
            Instructor Details
          </Typography>
        </Box>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab
            value={"purchase_credit"}
            label="Purchase credit "
            sx={{ fontSize: "16px", margin: "15px 0 0", fontWeight: "500" }}
          />
          <Tab
            value={"credit_transfer_for_log"}
            label={"Credit Transfer Details"}
            sx={{ fontSize: "16px", margin: "15px 0 0", fontWeight: "500" }}
          />
        </Tabs>

        <Grid container mt={1} spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card sx={{ height: "100%", padding: "8px" }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Box display="flex" gap="15px" flexBasis="calc(50% - 10px)">
                    <Avatar sx={{ bgcolor: "#673ab7" }}>
                      {upperFirst(head(instructorDetails?.firstName))}
                      {upperFirst(head(instructorDetails?.lastName))}
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
                          {`${instructorDetails?.firstName} ${instructorDetails?.lastName}`}
                        </Typography>
                      </Box>

                      <Box display="flex" gap="8px">
                        <Typography variant="subtitle1" fontWeight={400}>
                          Phone: {instructorDetails?.mobileNumber ?? "-"}
                        </Typography>
                      </Box>
                      <Box display="flex" gap="8px">
                        <Typography variant="subtitle1" fontWeight={400}>
                          Username: {instructorDetails?.username ?? "-"}
                        </Typography>
                      </Box>

                      <Box display="flex" gap="8px">
                        <Typography variant="subtitle1" fontWeight={400}>
                          {instructorDetails?.email }
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      paddingTop: "15px",
                      marginTop: "15px",
                      borderTop: "1px solid #e8e8e8",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Address
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={400}>
                      {!instructorDetails?.street_1 &&
                      !instructorDetails?.street_2 &&
                      !instructorDetails?.city &&
                      !instructorDetails?.state &&
                      !instructorDetails?.country &&
                      !instructorDetails?._postal_code ? (
                        "-"
                      ) : (
                        <>
                          {instructorDetails?.street_1 &&
                            `${instructorDetails.street_1} `}
                          {instructorDetails?.street_2 &&
                            `${instructorDetails.street_2}`}
                          {(instructorDetails?.street_1 ||
                            instructorDetails?.street_2) && <br />}
                          {instructorDetails?.city &&
                            `${instructorDetails.city}`}
                          {instructorDetails?.state &&
                            `, ${instructorDetails.state}`}
                          {instructorDetails?.country &&
                            `, ${instructorDetails.country}`}
                          {instructorDetails?._postal_code &&
                            ` - ${instructorDetails._postal_code}`}
                        </>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Card sx={{ height: "100%", padding: "8px" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="row" // Set flex direction to row
                  gap="20px"
                  justifyContent="space-between" // Ensures even spacing between elements
                  flexWrap="nowrap" // Prevents the items from wrapping into a new line
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    width="20%" // Ensure each section takes up 20% width (adjust based on need)
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="48px"
                      width="48px"
                      backgroundColor="#3e80f9"
                      borderRadius="50%"
                    >
                      <CreditCardOutlinedIcon sx={{ color: "#fff" }} />
                    </Box>
                    <Typography
                      variant="h7"
                      fontWeight={600}
                      component="label"
                      sx={{
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {allCredits?.totalCredits ?? 0}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={16}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Total Credits
                    </Typography>
                  </Box>

                  {/* Assigned Credits Section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    width="20%" // Ensure each section takes up 20% width
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="48px"
                      width="48px"
                      backgroundColor="#27cea7"
                      borderRadius="50%"
                    >
                      <CardMembershipOutlinedIcon sx={{ color: "#fff" }} />
                    </Box>
                    <Typography
                      variant="h7"
                      fontWeight={600}
                      component="label"
                      sx={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#27cea7",
                      }}
                    >
                      {allCredits?.assignedCredits ?? 0}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={16}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Assigned Credits
                    </Typography>
                  </Box>

                  {/* Used Credits Section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    width="20%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="48px"
                      width="48px"
                      backgroundColor="#6142ff"
                      borderRadius="50%"
                    >
                      <AccountBalanceWalletOutlinedIcon
                        sx={{ color: "#fff" }}
                      />
                    </Box>
                    <Typography
                      variant="h7"
                      fontWeight={600}
                      component="label"
                      sx={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#6142ff",
                      }}
                    >
                      {allCredits?.usedCredits ?? 0}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={16}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Used Credits
                    </Typography>
                  </Box>

                  {/* Available Credits Section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    width="20%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="48px"
                      width="48px"
                      backgroundColor="#ff9f43"
                      borderRadius="50%"
                    >
                      <PaymentsOutlinedIcon sx={{ color: "#fff" }} />
                    </Box>
                    <Typography
                      variant="h7"
                      fontWeight={600}
                      component="label"
                      sx={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#ff9f43",
                      }}
                    >
                      {allCredits?.availableCredits ?? 0}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={16}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Available Credits
                    </Typography>
                  </Box>
                </Box>

                {/* Button Below the Credit Sections */}
                <Box
                  paddingTop={3}
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    width="90%"
                    type="button"
                    onClick={() => setOpen(true)}
                  >
                    Create Credit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {activeTab === "purchase_credit" && (
          <PurchaseCredit userId={userId} isList={isList} />
        )}
        {activeTab === "credit_transfer_for_log" && (
          <Box mx="20px">
            <TransferCredit
              userId={userId}
              tableFields={tableFields}
              headers={headers}
              isList={isList}
            />
          </Box>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModel}>
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
          <BonusCredit
            cancel={() => handleClose()}
            userId={userId}
            handleChangeList={handleChangeList}
            showToast={showToast}
            getAllCredits={getAllCredits}
          />
        </Box>
      </Modal>
      <ToastComponent />
    </>
  );
}

export default InstrutorsDetails;
