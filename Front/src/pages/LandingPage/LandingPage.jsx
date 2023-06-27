import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';

//-------------------- Assets --------------------------
import LandingImg from '../../assets/Landing.jpg';

//-------------------- Components --------------------------
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/footer';

/////////////////////
const LandingPage = () => {
 const theme = useTheme();
 const background = theme.palette.background.login;

 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${LandingImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
   }}>
   <NavBar />
   <Box
    sx={{
     backgroundColor: 'rgba(0, 0, 0, 0.65)',
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     flex: '1 1 auto',
    }}>
    <Typography
     variant='h1'
     textAlign='center'
     marginTop='1em'
     fontSize='5em'
     color='whitesmoke'
     style={{
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
     }}>
     ¡Bienvenidos a RifasMX!
    </Typography>
    <Typography
     variant='h3'
     textAlign='center'
     marginTop='1em'
     color='whitesmoke'>
     Ve a ver todas nuestras rifas disponibles
    </Typography>
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     }}>
     <Link to='/home'>
      <Button
       variant='contained'
       sx={{
        width: '200px',
        height: '60px',
        fontSize: '1.5rem',
        margin: '2em',
        backgroundColor: '#9e0423',
        '&:hover': {
         backgroundColor: '#630014',
        },
       }}>
       ¡Ir a rifas!
      </Button>
     </Link>
    </Box>
   </Box>
   <Footer />
  </Box>
 );
};

/////////////////////////////

export default LandingPage;
