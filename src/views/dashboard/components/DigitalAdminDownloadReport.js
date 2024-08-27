import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box, Typography } from '@mui/material';
function DigitalAdminDownloadReport({title}) {
  return (
    <DashboardCard title={title} >
     <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption">Name 1</Typography>
    </Box>
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption">Name 2</Typography>
    </Box>
  </Box>
        </DashboardCard>
  )
}

export default DigitalAdminDownloadReport