import { Grid, Typography, Card, CardContent, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SessionReassignMentTable from "./SessionReassignement";

function StudentDetails() {
	const sessionData = [
		{
			sessionName: "Judy Room",
			sessionCode: "F042J",
			workbook: "Elementary English",
			instructor: "Instructor Dashboard",
		},
		{
			sessionName: "BT 220",
			sessionCode: "5ZLY9",
			workbook: "Elementary English",
			instructor: "Instructor Dashboard",
		},
		{
			sessionName: "Homeschool AE",
			sessionCode: "285U0",
			workbook: "Elementary English",
			instructor: "Instructor Dashboard",
		},
	];
	const tableFields = ["sessionName", "sessionCode", "workbook", "instructor"];
	const headers = [
		{ id: "sessionName", numeric: false, label: "Session Name" },
		{ id: "sessionCode", numeric: false, label: "Session Code" },
		{ id: "workbook", numeric: false, label: "Workbook" },
		{ id: "instructor", numeric: false, label: "Instructor" },
		{ id: "action", numeric: false, label: "Instructor Action" },
	];

	return (
		<>
			<Grid container mt={1} spacing={1}>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					{/* <Typography variant="h6" component="h6" mb={2}>
						Student Details
					</Typography> */}
					<Card>
						<CardContent>
							<Box display="flex" gap="15px">
								<Avatar sx={{ bgcolor: "#673ab7" }}>GJ</Avatar>
								<Box display="flex" flexDirection="column" gap="8px">
									<Box display="flex" gap="8px">
										<Typography
											variant="h6"
											fontWeight={600}
											color={"#2b2d3b"}
											component="label"
											htmlFor="firstName"
										>
											Gaurav Jadhav
										</Typography>
									</Box>

									<Box display="flex" gap="8px">
										<Typography variant="subtitle1" fontWeight={400}>
											Username: Data
										</Typography>
									</Box>

									<Box display="flex" gap="8px">
										<Typography variant="subtitle1" fontWeight={400}>
											gauravjadhav@gmail.com
										</Typography>
									</Box>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<Box mt={5}>
				<Typography variant="h6" component="h6" mb={2}>
					Sessions Reassignment
				</Typography>
				<SessionReassignMentTable
					listData={sessionData}
					tableFields={tableFields}
					headers={headers}
				/>
			</Box>
		</>
	);
}

export default StudentDetails;
