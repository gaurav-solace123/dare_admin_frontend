import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { Translate } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
// const data = [
//   { value: 55, label: 'Middle School' },
//   { value: 45, label: 'Elementary School' },
//   { value: 15, label: 'C' },
//   { value: 20, label: 'D' },
// ];

const sizes = {
	width: 500,
	height: 200,
};

export default function PieChartStudentReports({
	data = [],
	size = sizes,
	sx,
}) {
	const [datas, setDatas] = React.useState([]);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For small screens

	return (
		<Box position={"relative"}>
			<Grid
				container
				alignItems={"center"}
				justifyContent={"center"}
				flexDirection={"column"}
			>
				<Grid item xs={12} sm={12} md={6} lg={6}>
					{data && data.every((item) => item.value === 0) ? (
						<Box
							sx={{
								height: isMobile ? 250 : 250,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									height: isMobile ? 140 : 150,
									width: isMobile ? 140 : 150,
									borderRadius: "50%",
									border: "1.5px solid #0055a4",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									position: "relative",
								}}
							>
								<Typography
									variant="h6"
									fontWeight="500"
									color="#0055a4"
									sx={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									0%
								</Typography>
							</Box>
						</Box>
					) : (
						// Render the PieChart when data is available
						<PieChart
							series={[
								{
									arcLabel: (item) =>
										item?.percentage > 0 ? `${item.percentage} %` : "",
									data: data,
									highlightScope: { fade: "global", highlight: "item" },
									faded: {
										innerRadius: 30,
										additionalRadius: -30,
										color: "gray",
									},
								},
							]}
							height={isMobile ? 250 : 250} // Increased height
							width={isMobile ? 250 : 250}
							slotProps={{ legend: { hidden: true } }}
						/>
					)}
				</Grid>
				<Box alignItems={"center"}>
					{data?.length &&
						data?.map((item) => (
							<Box
								display={"flex"}
								alignItems={"start"}
								gap={"12px"}
								mb={1}
								key={item?.label}
							>
								<Box height={"25px"} width={"25px"} bgcolor={item?.color} />
								<Typography fontWeight="500" variant="subtitle2" mb={0}>
									{`${item?.label}  - #${item?.value || "0"}`}
								</Typography>
							</Box>
						))}
				</Box>
			</Grid>
		</Box>
	);
}
