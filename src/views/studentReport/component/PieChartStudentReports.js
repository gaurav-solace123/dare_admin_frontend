import * as React from "react";
import { PieChart ,pieArcLabelClasses} from "@mui/x-charts/PieChart";
import { Box } from "@mui/system";
import { useTheme, useMediaQuery,Grid, Typography  } from "@mui/material";
import commonFunc from "../../../utils/common";

const sizes = {
	width: 500,
	height: 200,
};

export default function PieChartStudentReports({
	data = [],
	_size = sizes,
	_sx,
}) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For small screens

	const getIsMobile=()=>isMobile ? 250 : 450
	const getIsMobile2=()=> isMobile ? 140 : 300
	const heightValue = isMobile ? 300 : 450;

	return (
		<Box position={"relative"}>
		<Grid
			container
			alignItems={"center"}
			justifyContent={"center"}
			flexDirection={"column"}
		>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				{data && data.every((item) => item.value === 0) ? (
					<Box
						sx={{
							height: getIsMobile(),
							width: getIsMobile(),
							// height: 450, 
							// width: 450,  
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
						}}
					>
						<Box
							sx={{
								height: getIsMobile2(),
							width: getIsMobile2(),
								// height:300,
								// width:300,
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
									item?.percentage > 0 ? `${item.percentage}%` : "",
								data: data,
								arcLabelMinAngle: 10,
								arcLabelRadius: '70%',
								highlightScope: { fade: "global", highlight: "item" },
								faded: {
									innerRadius: 30,
									additionalRadius: -30,
									color: "gray",
								},
							},
						]}
						height={heightValue}
						width={450}
						slotProps={{ legend: { hidden: true } }}
						sx={{
							transform: "translate(11%, 0)",
							[`& .${pieArcLabelClasses.root}`]: {
							  fontWeight: 'bold',
							  fill: '#ffffffe0 '
							},
						  }}
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
								{`${item?.label}  - #${commonFunc.formatNumberWithCommas(item?.value) || "0"}`}
							</Typography>
						</Box>
					))}
			</Box>
		</Grid>
	</Box>
	);
}
