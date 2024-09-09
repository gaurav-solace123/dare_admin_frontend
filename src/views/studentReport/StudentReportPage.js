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
    <Card
      sx={sx?sx:{ padding: 0}}
      elevation={9}
      variant={undefined}
    >
       
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={'center'}
              mb={3}
            >
              <Box>
                {title ? <Typography variant="h5">{title}</Typography> : ''}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      

      {middlecontent}
      {footer}
    </Card>
  );
};

export default StudentReportPage;
