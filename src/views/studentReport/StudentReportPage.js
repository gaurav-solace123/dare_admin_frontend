import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const StudentReportPage = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  sx
}) => {


  return (
    <>

      <Box marginTop={"30px"}>

       {action}
        <CardContent  sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={'center'}
              mb={3}
            >
              <Box>
                {/* {title ? <Typography variant="h5">{title}</Typography> : ''} */}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
              
            </Stack>
          ) : null}


          {children}
         
        </CardContent>
        </Box>
      

      {middlecontent}
      {footer}
    </>
  );
};

export default StudentReportPage;
