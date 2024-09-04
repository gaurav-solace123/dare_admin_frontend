import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import DigitalAdminPanel from './components/DigitalAdminPanel';
import DigitalAdminDownloadReport from './components/DigitalAdminDownloadReport';
import DigitalAdminUnassignedReport from './components/DigitalAdminUnassignedReport';
import DigitalAdminBottomPanel from './components/DigitalAdminBottomPanel';
import Loader from '../../components/Loader';


const Dashboard = () => {
  
  const data = [
    { value: 55, label: 'Middle School' },
    { value: 45, label: 'Elementary School' },
];

const [isLoading, setIsLoading] = React.useState(false);
  return (

    <>
    {isLoading?<Loader/>: <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>


          <Grid item xs={12} lg={6}>
            <DigitalAdminPanel title={"Credits Sold By Level"} data={data}/>
          </Grid>
          <Grid item xs={12} lg={6}>
            <DigitalAdminPanel title={"Classes Actived by Level"} data={data}/>
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <Box height="100%" display="flex" flexDirection="column">
              <DigitalAdminUnassignedReport title={"Total Unassigned Credits"} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box height="100%" display="flex" flexDirection="column">
              <DigitalAdminDownloadReport title={"Downloadable Reports"} />
            </Box>
          </Grid> */}
          <Grid item xs={12} lg={12}>
            {/* <Box height="100%" display="flex" flexDirection="column">
              <DigitalAdminDownloadReport title={"Downloadable Reports"} />
            </Box> */}
            <DigitalAdminBottomPanel/>
          </Grid>

          {/* <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>}
    
    </>
  );
};

export default Dashboard;
