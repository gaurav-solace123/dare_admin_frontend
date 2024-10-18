import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/system";
import { useTheme, useMediaQuery ,Grid, Typography} from "@mui/material";
import commonFunc from "../../../utils/common";
import './index.css'
const sizes = {
  width: 500,
  height: 200,
};

export default function PieArcLabel({ data = [], _size = sizes, _sx }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const heightValue = isMobile ? 300 : 450;

  return (
    <Box position={"relative"}>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        flexDirection={"column"}
      >
        <>
          {data.length>0 && data.every((item) => item.value === 0) ? (
            <>
              <Box
                sx={{
                  height: 450,
                  width: 450,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    // height: isMobile ? 140 : 150,
                    // width: isMobile ? 140 : 150,
                    height: 300,
                    width: 300,
                    borderRadius: "50%",
                    border: "1.5px solid #0055a4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="500"
                    color="#0055a4"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    0%
                  </Typography>
                </Box>
              </Box>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box alignItems={"center"}>
                  {data?.length>0 &&
                    data?.map((item) => (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={"12px"}
                        mb={1}
                        key={item?.value}
                      >
                        <Box
                          height={"25px"}
                          width={"25px"}
                          bgcolor={item?.color}
                        ></Box>
                        <Typography fontWeight="700" variant="subtitle2" mb={0}>
                          {`${item?.label}  - #${item?.value}`}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <PieChart
                  series={[
                    {
                      arcLabel: (item) =>
                        item?.value ? ` ${item.percentage} %` : "",
                      arcLabelProps: { style: { fontWeight: "bold" } },
                      data: data,
                      highlightScope: { fade: "global", highlight: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  height={heightValue}
                  width={450}
                  slotProps={{ legend: { hidden: true } }}
                  sx={{ transform: "translate(11%, 0)" }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box alignItems={"center"}>
                  {data?.length>0 &&
                    data?.map((item) => (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={"12px"}
                        mb={1}
                        key={item?.label}
                      >
                        <Box
                          height={"25px"}
                          width={"25px"}
                          bgcolor={item?.color}
                        ></Box>
                        <Typography fontWeight="700" variant="subtitle2" mb={0}>
                          {`${item?.label}  - #${commonFunc.formatNumberWithCommas(item?.value)}`}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Grid>
            </>
          )}
        </>
      </Grid>
    </Box>
  );
}
