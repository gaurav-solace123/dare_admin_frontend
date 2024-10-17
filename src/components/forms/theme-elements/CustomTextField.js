import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props) => {
  const { typeValid,length,isUsername,displayEmpty,isPostalCode,id, ...rest } = props;
  const handleInput = (event) => {
    if (isPostalCode) {
      event.target.value = event.target.value.toUpperCase(); // convert to uppercase
    }
  };
  const handleKeyPress = (event) => {
    if (isPostalCode) {
      const regex = /^[a-zA-Z0-9]*$/; // allows only letters and numbers (no spaces or special characters)
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    }
    if (isUsername) {
      // Disallow spaces only, allow everything else
      if (event.key === ' ') {
        event.preventDefault();
      }
    }  
 
    if (typeValid === 'text') {
      const regex = /^[a-zA-Z]*$/; // allows only letters (no spaces)
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
      if(event?.target?.value?.length>=length){
        event?.preventDefault();
      }
    } 
    else if (typeValid === 'number') {
      const regex = /^\d*$/; // allows only digits
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
      
    }
    if(event?.target?.value?.length>=length){
      event?.preventDefault();
    }
  };
  

  return <TextField {...rest} displayEmpty={displayEmpty} id={id} onKeyPress={handleKeyPress} onInput={handleInput} />;
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

export default CustomTextField;
