import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/AppRoutes'
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (

  <RouterProvider router={router} />
  )

}

export default App