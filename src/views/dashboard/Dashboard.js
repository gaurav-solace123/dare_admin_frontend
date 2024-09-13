import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import SalesOverview from "./components/SalesOverview";
import YearlyBreakup from "./components/YearlyBreakup";
import RecentTransactions from "./components/RecentTransactions";
import ProductPerformance from "./components/ProductPerformance";
import Blog from "./components/Blog";
import MonthlyEarnings from "./components/MonthlyEarnings";
import DigitalAdminPanel from "./components/DigitalAdminPanel";
import DigitalAdminDownloadReport from "./components/DigitalAdminDownloadReport";
import DigitalAdminUnassignedReport from "./components/DigitalAdminUnassignedReport";
import DigitalAdminBottomPanel from "./components/DigitalAdminBottomPanel";
import Loader from "../../components/Loader";

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
						{/* <Grid item xs={12} lg={6} pt={0}>
							
						</Grid> */}

						<Grid display="flex" gap="20px" item xs={12} lg={6} pt={0}>
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
						{/* <Grid item xs={12} lg={6}>
            <Box height="100%" display="flex" flexDirection="column">
              <DigitalAdminUnassignedReport title={"Total Unassigned Credits"} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box height="100%" display="flex" flexDirection="column">
              <DigitalAdminDownloadReport title={"Downloadable Reports"} />
            </Box>
          </Grid> */}
						<Grid item xs={12} lg={12}>
							{/* <Box height="100%" display="flex" flexDirection="column">
              <DigitalAdminDownloadReport title={"Downloadable Reports"} />
            </Box> */}
							<DigitalAdminBottomPanel />
						</Grid>

						{/* <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid> */}
					</Grid>
				</Box>
			)}
		</>
	);
};

export default Dashboard;
