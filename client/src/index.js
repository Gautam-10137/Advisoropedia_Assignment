import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css'
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Register/>
    <Login/>
    // <ResetPassword/>
);

