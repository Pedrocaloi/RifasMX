import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, Box } from '@mui/material';

//-------------------- Actions --------------------------
import { getRifas } from '../../store/state/actions/rifas';

//-------------------- Components --------------------------
import RifaCard from '../rifaCard/RifaCard';
import { Link } from 'react-router-dom';

/////////////////////////////
const CurrentRifas = () => {
 const dispatch = useDispatch();

 const { allRifas } = useSelector((state) => state.rifas);

 useEffect(() => {
  dispatch(getRifas());
 }, []);

 //  console.log(allRifas);

 return (
  <Box>
   <Box
    margin='4rem'
    padding='2rem'
    bgcolor='#2b0e0e'
    borderRadius={2}
    boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75), inset 0px 5px 73px 34px'>
    <Typography
     margin='1em'
     textAlign='center'
     gutterBottom
     fontSize='4rem'
     borderRadius='0.5em'
     fontWeight='bold'
     letterSpacing='0.1em'
     boxShadow='0px 0px 41px 9px rgba(26,9,9,1), inset 0px 0px 77px -29px rgba(97,16,16,1)'
     textDecoration='underline'
     color='#c4bdbd'
     variant='h1'>
     Rifas vigentes
    </Typography>

    <Grid
     margin='2em'
     padding='2em'
     justifyContent='center'
     container
     columnSpacing={{ xs: 2, sm: 2, md: 4 }}>
     {allRifas.map((rifa) => (
      <Grid
       item
       margin='1.5em'
       key={rifa.id}>
       <Link
        style={{ textDecoration: 'none' }}
        to={`/rifa/${rifa.id}`}>
        <RifaCard rifa={rifa} />
       </Link>
      </Grid>
     ))}
    </Grid>
   </Box>
  </Box>
 );
};

export default CurrentRifas;
