import axios from 'axios';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';

import {
 setRifas,
 setRifaDetail,
 setNumbersToCart,
 delNumbersToCart,
} from '../slices/rifaSlice';

const svHost = import.meta.env.VITE_SV_HOST;

////////////////////////////////////
export const getRifas = () => async (dispatch) => {
 try {
  let res = await axios.get(`${svHost}/rifas/checkRifas`);
  dispatch(setRifas(res.data));
 } catch (err) {
  console.log(err.message);
 }
};

export const getRifaDetail = (id) => async (dispatch) => {
 try {
  let res = await axios.get(`${svHost}/rifas/detail/${id}`);
  dispatch(setRifaDetail(res.data));
 } catch (err) {
  console.log(err.message);
 }
};

export const addNumbersToCart =
 (selectedNumbers, rifaId, numbersPrice, productName, imgProduct) =>
 async (dispatch) => {
  let { id } = JSON.parse(sessionStorage.getItem('userData')).user;
  let rifas = JSON.parse(localStorage.getItem('persist:root'));
  let { cart } = JSON.parse(rifas.rifas);

  // console.log('carrotp', cart);

  const numbersToAdd = [];
  selectedNumbers.forEach((number) => {
   // Verificar si el número ya existe en el carrito
   const exists = cart.some(
    (item) => item.rifaId === rifaId && item.number === number,
   );

   // Agregar el número al carrito solo si no existe
   if (!exists) {
    numbersToAdd.push({
     productName,
     rifaId,
     number: number.number,
     numbersPrice,
     imgProduct,
     userId: id,
    });
   }
  });

  if (numbersToAdd.length > 0) {
   //  console.log(numbersToAdd);
   await dispatch(setNumbersToCart(numbersToAdd));
  }
 };

export const removeNumbersToCart = (id, rifaNumber) => async (dispatch) => {
 //  console.log('esto me llega: ', { id, rifaNumber });
 let rifas = JSON.parse(localStorage.getItem('persist:root'));
 let rifaParse = JSON.parse(rifas.rifas);
 let cart = rifaParse.cart;
 //  console.log(cart);

 const rifasFiltered = cart.filter(
  (rifa) => rifa.rifaId !== id || rifa.number !== rifaNumber,
 );

 await dispatch(delNumbersToCart(rifasFiltered));
};
