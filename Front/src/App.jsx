import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import './App.css';

const svHost = import.meta.env.VITE_SV_HOST;

//-------------------- Assets --------------------------
import { themeSettings } from './utils/theme';

//-------------------- Pages --------------------------
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/404/NotFound.jsx';
import Register from './pages/Register/Register';
import RifaDetail from './pages/RifaDetail/RifaDetail';
import Cart from './pages/Cart/Cart';
import ActivateAccount from './pages/ActivateAccount/ActivateAccount';

/////////////////
function App() {
 //  const mode = useSelector((state) => state.mode.mode);
 const mode = 'light';
 const theme = createTheme(themeSettings(mode));
 const location = useLocation();
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const userDataString = sessionStorage.getItem('userData');
 const userData = userDataString ? JSON.parse(userDataString) : null;
 const isUserLoggedIn = userData && userData.user && userData.token;
 //  console.log('USER DATAAA', userData);
 const isUserAdmin = isUserLoggedIn && userData.user.admin;
 const logueado = isUserLoggedIn && user?.id === userData?.user.id;
 const esAdmin = isUserAdmin && user?.admin;

 const fetchUser = async () => {
  // llamado a la api cada vez que cambiamos de rutas
  if (isUserLoggedIn) {
   try {
    const token = userData.token;
    // console.log(token, 'tokeeeee');
    const response = await axios.get(`${svHost}/user/protected`, {
     headers: {
      authorization: `Bearer ${token}`,
     },
    });
    setUser(response.data.user);
   } catch (error) {
    console.log(error.message);
    setUser(null);
   } finally {
    setLoading(false);
   }
  } else {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchUser();
 }, []); // Sin dependencias, se ejecuta solo una vez al montar el componente

 useEffect(() => {
  fetchUser();
 }, [location.pathname]); // Se ejecuta cuando cambia la ruta

 if (loading) {
  return <div>Loading...</div>;
 }

 return (
  <>
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
     <Route
      path='/'
      element={<LandingPage />}
     />

     <Route
      path='/home'
      element={isUserLoggedIn ? <Home /> : <Navigate to='/login' />}
     />

     <Route
      path='/login'
      element={!isUserLoggedIn ? <Login /> : <Navigate to='/login' />}
     />

     <Route
      path='/register'
      element={!isUserLoggedIn ? <Register /> : <Navigate to='/login' />}
     />

     <Route
      path='/rifa/:id'
      element={isUserLoggedIn ? <RifaDetail /> : <Navigate to='/login' />}
     />

     <Route
      path='/cart'
      element={isUserLoggedIn ? <Cart /> : <Navigate to='/login' />}
     />

     <Route
      path='/confirm'
      element={<ActivateAccount />}
     />

     <Route
      path='*'
      element={<NotFound />}
     />
    </Routes>
   </ThemeProvider>
  </>
 );
}

export default App;
