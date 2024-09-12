import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/shared/DashboardCard";
import MenuOption from "../dashboard/components/MenuOption";
import PieArcLabel from "../dashboard/components/PieArcLabel";
import CustomDatePicker from "./component/CustomDatePicker";
import Loader from "../../components/Loader";
import StudentReportPage from "./StudentReportPage";
import Api from "../../services/constant";
// import UnifiedDatePicker from "../../components/PDatePicker";
import UnifiedDatePicker from "../../components/YearMonthDayDatepicker";
import PDatePicker from "../../components/PDatePicker";
import { getData } from "../../services/services";
import dayjs from "dayjs";
import PieChartStudentReports from "./component/PieChartStudentReports";

function StudentReport() {
	const [selectedDate, setSelectedDate] = useState(dayjs());
	const [filter, setFilter] = useState("day");
	const [isLoading, setIsLoading] = React.useState(false);

	const colors = ["#74D3AE", "#DDBDD5", "#52D1DC"];
	const [elementrySchoolData, setElementrySchoolData] = useState([]);
	const [middleSchoolData, setMiddleSchoolDataSchoolData] = useState([]);

	const getFormatedDate = (date) => {
		let formattedDate;

		if (date) {
			switch (filter) {
				case "day":
					formattedDate = date.format("DD-MM-YYYY"); // Format for day view
					break;
				case "month":
					formattedDate = date.format("MM"); // Format for month view
					break;
				case "year":
					formattedDate = date.format("YYYY"); // Format for year view
					break;
				default:
					dayjs().format("DD-MM-YYYY");
					break;
			}
			return formattedDate;
		} else {
			return dayjs().format("DD-MM-YYYY");
		}
	};
	const getReports = async (type) => {
		const date = getFormatedDate(selectedDate);
		let searchQuery = `?schoolType=${type}&${filter}=${date}`;
		try {
			setIsLoading(true);
			const result = await getData(`${Api.studentReports}${searchQuery}`); //
			if (result.status == 200) {
				//   const dumy=[
				//     {
				//         "language": "Spanish",
				//         "name": "Elementary Spanish",
				//         "totalStudents": 23,
				//         "percentage": 40
				//     },
				//     {
				//         "language": "French",
				//         "name": "Elementary French",
				//         "totalStudents": 23,
				//         "percentage": 10
				//     },
				//     {
				//         "language": "English",
				//         "name": "Elementary English",
				//         "totalStudents": 122,
				//         "percentage": 50
				//     }
				// ]
				//   const response = dumy.sort((a, b) => a.language.localeCompare(b.language));
				const response = result?.data.sort((a, b) =>
					a.language.localeCompare(b.language)
				);
				const tempData = response.map((item) => ({
					label: `${item?.language} Workbook Students`,
					value: item?.totalStudents,
					percentage: Math.round(item?.percentage),
				}));
				const updatedData = tempData.map((item, index) => ({
					...item,
					color: colors[index % colors.length], // Use modulo to ensure index doesn't go out of bounds
				}));

				if (type == "Elementary") {
					setElementrySchoolData(updatedData);
				} else if (type == "Middle School") {
					setMiddleSchoolDataSchoolData(updatedData);
				}
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};
	const data = [
		{ value: 25, label: " English Registered Students", percentage: 20 },
		{ value: 33, label: " Spanish Registered Students", percentage: 50 },
		// { value: 25, label: 'Elementary Portuguese Workbook Stude' },
		{ value: 17, label: "French Registered Students", percentage: 90 },
	];
	const data2 = [
		{ value: 25, label: " English Registered Students", percentage: 20 },
	];

	useEffect(() => {
		getReports("Elementary");
		getReports("Middle School");
	}, [selectedDate]);
	return (
		<>
			{/* <Typography variant="h2">Elementary Student Report</Typography> */}
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Box
						sx={{
							border: "2px solid",
							color: "#0055a4",
							padding: 2,
							position: "relative",
							borderRadius: 2,
						}}
					>
						<Box
							sx={{
								position: "absolute",
								top: "-12px", // Adjust this to make the text overlap more or less with the border
								left: "16px",
								backgroundColor: "#fff",
								padding: "0 8px",
								display: "inline-block",
								// color: 'red', // To match the border color
								fontSize: "24px",
								fontWeight: "bold",
							}}
						>
							<Typography
								variant="h7"
								fontWeight={600}
								component="label"
								htmlFor="mailingAddress"
							>
								Students Report
							</Typography>
						</Box>

						<StudentReportPage
							title={"Elementary"}
							action={
								<Box display={"flex"} justifyContent={"end"}>
									{/* <PDatePicker
                label="Select a date"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                /> */}
									<UnifiedDatePicker
										label="Select a date"
										selectedDate={selectedDate}
										setSelectedDate={setSelectedDate}
										setFilter={setFilter}
										filter={filter}
									/>
								</Box>
							}
						>
							<Grid container spacing={2} justifyContent="center">
								<Grid item xs={12} md={6} lg={6}>
									<Box
										p={"15px"}
										boxShadow={
											"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;"
										}
									>
										<Typography variant="h3" align="center">
											Elementary School
										</Typography>

										<PieChartStudentReports
											data={elementrySchoolData}
											size={{ height: 280 }}
										/>
									</Box>
								</Grid>

								<Grid item xs={12} md={6} lg={6}>
									<Box
										p={"15px"}
										height={"100%"}
										boxShadow={
											"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;"
										}
									>
										<Typography variant="h3" align="center">
											Middle School{" "}
										</Typography>

										<PieChartStudentReports
											data={middleSchoolData}
											size={{ height: 280 }}
										/>
									</Box>
								</Grid>
							</Grid>
						</StudentReportPage>
					</Box>
				</>
			)}
		</>
	);
}

export default StudentReport;
