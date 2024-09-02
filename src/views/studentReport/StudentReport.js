import { Typography } from '@mui/material'
import React, { useState } from 'react'
import DashboardCard from '../../components/shared/DashboardCard'
import MenuOption from '../dashboard/components/MenuOption'
import PieArcLabel from '../dashboard/components/PieArcLabel'
import CustomDatePicker from './component/CustomDatePicker'

function StudentReport() {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
      };
    const data = [
        { value: 25, label: 'Elementary English Workbook Students' },
        { value: 33, label: 'Elementary Spanish Workbook Students' },
        { value: 25, label: 'Elementary Portuguese Workbook Stude' },
        { value: 17, label: 'Elementary French Workbook Students' },
    ];
  return (
    <div>
        {/* <Typography variant="h2">Elementary Student Report</Typography> */}
        <DashboardCard title={"Elementary Student Report"} action={<CustomDatePicker  label="Select a date" value={selectedDate} onChange={handleDateChange}/>}>
        <PieArcLabel data={data} size={{height: 280,}} />
        </DashboardCard>
    </div>
  )
}

export default StudentReport