import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/App';
import Personagem from './pages/Personagens';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/personagem/:idPerson', element: <Personagem /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
