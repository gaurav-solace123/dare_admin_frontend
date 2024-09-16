import { Box, Tab, Tabs } from "@mui/material";
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
		</>
	);
}

export default StudentPreview;
