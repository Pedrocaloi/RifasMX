import React from 'react';
import { Box } from '@mui/material';

//-------------------- Components --------------------------
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navBar';
import RifaDetailCard from '../../components/rifaDetailCard/RifaDetailCard';

////////////////////////////
const rifaDetail = () => {
 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#F5F5F5',
   }}>
   <NavBar />
   <Box sx={{ flex: '1 1 auto' }}>
    <RifaDetailCard />
   </Box>
   <Footer />
  </Box>
 );
};

///////////////////////////

export default rifaDetail;
