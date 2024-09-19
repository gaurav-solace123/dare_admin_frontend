import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import React, { useEffect, useState } from "react";
import PurchaseCredit from "./PurchaseCredit";
import TransferCredit from "./TransferCredit";
import { useLocation } from "react-router";
import { head, upperFirst } from "lodash";
import { getData } from "../../../services/services";
import Api from "../../../services/constant";

function InstructorPreview() {
  const location = useLocation();
  const userId = location?.state?.userId;
  const [activeTab, setActiveTab] = useState("purchase_credit"); // Default to 'day' tab

  const [isLoading, setIsLoading] = useState(false);
  const [instructorDetails, setInstructorDetails] = useState("");
  const [specificStudentSessionList, setSpecificStudentSessionList] = useState(
    []
  );
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const sessionData = [
    {
      sessionName: "Judy Room",
      sessionCode: "F042J",
      workbook: "Elementary English",
      instructor: "Instructor Dashboard",
    },
    {
      sessionName: "BT 220",
      sessionCode: "5ZLY9",
      workbook: "Elementary English",
      instructor: "Instructor Dashboard",
    },
    {
      sessionName: "Homeschool AE",
      sessionCode: "285U0",
      workbook: "Elementary English",
      instructor: "Instructor Dashboard",
    },
  ];
  const tableFields = ["sessionName", "sessionCode", "workbook", "instructor"];
  const headers = [
    { id: "sessionName", numeric: false, label: "Session Name" },
    { id: "sessionCode", numeric: false, label: "Session Code" },
    { id: "workbook", numeric: false, label: "Workbook" },
    { id: "instructor", numeric: false, label: "Instructor" },
    { id: "action", numeric: false, label: "Instructor Action" },
  ];
  const viewData = async () => {
    try {
      setIsLoading(true);
      const result = await getData(`${Api?.viewUser}/${userId}`);

      if (result?.success) {
        const response = result?.data;
        setInstructorDetails(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    viewData();
  }, []);
  return (
    <>
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
            label={"Credit transfer for log "}
            sx={{ fontSize: "16px", margin: "15px 0 0", fontWeight: "500" }}
          />
        </Tabs>

        <Grid container mt={1} spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={12} md={6} lg={6}>
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
                          Username: {instructorDetails?.username}
                        </Typography>
                      </Box>

                      <Box display="flex" gap="8px">
                        <Typography variant="subtitle1" fontWeight={400}>
                          {instructorDetails?.email}
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
                      {`${instructorDetails?.street_1} ${instructorDetails?.street_2}`}
                      ,<br></br>
                      {`${instructorDetails?.city}, ${instructorDetails?.state}, ${instructorDetails?.country} - ${instructorDetails?._postal_code}`}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card sx={{ height: "100%", padding: "8px" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap="20px"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    flexBasis="calc(50% - 10px)"
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
                      233
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={18}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Total Credits
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    flexBasis="calc(50% - 10px)"
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
                      123
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={18}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Assigned Credits
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    flexBasis="calc(50% - 10px)"
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
                      123
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={18}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Used Credits
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    flexBasis="calc(50% - 10px)"
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
                      110
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize={18}
                      color={"#2b2d3b"}
                      component="label"
                    >
                      Available Credits
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {activeTab === "purchase_credit" && <PurchaseCredit />}
        {activeTab === "credit_transfer_for_log" && (
          <Box mx="20px">
            <TransferCredit
              listData={sessionData}
              tableFields={tableFields}
              headers={headers}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default InstructorPreview;
