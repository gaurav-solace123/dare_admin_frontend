import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props) => {
  const { typeValid,length, ...rest } = props;

  const handleKeyPress = (event) => {
    if (typeValid === 'text') {
      const regex = /^[a-zA-Z\s]*$/; // allows letters and spaces
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    } 
    else if (typeValid === 'number') {
      const regex = /^[0-9]*$/; // allows only digits
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
      if(event?.target?.value?.length>length){
        event?.preventDefault();
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
