import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from 'pages/About';
import { Posts } from 'pages/Posts';

export const App = () => {
  return (
    <Routes>
      <Route
        path='/about'
        element={<About />}
      />
      <Route
        path='/posts'
        element={<Posts/>}
      />
    </Routes>
  )
}
