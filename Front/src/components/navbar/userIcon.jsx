import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton, useTheme } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';

//////////////////////////////////////////////////////////
const UserIcon = ({ onLoginClick, onRegisterClick }) => {
 const [anchorEl, setAnchorEl] = useState(null);
 const theme = useTheme();
 const font = theme.palette.others.font;

 const handleMenuOpen = (event) => {
  event.preventDefault();
  setAnchorEl(event.currentTarget);
 };

 const handleMenuClose = (event) => {
  setAnchorEl(null);
 };

 const handleLoginClick = () => {
  handleMenuClose();
  onLoginClick();
 };

 const handleRegisterClick = () => {
  handleMenuClose();
  sessionStorage.removeItem('userData');
  window.location.href = '/';
 };

 const handleScroll = () => {
  setAnchorEl(null);
 };

 document.addEventListener('scroll', handleScroll);

 return (
  <>
   <IconButton onClick={handleMenuOpen}>
    <AccountCircleRounded sx={{ color: font, fontSize: '45px' }} />
   </IconButton>
   <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    disableScrollLock={true}>
    <MenuItem onClick={handleRegisterClick}>Cerrar Sesion</MenuItem>
   </Menu>
  </>
 );
};

export default UserIcon;
