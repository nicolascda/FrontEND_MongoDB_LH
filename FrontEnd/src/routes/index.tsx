import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home';
import { Catalogo } from '../pages/catalogo';
import { Login } from '../pages/login';
import { Cesta } from '../pages/cesta';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cesta" element={<Cesta />} />
    </Routes>
  );
};
