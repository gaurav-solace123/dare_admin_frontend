import { Typography } from '@mui/material'
import React, { useState } from 'react'
import DashboardCard from '../../components/shared/DashboardCard'
import MenuOption from '../dashboard/components/MenuOption'
import PieArcLabel from '../dashboard/components/PieArcLabel'
import CustomDatePicker from './component/CustomDatePicker'
import Loader from '../../components/Loader'
import Counter from '../../components/Counter'

function Middle() {
    const [selectedDate, setSelectedDate] = useState(null);
    
  const [isLoading, setIsLoading] = React.useState(false);
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
      };
    const data = [
        { value: 25, label: 'Middle English Workbook Students' },
        { value: 33, label: 'Middle Spanish Workbook Students' },
        // { value: 25, label: 'Middle Portuguese Workbook Stude' },
        { value: 17, label: 'Middle French Workbook Students' },
    ];
  return (
    <>
        {/* <Typography variant="h2">Elementary Student Report</Typography> */}
       {isLoading?<Loader/>: <DashboardCard title={"Middle Student Report"} action={<CustomDatePicker  label="Select a date" value={selectedDate} onChange={handleDateChange}/>}>
       <Counter number={20} duration={3} title={"Middle English Workbook Students"} sx={{marginTop:10}}/>    
        </DashboardCard>}
    </>
  )
}

export default Middle