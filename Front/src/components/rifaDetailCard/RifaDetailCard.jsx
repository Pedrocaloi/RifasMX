import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Grid, useMediaQuery } from '@mui/material';

//-------------------- Actions --------------------------
import { addNumbersToCart } from '../../store/state/actions/rifas';

//-------------------- Components --------------------------

// implementar precio

///////////////////////////////
const RifaDetailCard = ({ rifaDetail }) => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 console.log(rifaDetail);

 /* Parte del Responsive del texto */

 const isSmallScreen = useMediaQuery('(max-width: 1550px)');
 const isExtraSmallScreen = useMediaQuery('(max-width: 1200px)');

 let typographyVariant = 'h4';
 let imgSize = { width: '30rem' };

 if (isSmallScreen) {
  typographyVariant = 'h5';
  imgSize.width = '25rem';
 } else if (isExtraSmallScreen) {
  typographyVariant = 'h6';
  imgSize.width = '20rem';
 }

 /* Compra Rifas action */
 const [selectedNumbers, setSelectedNumbers] = useState([]);
 //  console.log(selectedNumbers);

 const handleNumberClick = (number) => {
  if (selectedNumbers.includes(number)) {
   setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
  } else {
   setSelectedNumbers([...selectedNumbers, number]);
  }
 };

 //  const userDataString = sessionStorage.getItem('userData');
 //  const userData = userDataString ? JSON.parse(userDataString) : null;

 const addToCart = (selectedNumbers) => {
  dispatch(
   addNumbersToCart(
    selectedNumbers,
    rifaDetail.id,
    rifaDetail.numbersPrice,
    rifaDetail.product,
    rifaDetail.imgProduct,
   ),
  );
  setSelectedNumbers([]);
 };

 // Ordenar los números en función de su valor
 const sortedNumeros = [...rifaDetail.numeros].sort(
  (a, b) => a.number - b.number,
 );

 return (
  <>
   {Object.keys(rifaDetail).length > 0 ? (
    /// TIENE QUE IR CON RESPONSIVE
    <Box
     margin='2rem'
     boxShadow='12px 12px 12px -5px rgba(0,0,0,0.75)'
     borderRadius='0.5rem'
     padding='3em'
     sx={{
      bgcolor: '#d4d4d4',
     }}>
     <Box
      display='flex'
      justifyContent='space-between'>
      <Box
       maxWidth='60%'
       maxHeight='20rem'
       borderRadius='0.5rem'
       sx={{
        bgcolor: '#adadad',
        overflow: 'hidden',
       }}
       boxShadow='11px 9px 12px -5px rgba(0,0,0,0.75)'>
       <Typography
        style={{ color: '#333333' }}
        variant='h1'
        margin='20px'
        textAlign='center'>
        {rifaDetail.product}
       </Typography>
       <Typography
        style={{ color: '#333333' }}
        variant={typographyVariant}
        padding='1em'
        margin='16px'>
        {rifaDetail.description}
       </Typography>
      </Box>
      <Box
       borderRadius='0.5rem'
       maxWidth='35rem'
       maxHeight='20rem'
       boxShadow='11px 9px 12px -5px rgba(0,0,0,0.75),inset 0px 5px 91px -6px'
       sx={{
        backgroundColor: '#f83f3f',
        display: 'flex',
        alignItems: 'center',
       }}>
       <img
        src={rifaDetail.imgProduct}
        alt={rifaDetail.product}
        style={{
         width: imgSize.width,
         height: '15rem',
         objectFit: 'cover',
         margin: '2rem',
         boxShadow: '11px 9px 12px -5px rgba(0,0,0,0.75)',
         borderRadius: '0.5rem',
        }}
       />
      </Box>
     </Box>
     <Box
      margin='10em'
      sx={{
       border: '0.2em solid #213911d2',
       borderRadius: '0.5rem',
       bgcolor: '#58aa2271',
       boxShadow:
        '3px 3px 15px 3px rgba(11,61,15,1),  inset 0px 0px 66px 17px rgba(41,125,47,1)',
      }}>
      <Box>
       <Typography
        variant='h2'
        margin='1em'
        style={{ color: '#333333', textAlign: 'center' }}>
        Valor de cada número
       </Typography>
       <Typography
        variant='h2'
        margin='1em'
        style={{ color: '#333333', textAlign: 'center' }}>
        ${rifaDetail.numbersPrice}
       </Typography>
      </Box>
     </Box>
     <Box>
      <Typography
       variant='h1'
       marginTop='2em'
       style={{ color: '#333333', textAlign: 'center' }}>
       TODOS LOS NUMEROS
      </Typography>
      <Typography
       variant='h4'
       margin='10px'
       marginBottom='3rem'
       style={{ color: '#33333', textAlign: 'center' }}>
       Selecciona los numeros que desees comprar
      </Typography>
      <Box
       maxWidth='100%'
       sx={{
        border: '0.2em solid #adadad',
        borderRadius: '0.5rem',
        padding: '2em',
       }}>
       <Grid
        container
        justifyContent='center'
        spacing={2}>
        {sortedNumeros.map((element) => (
         <Grid
          item
          key={element.number}>
          <Button
           fullWidth
           sx={{
            color: selectedNumbers.includes(element) ? '#c4bdbd' : '#333',
            backgroundColor: selectedNumbers.includes(element)
             ? '#b60d0dd2'
             : element.available
             ? '#b31d1d5c'
             : '#3336',
            borderRadius: '50%',
            fontSize: '1.5rem',
            width: '4rem',
            height: '4rem',
           }}
           variant={!element.available ? 'outlined' : 'text'}
           onClick={() => handleNumberClick(element)}
           disabled={!element.available}>
           {element.number}
          </Button>
         </Grid>
        ))}
       </Grid>
      </Box>
      <Box
       width='100%'
       sx={{
        display: 'flex',
        justifyContent: 'center',
       }}>
       <Button
        variant='contained'
        sx={{
         width: '200px',
         height: '60px',
         fontSize: '1.05rem',
         margin: '2em',
         backgroundColor: '#9e0423',
         '&:hover': {
          backgroundColor: '#630014',
         },
        }}
        onClick={() => {
         // Realizar acción con los números seleccionados
         addToCart(selectedNumbers);
         navigate('/cart');
        }}>
        COMPRAR NUMEROS
       </Button>
      </Box>
     </Box>
    </Box>
   ) : (
    <Typography>Rifa no encontrada</Typography>
   )}
  </>
 );
};

//////////////////////////////

export default RifaDetailCard;
