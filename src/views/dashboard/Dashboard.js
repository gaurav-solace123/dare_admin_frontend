import React from "react";
import { Grid, Box, Typography } from "@mui/material";

// components
import DigitalAdminPanel from "./components/DigitalAdminPanel";
import DigitalAdminBottomPanel from "./components/DigitalAdminBottomPanel";
import Loader from "src/components/Loader";

const Dashboard = () => {
  const data = [
    { value: 55, label: "Middle School", color: "#2e96ff", percentage: 20 },
    { value: 45, label: "Elementary School", color: "#02b2af", percentage: 40 },
  ];
  const creaditOptions = [
    "Credits this Month",
    "Credits this Quarter",
    "Credits YTD",
  ];
  const sessionsOptions = [
    "Sessions this Month",
    "Sessions this Quarter",
    "Sessions YTD",
  ];
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Grid container spacing={3} mb={2}>
            <Grid display="flex" gap="20px" item xs={12} lg={6} pt={0} justifyContent={'center'} alignItems={'center'}>
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
                  5,231
                </Box>
              </Box>
            </Grid>
            <Grid display="flex" gap="20px" item xs={12} lg={6} pt={0} justifyContent={'center'} alignItems={'center'}>
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
                  5,231
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <DigitalAdminPanel
                title={"Credits Activated By Level"}
                data={data}
                options={creaditOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <DigitalAdminPanel
                title={"Sessions Activated by Level"}
                data={data}
                options={sessionsOptions}
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
