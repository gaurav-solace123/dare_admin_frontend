import React, { useState } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  Box,
  Checkbox,
  Grid,
  Typography,
  FormControlLabel,
} from "@mui/material";
import UnifiedDatePicker from "../../../components/YearMonthDayDatepicker";
import commonFunc from "../../../utils/common";
import Api from "../../../services/constant";
import { getData } from "../../../services/services";
import Loader from "../../../components/Loader";

function DigitalAdminBottomPanel() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setSelectedDate(null);
    }
  };
  const downLoadReportFile = async (apiPath, fileName) => {
    const year = selectedDate ? selectedDate?.year() : "";
    try {
      let searchQuery = `${apiPath}`;
      if (year) {
        searchQuery += `?year=${year}`;
      }
      setIsLoading(true);
      const result = await getData(`${searchQuery}`);
      commonFunc.DownloadCSV(result, fileName);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <DashboardCard>
          <Grid container spacing={3}>
            <Grid
              display="flex"
              gap="40px"
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                width="100%"
                justifyContent="center"
                alignItems="center"
                gap={5}
              >
                <Typography variant="h5" component="h6">
                  Downloadable Reports
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    downLoadReportFile(
                      Api.officerAffiliation,
                      "Officers Affiliation"
                    )
                  }
                >
                  <img
                    src={commonFunc.getLocalImagePath("affiliate-icon.png")}
                    alt={"Officers Affiliation"}
                    loading="lazy"
                    width={"35px"}
                    style={{ marginBottom: "10px" }}
                  />

                  <Typography variant="caption" textAlign={"center"}>
                    Officers Affiliation
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    downLoadReportFile(
                      Api.buyerInformation,
                      "Buyer Information"
                    )
                  }
                >
                  {/* <AccountCircleOutlinedIcon fontSize="large" style={{color:"black"}} /> */}
                  <img
                    src={commonFunc.getLocalImagePath("buyer-info.png")}
                    alt={"Buyer Information"}
                    loading="lazy"
                    width={"35px"}
                    style={{ marginBottom: "10px" }}
                  />
                  <Typography variant="caption" textAlign={"center"}>
                    Buyer Information
                  </Typography>
                </Box>
                {/* <Box display="flex" flexDirection="column" alignItems="center">
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
              </Box> */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    downLoadReportFile(
                      Api.sessionSoldByState,
                      "Sessions Sold by State"
                    )
                  }
                >
                  {/* <MapOutlinedIcon fontSize="large" style={{color:"black"}}/> */}
                  <img
                    src={commonFunc.getLocalImagePath("state-map.png")}
                    alt={"Session by State"}
                    loading="lazy"
                    width={"35px"}
                    style={{ marginBottom: "10px" }}
                  />
                  <Typography variant="caption" textAlign={"center"}>
                    Session by State
                  </Typography>
                </Box>
                {/* <Box display="flex" flexDirection="" alignItems="start">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={()=>setOpen(true)}
                  type="button"
                >
                  Select Year
                </Button>
              </Box> */}

                <Box display="flex" flexDirection="" alignItems="start">
                  <UnifiedDatePicker
                    label="Select a date"
                    selectedDate={selectedDate}
                    disabled={isChecked}
                    setSelectedDate={setSelectedDate}
                    // setFilter={setFilter}
                    filter={"year"}
                    // calendarTabs={calendarTabs}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection=""
                  alignItems="center"
                  pt="20px"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={
                          {
                            // height: '1.5em',
                            // width: '1.5em',
                          }
                        }
                        checked={isChecked}
                        onChange={handleChange}
                      />
                    }
                    label="Export Full Dataset"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DashboardCard>
      )}
    </>
  );
}

export default DigitalAdminBottomPanel;
