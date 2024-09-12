import { Tab, Tabs } from '@mui/material'
import React from 'react'

function StudentDetails() {
  return (
    <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab  value={'student_details'} label='Student Details' />
        <Tab  value={'sessions_reasignment'} label={label} />
      </Tabs>
  )
}

export default StudentDetails