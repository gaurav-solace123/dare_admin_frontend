import { Box } from "@mui/system";
import React from "react";
import CountUp from "react-countup";
import { baselightTheme } from "../../theme/DefaultColors";

export default function Counter({ number, duration, title, sx }) {
  return (
    <Box 
      className="number" 
      display={'flex'} 
      flexDirection={'column'} 
      alignItems={'center'} 
      justifyContent={'center'}
      sx={sx} // Apply additional styles passed via the sx prop
    >
      <CountUp 
        duration={duration} 
        className="counter" 
        end={number} 
        style={{ fontFamily: 'Poppins', fontSize: 100 }} 
      />
      <h1 style={{ marginTop: 50 ,color:baselightTheme.palette.grey[500]}}>{title}</h1>
    </Box>
  );
}
