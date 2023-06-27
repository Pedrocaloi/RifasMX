import React, { useState } from 'react';
import {
 Box,
 IconButton,
 ListItemText,
 Typography,
 ListItem,
 List,
 useTheme,
 useMediaQuery,
 Drawer,
 AppBar,
 Slide,
 CssBaseline,
} from '@mui/material';
import {
 Search,
 Message,
 DarkMode,
 LightMode,
 Notifications,
 Help,
 Close,
 Menu as MenuHamb,
 AccountCircleRounded,
 LocalPlay,
} from '@mui/icons-material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMode } from '../../app/state/slices/modeSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

//-------------------- Assets --------------------------
import UserIcon from './userIcon';
import UserIconNoLogged from './userIconNoLogged';
import NavLogo from '../../assets/NavLogo.svg';

/////////////////////////
const NavBar = () => {
 const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
 const userData = JSON.parse(sessionStorage.getItem('userData'));
 //  const dispatch = useDispatch();
 const navigate = useNavigate();
 const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

 const handleOpenMenu = () => {
  setIsMobileMenuToggled(true);
 };

 const handleCloseMenu = () => {
  setIsMobileMenuToggled(false);
 };

 const handleRegisterClick = () => {
  navigate('/register');
 };

 const handleLoginClick = () => {
  navigate('/login');
 };

 const theme = useTheme();
 const neutralLight = theme.palette.neutral.light;
 const dark = theme.palette.neutral.dark;
 const background = theme.palette.background.default;
 const primaryLight = theme.palette.primary.light;
 const alt = theme.palette.background.alt;
 const font = theme.palette.others.font;

 return (
  <>
   {userData ? (
    // User Logged Navbar
    <AppBar position='static'>
     <CssBaseline />
     <Box
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      bgcolor={alt}>
      <Box
       display='flex'
       justifyContent='space-around'
       alignItems='center'>
       <Typography
        fontWeight='bold'
        fontSize='clamp(1rem, 2rem, 2.25rem)'
        color='primary'
        onClick={() => navigate('/home')}
        sx={{
         '&:hover': {
          transition: '0.4s',
          backgroundColor: dark,
          cursor: 'pointer',
          borderRadius: '15px',
         },
        }}>
        {isNonMobileScreens ? (
         <img
          src={NavLogo}
          alt='img not found'
          width='200rem'
         />
        ) : (
         <img
          src={NavLogo}
          alt='img not found'
          width='150rem'
         />
        )}
       </Typography>
      </Box>

      {/* DESKTOP NAV */}

      {isNonMobileScreens ? (
       <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        gap='2rem'>
        <RouterLink to='/cart'>
         <IconButton>
          <ShoppingBasketIcon sx={{ color: font, fontSize: '25px' }} />
         </IconButton>
        </RouterLink>

        <RouterLink to='/home'>
         <IconButton>
          <LocalPlay sx={{ color: font, fontSize: '25px' }} />
         </IconButton>
        </RouterLink>

        <RouterLink to=''>
         <IconButton>
          <Help sx={{ color: font, fontSize: '25px' }} />
         </IconButton>
        </RouterLink>

        <IconButton onClick={() => dispatch(setMode())}>
         {theme.palette.mode === 'dark' ? (
          <DarkMode sx={{ color: font, fontSize: '25px' }} />
         ) : (
          <LightMode sx={{ color: font, fontSize: '25px' }} />
         )}
        </IconButton>

        <UserIcon
         onLoginClick={handleLoginClick}
         onRegisterClick={handleRegisterClick}
        />
        {/* <FormContro
            l variant='standard' value={fullName}>
            <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {                                      sesion del usuario
                    pr: '0.25rem',
                    width: '3rem'
                  },
                  '& .MuiSelect-select:focus':{
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl> */}
       </Box>
      ) : (
       <IconButton onClick={handleOpenMenu}>
        <MenuHamb />
       </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
       <Drawer
        anchor='right'
        open={isMobileMenuToggled}
        onClose={handleCloseMenu}
        TransitionComponent={Slide}
        // TransitionProps={{
        //  direction: 'left',
        //  timeout: { enter: 500, exit: 500 },
        // }}
       >
        <Box
         position='fixed'
         right='0'
         bottom='0'
         height='100%'
         zIndex='10'
         maxWidth='500px'
         minWidth='250px'
         backgroundColor={alt}>
         {/* CLOSE ICON */}
         <Box
          display='flex'
          justifyContent='flex-end'
          p='1rem'>
          <IconButton onClick={handleCloseMenu}>
           <Close />
          </IconButton>
         </Box>

         {/* MENU ITEMS */}

         <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          gap='3rem'
          alignItems='center'>
          <UserIcon
           onLoginClick={handleLoginClick}
           onRegisterClick={handleRegisterClick}
          />

          <IconButton>
           <RouterLink to='/cart'>
            <ShoppingBasketIcon sx={{ color: font, fontSize: '25px' }} />
           </RouterLink>
          </IconButton>

          <RouterLink to='/home'>
           <IconButton>
            <LocalPlay sx={{ color: font, fontSize: '25px' }} />
           </IconButton>
          </RouterLink>

          <RouterLink to=''>
           <IconButton>
            <Help sx={{ color: font, fontSize: '25px' }} />
           </IconButton>
          </RouterLink>

          <IconButton
           onClick={() => dispatch(setMode())}
           sx={{ fontSize: '25px' }}>
           {theme.palette.mode === 'dark' ? (
            <DarkMode sx={{ color: font, fontSize: '25px' }} />
           ) : (
            <LightMode sx={{ color: font, fontSize: '25px' }} />
           )}
          </IconButton>
         </Box>
        </Box>
       </Drawer>
      )}
     </Box>
    </AppBar>
   ) : (
    // User No Logged Navbar
    <AppBar position='static'>
     <CssBaseline />
     <Box
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      bgcolor={alt}>
      <Box
       display='flex'
       justifyContent='space-around'
       alignItems='center'>
       <Typography
        fontWeight='bold'
        fontSize='clamp(1rem, 2rem, 2.25rem)'
        color='primary'
        onClick={() => navigate('/home')}
        sx={{
         '&:hover': {
          transition: '0.4s',
          backgroundColor: dark,
          cursor: 'pointer',
          borderRadius: '15px',
         },
        }}>
        {isNonMobileScreens ? (
         <img
          src={NavLogo}
          alt='img not found'
          width='200rem'
         />
        ) : (
         <img
          src={NavLogo}
          alt='img not found'
          width='150rem'
         />
        )}
       </Typography>
      </Box>

      {/* DESKTOP NAV */}

      {isNonMobileScreens ? (
       <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        gap='2rem'>
        <RouterLink
         to='/register'
         style={{ textDecoration: 'none' }}>
         <Typography sx={{ color: font }}>Crear Cuenta</Typography>
        </RouterLink>

        <RouterLink
         to='/login'
         style={{ textDecoration: 'none' }}>
         <Typography sx={{ color: font }}>Iniciar</Typography>
        </RouterLink>
        <UserIconNoLogged
         onLoginClick={handleLoginClick}
         onRegisterClick={handleRegisterClick}
        />
       </Box>
      ) : (
       <IconButton onClick={handleOpenMenu}>
        <MenuHamb />
       </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
       <Drawer
        anchor='right'
        open={isMobileMenuToggled}
        onClose={handleCloseMenu}
        TransitionComponent={Slide}
        TransitionProps={{
         direction: 'left',
         timeout: { enter: 500, exit: 500 },
        }}>
        <Box
         position='fixed'
         right='0'
         bottom='0'
         height='100%'
         zIndex='10'
         maxWidth='500px'
         minWidth='250px'
         backgroundColor={alt}>
         {/* CLOSE ICON */}
         <Box
          display='flex'
          justifyContent='flex-end'
          p='1rem'>
          <IconButton onClick={handleCloseMenu}>
           <Close />
          </IconButton>
         </Box>

         {/* MENU ITEMS */}

         <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          gap='3rem'
          alignItems='center'>
          <UserIconNoLogged
           onLoginClick={handleLoginClick}
           onRegisterClick={handleRegisterClick}
          />

          <RouterLink to=''>
           <IconButton>
            <Help sx={{ color: font, fontSize: '25px' }} />
           </IconButton>
          </RouterLink>
         </Box>
        </Box>
       </Drawer>
      )}
     </Box>
    </AppBar>
   )}
  </>
 );
};

export default NavBar;
