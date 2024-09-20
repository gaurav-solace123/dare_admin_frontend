import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const sizes = {
	width: 500,
	height: 200,
};

export default function PieArcLabel({ data = [], size = sizes, sx }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For small screens

	return (
		<Box position={"relative"}>
			<Grid
				container
				alignItems={"center"}
				justifyContent={"center"}
				width={"100%"}
				flexDirection={"column"}
			>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<PieChart
						series={[
							{
								arcLabel: (item) =>
									item?.value ? ` ${item.percentage} %` : "",
								arcLabelProps: { style: { fontWeight: "bold" } },
								data: data,
								highlightScope: { fade: "global", highlight: "item" },
								faded: {
									innerRadius: 30,
									additionalRadius: -30,
									color: "gray",
								},
							},
						]}
						height={isMobile ? 300 : 450}
						width={450}
						slotProps={{ legend: { hidden: true } }}
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Box alignItems={"center"}>
						{data?.length &&
							data?.map((item) => (
								<Box display={"flex"} alignItems={"center"} gap={"12px"} mb={1}>
									<Box
										height={"25px"}
										width={"25px"}
										bgcolor={item?.color}
									></Box>
									<Typography fontWeight="700" variant="subtitle2" mb={0}>
										{`${item?.label}  - #${item?.value}`}
									</Typography>
								</Box>
							))}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
