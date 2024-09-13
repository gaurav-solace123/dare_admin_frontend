import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Grid, Typography } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"; // For Officers Affiliation
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"; // For Buyer Information
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"; // For Credits Sold by District
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"; // For Credits Sold by State

function DigitalAdminBottomPanel() {
	return (
		<>
			<DashboardCard>
				<Grid container spacing={3}>
					{/* <Grid item xs={12} lg={4}>
						<Typography variant="h5" component="h6">
							Downloadable Reports
						</Typography>
					</Grid> */}

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
						<Typography variant="h5" component="h6">
							Downloadable Reports
						</Typography>
						<Box display="flex" flexDirection="row" alignItems="center" gap={5}>
							<Box display="flex" flexDirection="column" alignItems="center">
								<img
									src={"/src/assets/images/logos/affiliate-icon.png"}
									alt={"gkgk"}
									loading="lazy"
									width={"35px"}
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
