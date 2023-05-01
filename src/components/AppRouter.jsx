import React, { useContext } from 'react';
import { publicRoutes, privateRoutes } from '../router';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { nanoid } from 'nanoid';
import { Loader } from './UI/Loader/Loader';

export const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if(isLoading) {
    return <Loader />
  }

  return (
    isAuth
    ?
    <Routes>
      {privateRoutes.map(route =>
        <Route
          element={<route.element />}
          path={route.path}
          key={nanoid()}
        />
      )};
      <Route path='/*' element={<Navigate to="/posts" replace/>}/>
    </Routes>
    :
    <Routes>
      {publicRoutes.map(route =>
        <Route
          element={<route.element />}
          path={route.path}
          key={nanoid()}
        />
      )};
      <Route path='/*' element={<Navigate to="/login" replace/>}/>
  </Routes>
  )
}
