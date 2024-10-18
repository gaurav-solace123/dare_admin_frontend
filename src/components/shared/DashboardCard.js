import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const DashboardCard = ({
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


  const renderCardHeading = () => {
    if (cardheading) {
      return (
        <CardContent>
          <Typography sx={{ height: "50px" }} variant="h6">
            {headtitle}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {headsubtitle}
          </Typography>
        </CardContent>
      );
    } else {
      return (
        <CardContent sx={{ p: "10px" }}>
          {title && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box>
                <Typography variant="h5">
                  {title} {subtitle}
                </Typography>
              </Box>
              {action}
            </Stack>
          )}
          {children}
        </CardContent>
      );
    }
  };
  
  return (
    <Card sx={sx ? sx : { padding: 0 }} elevation={9} variant={undefined}>
      {renderCardHeading()}
      {middlecontent}
      {footer}
    </Card>
  );
  
};

export default DashboardCard;
