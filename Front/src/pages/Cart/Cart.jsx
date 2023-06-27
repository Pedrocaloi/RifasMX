import React from 'react';
import { Box } from '@mui/material';

//-------------------- Components --------------------------
import NavBar from '../../components/navbar/navBar';
import Footer from '../../components/footer/footer';
import ShopCart from '../../components/shopCart/shopCart';

////////////////////
const Cart = () => {
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
    <ShopCart />
   </Box>
   <Footer />
  </Box>
 );
};

export default Cart;
