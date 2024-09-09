import React from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const CustomSelect = styled((props) => {
  const { displayEmpty, id, label, options,error,helperText, ...rest } = props;

  return (
    <FormControl fullWidth variant="outlined">
      {/* <InputLabel>{label}</InputLabel> */}
      <Select
        labelId={id}
        id={id}
        displayEmpty={displayEmpty}
        // label={label}
        {...rest}
      >
        {/* Display placeholder if displayEmpty is true */}
        {displayEmpty && (
          <MenuItem value="" disabled>
            {label}
          </MenuItem>
        )}
        {/* Render options */}
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
})(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.error.main, // Ensuring error color is consistent
  },
}));

export default CustomSelect;
