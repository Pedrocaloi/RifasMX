import React from 'react';
import {
 Box,
 Typography,
 List,
 ListItem,
 ListItemText,
 IconButton,
 ListItemAvatar,
 Avatar,
 Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

import { removeNumbersToCart, buyRifas } from '../../store/state/actions/rifas';

import './shopCart.css'; // Importa el archivo CSS para las transiciones

const ShopCart = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const cart = useSelector((state) => state.rifas.cart);

 const handleDeleteCart = (id, rifaNumber) => {
  dispatch(removeNumbersToCart(id, rifaNumber));
 };

 const handleBuyClick = () => {
  // Filtrar y transformar el carrito según los campos necesarios
  const filteredCart = cart.map((item) => {
   return {
    rifaId: item.rifaId,
    number: item.number,
    userId: item.userId,
   };
  });
  console.log('filtrado', filteredCart);
  // Llamar a la acción buyRifas con el carrito filtrado
  dispatch(buyRifas(filteredCart));
  navigate('');
 };

 return (
  <Box
   display='flex'
   flexDirection='column'
   alignItems='center'
   width='80%' // Añadido para reducir el ancho del componente
   margin='0 auto' // Centra el componente horizontalmente
  >
   <Typography
    margin='1em'
    style={{ color: '#333333' }} // Aumenta el tamaño de la fuente
    variant='h2'
    align='center'
    gutterBottom>
    Carrito de Compras
   </Typography>
   <TransitionGroup component={List}>
    {cart && cart.length > 0 ? (
     cart.map((item) => (
      <CSSTransition
       key={item.rifaId + ` num: ${item.number}`}
       classNames='fade'
       timeout={300}>
       <ListItem>
        <ListItemAvatar>
         <Avatar
          src={item.imgProduct}
          sx={{ width: 60, height: 60 }}
         />
        </ListItemAvatar>
        <ListItemText
         primary={
          <Typography
           variant='body1'
           style={{ color: 'green', textAlign: 'right', fontWeight: 'bold' }}>
           Número: {item.number}
          </Typography>
         }
         secondary={
          <Typography
           component='div'
           variant='body1'
           style={{ textAlign: 'right', color: '#333333' }}>
           <b>Producto:</b> {item.productName}
          </Typography>
         }
         primaryTypographyProps={{
          style: { color: 'green', textAlign: 'right' },
         }}
         style={{ flex: 1 }}
        />
        <ListItemText
         primary={
          <Typography
           variant='body1'
           style={{ color: 'green', textAlign: 'right', fontWeight: 'bold' }}>
           Precio: ${item.numbersPrice}
          </Typography>
         }
         style={{ textAlign: 'right' }}
        />
        <IconButton
         onClick={() => handleDeleteCart(item.rifaId, item.number)}
         edge='end'
         aria-label='delete'>
         <DeleteIcon />
        </IconButton>
       </ListItem>
      </CSSTransition>
     ))
    ) : (
     <Typography
      variant='body1'
      align='center'
      color='textSecondary'
      style={{ margin: '1em 0' }}>
      Sin items
     </Typography>
    )}
   </TransitionGroup>

   {cart.length > 0 && (
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
       // Realizar accion de compra
       handleBuyClick();
      }}>
      COMPRAR NUMEROS
     </Button>
    </Box>
   )}
  </Box>
 );
};

export default ShopCart;
