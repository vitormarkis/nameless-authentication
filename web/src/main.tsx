import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/layouts/LoginForm';
import RegisterForm from './components/layouts/RegisterForm';
import './index.css';
import Home from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, 
    children: [
      {
        index: true,
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/register',
        element: <RegisterForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>
);
