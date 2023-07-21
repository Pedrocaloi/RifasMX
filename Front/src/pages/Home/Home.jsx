import React from 'react';
import { Box } from '@mui/material';

//-------------------- Components --------------------------
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/NavBar';
import CurrentRifas from '../../components/currentRifas/CurrentRifas';

////////////////////////
const Home = () => {
 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
   }}>
   <NavBar />
   <Box
    sx={{ flex: '1 1 auto' }}
    bgcolor='#F5F5F5'>
    <CurrentRifas />
   </Box>
   <Footer />
  </Box>
 );
};

///////////////////////

export default Home;
