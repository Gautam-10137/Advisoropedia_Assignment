import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css'
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import CreatePosts from './components/post/CreatePosts';
import PostList from './components/post/PostList';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Register/>
       <App/>
    // <Login/>
    // <ResetPassword/>
    // <PostList/>
    // <CreatePosts/>
);

