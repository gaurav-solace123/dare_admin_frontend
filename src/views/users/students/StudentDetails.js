import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

function StudentDetails() {
  const [activeTab, setActiveTab] = useState('student_details'); // Default to 'day' tab

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Tabs value={activeTab} onChange={handleTabChange} >
        <Tab  value={'student_details'} label='Student Details' />
        <Tab  value={'sessions_reassignment'} label={'Sessions Reassignment'} />
      </Tabs>
  )
}

export default StudentDetails