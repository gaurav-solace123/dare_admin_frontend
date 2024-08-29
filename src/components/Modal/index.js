import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Adjust width according to your form size
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, title, children, actions }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {title && (
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          {children} {/* The content of the modal will go here */}
        </Box>
        {actions && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            {actions} {/* Custom actions for the modal */}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
