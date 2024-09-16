import { Avatar, Box, Card, CardContent, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import PurchaseCredit from "./PurchaseCredit";
import TransferCredit from "./TransferCredit";

function InstructorPreview() {
	const [activeTab, setActiveTab] = useState("purchase_credit"); // Default to 'day' tab

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};
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
            Instructor Details
          </Typography>
        </Box>
        
			<Tabs value={activeTab} onChange={handleTabChange} >
        <Tab  value={'purchase_credit'} label='Purchase credit ' />
        <Tab  value={'credit_transfer_for_log'} label={'Credit transfer for log '} />
        </Tabs>

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
			{activeTab === "purchase_credit" && <PurchaseCredit />}
			{activeTab === "credit_transfer_for_log" && (
				<Box mx="20px">
					<TransferCredit
						listData={sessionData}
						tableFields={tableFields}
						headers={headers}
					/>
				</Box>
			)}
			</Box>
		</>
	);
}

export default InstructorPreview;
