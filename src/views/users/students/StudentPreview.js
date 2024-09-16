import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import StudentDetails from "./StudentDetails";
import SessionReassignMentTable from "./SessionReassignement";

function StudentPreview() {
	const [activeTab, setActiveTab] = useState("student_details"); // Default to 'day' tab

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
			{/* <Tabs value={activeTab} onChange={handleTabChange} >
        <Tab  value={'student_details'} label='Student Details' />
        <Tab  value={'sessions_reassignment'} label={'Sessions Reassignment'} />
      </Tabs> */}
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
            Student Details
          </Typography>
        </Box>
			{activeTab === "student_details" && <StudentDetails />}
			{activeTab === "sessions_reassignment" && (
				<Box mx="20px">
					<SessionReassignMentTable
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

export default StudentPreview;
