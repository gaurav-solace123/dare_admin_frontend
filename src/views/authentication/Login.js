import React from 'react';
import { Grid, Box, Card,  } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import useCustomToast from '../../hooks/CustomToastHook';

const Login2 = () => {
  const { showToast, ToastComponent } = useCustomToast();
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center" color={'#337ab7'} m={'5px'}
              fontSize={'calc(1.3rem + .6vw)'} fontWeight={700 }>
                <Logo />
              </Box>
              <AuthLogin
              showToast={showToast}
                
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastComponent />
    </PageContainer>
  );
};

export default Login2;
