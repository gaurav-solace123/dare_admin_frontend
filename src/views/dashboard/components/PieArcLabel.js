import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { Translate } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
// const data = [
//   { value: 55, label: 'Middle School' },
//   { value: 45, label: 'Elementary School' },
//   { value: 15, label: 'C' },
//   { value: 20, label: 'D' },
// ];

const sizes = {
  width: 500,
  height: 200,
};

export default function PieArcLabel({ data = [], size = sizes, sx }) {
  const [datas, setDatas] = React.useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For small screens

  return (
    <Box position={"relative"}>
      <Grid container alignItems={"center"} justifyContent={"center"} width={'105%'}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <PieChart
            series={[
              {
                arcLabel: (item) => (item?.value ? ` ${item.percentage} %` : ""),
                data: data,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={isMobile ? 300 : 250}
            slotProps={{ legend: { hidden: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box alignItems={"center"}>
            {data?.length &&
              data?.map((item) => (
                <Box display={"flex"} alignItems={"center"} gap={"12px"} mb={1}>
                  <Box
                    height={"25px"}
                    width={"25px"}
                    bgcolor={item?.color}
                  ></Box>
                  <Typography fontWeight="700" variant="subtitle2" mb={0}>
                    {`${item?.label}  - ${item?.value}`}
                  </Typography>
                </Box>
              ))}
            {/* <Box display={"flex"} alignItems={"center"} gap={"12px"}>
        <Box height={"25px"} width={"25px"} bgcolor={"blue"}></Box>
        <Typography fontWeight="700" variant="subtitle2" mb={0}>
          50%
        </Typography>
      </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
