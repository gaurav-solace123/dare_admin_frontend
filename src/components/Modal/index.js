import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';

const styleModel = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModel}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#0055a4', // Default color
            '&:hover': {
              color: 'red', // Change color on hover
            },
          }}
        >
          X {/* You can replace this with <CloseIcon /> if you are using MUI icons */}
        </IconButton>

        {/* Children will be dynamically rendered here */}
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
