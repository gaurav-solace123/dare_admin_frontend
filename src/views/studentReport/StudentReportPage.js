import React from "react";
import { CardContent, Typography, Stack, Box } from "@mui/material";

const StudentReportPage = ({
  title,
  subtitle,
  children,
  action,
  footer,
  middlecontent,
}) => {
  return (
    <>
      <Box >
        {action}
        <CardContent>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
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
