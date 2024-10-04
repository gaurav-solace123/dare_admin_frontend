import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon, 
  ListItemText
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import SweetAlertComponent from '../../../components/sweetAlert/SweetAlertComponent';

const Profile = () => {
  const [isAlert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null); 
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/auth/login'); 
  };

  const openLogoutAlert = () => {
    handleClose2(); 
    setAlert(true);  
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      
      {/* Message Dropdown */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
     
          <Button onClick={openLogoutAlert} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>

      {isAlert && (                                                  
        <SweetAlertComponent
          title="You want to logout?"
          text="You will be logged out."
          onConfirm={handleLogout} 
          onCancel={() => setAlert(false)}
          setAlert={setAlert}
          title2="Logout!"
          text2= "You have Successfully Logged Out"
         
        />
      )}                                                   
    </>
  );
};

export default Profile;
