import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/UI/Navbar/Navbar';
import { AppRouter } from './components/AppRouter';

export const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
)