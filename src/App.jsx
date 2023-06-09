import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/UI/Navbar/Navbar';
import { AuthContext } from './context';

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
