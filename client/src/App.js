import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import PostList from './components/post/PostList';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />}/>     
          <Route path="/" exact element={<Register/>}/>
          <Route path="/posts" exact element={<PostList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
