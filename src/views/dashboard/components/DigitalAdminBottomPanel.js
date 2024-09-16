import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Grid, Typography } from "@mui/material";

function DigitalAdminBottomPanel() {
  return (
    <>
      <DashboardCard>
        <Grid container spacing={3}>
          <Grid
            display="flex"
            gap="40px"
            item
            xs={12}
            sm={12}
            md={12}
            lg={10}
            xl={12}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={5}>
              
            <Typography variant="h5" component="h6">
              Downloadable Reports
            </Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={"/src/assets/images/logos/affiliate-icon.png"}
                  alt={"gkgk"}
                  loading="lazy"
                  width={"35px"}
                  style={{marginBottom:'10px'}}
                />

                <Typography variant="danger" textAlign={"center"}>
                  Officers Affiliation
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <AccountCircleOutlinedIcon fontSize="large" style={{color:"black"}} /> */}
                <img
                  src={"/src/assets/images/logos/buyer-info.png"}
                  alt={"gkgk"}
                  loading="lazy"
                  width={"35px"}
                  style={{marginBottom:'10px'}}

                />
                <Typography variant="caption" textAlign={"center"}>
                  Buyer Information
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <LocationOnOutlinedIcon fontSize="large" style={{color:"black"}}/> */}
                <img
                  src={"/src/assets/images/logos/district-map.png"}
                  alt={"gkgk"}
                  loading="lazy"
                  width={"35px"}
                  style={{marginBottom:'10px'}}

                />
                <Typography variant="caption" textAlign={"center"}>
                  Sessions Sold by District
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <MapOutlinedIcon fontSize="large" style={{color:"black"}}/> */}
                <img
                  src={"/src/assets/images/logos/state-map.png"}
                  alt={"gkgk"}
                  loading="lazy"
                  width={"35px"}
                  style={{marginBottom:'10px'}}

                />
                <Typography variant="caption" textAlign={"center"}>
                  Sessions Sold by State
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}

export default DigitalAdminBottomPanel;
