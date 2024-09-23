import React, { useState } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import MenuOption from "./MenuOption";
import SelectYear from "./SelectYear";
import UnifiedDatePicker from "../../../components/YearMonthDayDatepicker";
import commonFunc from "../../../utils/common";
import { CheckBox } from "@mui/icons-material";

function DigitalAdminBottomPanel() {
  const options = ["Year"];
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
  }
  // const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // const handleClose = () => setOpen(false);
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
                  src={commonFunc.getLocalImagePath("affiliate-icon.png")}
                  alt={"Officers Affiliation"}
                  loading="lazy"
                  width={"35px"}
                  style={{ marginBottom: "10px" }}
                />

                <Typography variant="danger" textAlign={"center"}>
                  Officers Affiliation
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
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
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <MapOutlinedIcon fontSize="large" style={{color:"black"}}/> */}
                <img
                  src={commonFunc.getLocalImagePath('state-map.png')}
                  alt={"Sessions Sold by State"}
                  loading="lazy"
                  width={"35px"}
                  style={{ marginBottom: "10px" }}
                />
                <Typography variant="caption" textAlign={"center"}>
                  Sessions Sold by State
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
              setSelectedDate={setSelectedDate}
              // setFilter={setFilter}
              filter={'year'}
              // calendarTabs={calendarTabs}
            />
              </Box>
              <Box display="flex" flexDirection="" alignItems="center" pt='20px'>
               <CheckBox sx={{
                height:'1.5em',
                width:'1.5em'
               }}>
                
               </CheckBox>
               <Typography paddingLeft={'10px'}>
                  All
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DashboardCard>

      {/* <Modal
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
              color: "#0055a4", 
              "&:hover": {
                color: "red", 
              },
            }}
          >X
          </IconButton>
          <SelectYear
            cancel={() => handleClose()}
            
          />
        </Box>
      </Modal> */}
    </>
  );
}

export default DigitalAdminBottomPanel;
