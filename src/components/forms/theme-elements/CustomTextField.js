import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props) => {
  const { typeValid, ...rest } = props;

  const handleKeyPress = (event) => {
    if (typeValid === 'text') {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    }
  };

  return <TextField {...rest} onKeyPress={handleKeyPress} />;
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
}));

export default CustomTextField;
