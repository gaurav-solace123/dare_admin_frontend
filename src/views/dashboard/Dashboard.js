import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";

// components
import DigitalAdminPanel from "./components/DigitalAdminPanel";
import DigitalAdminBottomPanel from "./components/DigitalAdminBottomPanel";
import Loader from "src/components/Loader";
import { getData } from "../../services/services";
import Api from "../../services/constant";
import commonFunc from "../../utils/common";

const Dashboard = () => {
  const data = [
    { value: 55, label: "Middle School", color: "#5cb7fc", percentage: 20 },
    { value: 45, label: "Elementary School", color: "#fecc6c", percentage: 40 },
  ];
  const creditOptions = [
    { label: "Credits this Month", value: "MONTH" },
    { label: "Credits this Quarter", value: "QUARTER" },
    { label: "Credits YTD", value: "YEAR" },
  ];
  const sessionsOptions = [
    { label: "Sessions this Month", value: "MONTH" },
    { label: "Sessions this Quarter", value: "QUARTER" },
    { label: "Sessions YTD", value: "YEAR" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [creditsActivatedByLevel, setCreditsActivatedByLevel] = useState([]);
  const [sessionsActivatedByLevel, setSessionsActivatedByLevel] = useState([]);
  const [creditActivatedType, setCreditActivatedType] = useState("YEAR");
  const [sessionActivatedType, setSessionActivatedType] = useState("YEAR");
  const [totalCredit, setTotalCredit] = useState("");
  //all functions
  const onChangeSessionsActivatedByLevel = (option) => {
    setSessionActivatedType(option);
  };
  const onChangeCreditsActivatedByLevel = (option) => {
    setCreditActivatedType(option);
  };
  const getCreditsActivatedByLevel = async () => {
    try {
      setIsLoading(true);
      const result = await getData(
        `${Api?.creditsActivatedByLevel}?timeFunnel=${creditActivatedType}`
      );
      if (result?.success) {
        const response = result?.data;
        const temp = [
          {
            value: response?.middleSchool,
            label: "Middle School",
            color: "#5cb7fc",
            percentage: response?.middleSchoolPercentage?.toFixed(),
          },
          {
            value: response?.elementary,
            label: "Elementary School",
            color: "#fecc6c",
            percentage: response?.elementaryPercentage?.toFixed(),
          },
        ];
        setCreditsActivatedByLevel(temp);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const getSessionsActivatedByLevel = async () => {
    try {
      setIsLoading(true);
      const result = await getData(
        `${Api?.sessionsActivatedByLevel}?timeFunnel=${sessionActivatedType}`
      );
      if (result?.success) {
        const response = result?.data;
        const temp = [
          {
            value: response?.middleSchool,
            label: "Middle School",
            color: "#5cb7fc",
            percentage: response?.middleSchoolPercentage?.toFixed(),
          },
          {
            value: response?.elementary,
            label: "Elementary School",
            color: "#fecc6c",
            percentage: response?.elementaryPercentage?.toFixed(),
          },
        ];
        setSessionsActivatedByLevel(temp);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const getTotalAssignedCredit = async () => {
    try {
      setIsLoading(true);
      const result = await getData(Api?.totalCredit);
      if (result?.success) {
        const response = result?.data;
        setTotalCredit(response[0]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  //all useEffects
  useEffect(() => {
    getCreditsActivatedByLevel();
  }, [creditActivatedType]);
  useEffect(() => {
    getSessionsActivatedByLevel();
  }, [sessionActivatedType]);

  useEffect(() => {
    getTotalAssignedCredit();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Grid container spacing={3} mb={2}>
            <Grid
              display="flex"
              gap="20px"
              item
              xs={12}
              lg={6}
              pt={0}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h5" component="h6">
                Total Unassigned Credits
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
                flexGrow={1}
              >
                <Box
                  component="section"
                  sx={{ p: 2, border: "1px dashed grey", width: "100%" }}
                  textAlign="center"
                  fontSize={20}
                  fontWeight="bold"
                >
                  {commonFunc.formatNumberWithCommas(totalCredit?.totalAvailableCredits)}
                </Box>
              </Box>
            </Grid>
            <Grid
              display="flex"
              gap="20px"
              item
              xs={12}
              lg={6}
              pt={0}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h5" component="h6">
                Total Assigned Credits
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
                flexGrow={1}
              >
                <Box
                  component="section"
                  sx={{ p: 2, border: "1px dashed grey", width: "100%" }}
                  textAlign="center"
                  fontSize={20}
                  fontWeight="bold"
                >
                  {commonFunc.formatNumberWithCommas(totalCredit?.totalAssignedCredits)}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <DigitalAdminPanel
                title={"Credits Activated By Level"}
                
                subTitle={` of this ${creditActivatedType.toLowerCase()}`}
                data={creditsActivatedByLevel}
                options={creditOptions}
                menuOnChange={onChangeCreditsActivatedByLevel}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <DigitalAdminPanel
                title={"Sessions Activated by Level"}
                subTitle={` of this ${sessionActivatedType.toLowerCase()}`}
                data={sessionsActivatedByLevel}
                options={sessionsOptions}
                menuOnChange={onChangeSessionsActivatedByLevel}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <DigitalAdminBottomPanel />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
