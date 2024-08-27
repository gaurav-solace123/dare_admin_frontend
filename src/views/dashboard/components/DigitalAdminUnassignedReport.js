import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box, Grid, Typography } from '@mui/material';
function DigitalAdminUnassignedReport({title}) {
    return (
        <DashboardCard title={title} >
     <Grid container spacing={3}>  
     <Grid item xs={12} lg={6}>     
 <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} 
 textAlign={'center'}
 fontSize={20}
 fontWeight={'bold'}
 >
      5,231
    </Box>
    </Grid>
    <Grid item xs={12} lg={6}>   
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
  </Grid>
    </Grid>  

      
         
            </DashboardCard>
      )
    }
    

export default DigitalAdminUnassignedReport