import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CustomDatePicker({ label, value, onChange, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      sx={{height:'auto'}}
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
