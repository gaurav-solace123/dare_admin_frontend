import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard'
import { Box, Grid, Typography } from '@mui/material'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
function DigitalAdminBottomPanel() {
  return (
    <DashboardCard>
         <Grid container spacing={3}>  
         <Grid item xs={12} lg={6}>  
  <Typography variant="h4" component="h6" my={2}>
    Total Unassigned Credits
  </Typography>   
  <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' ,width:'100%'}} 
      textAlign="center"
      fontSize={20}
      fontWeight="bold"
    >
      5,231
    </Box>
    {/* <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption">Name 1</Typography>
    </Box>
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption">Name 2</Typography>
    </Box> */}
  </Box>
</Grid>
<Grid item xs={12} lg={6}>  
  <Typography variant="h4" component="h6" my={2}>
   Downloadable Reports
  </Typography>   
  <Box display="flex" flexDirection="row" alignItems="center" gap={5}>
   
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption" textAlign={'center'}>Officers Affiliation</Typography>
    </Box>
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption" textAlign={'center'}>Buyer Information</Typography>
    </Box>
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption" textAlign={'center'}>Credits Sold by District 12-month lock back</Typography>
    </Box>
    <Box display="flex" flexDirection="column" alignItems="center">
      <DescriptionOutlinedIcon fontSize="large" />
      <Typography variant="caption" textAlign={'center'}>Credits Sold by State 12-month lock back</Typography>
    </Box>
  </Box>
</Grid>

    </Grid>  
        </DashboardCard>
  )
}

export default DigitalAdminBottomPanel