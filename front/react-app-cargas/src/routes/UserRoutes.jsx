import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { UsersPage } from "../pages/UsersPage";
import { useAuth } from "../auth/hooks/useAuth";
import { ClientePage } from "../pages/ClientePage";
import { ClienteForm } from "../components/ClienteForm";
import { PaginaPrincipal } from "../pages/PaginaPrincipal";
import { useSelector } from "react-redux";
import { usePrincipal } from '../hooks/usePrincipal';
import { ViajePage } from '../pages/ViajePage';
import {ViajeRegistrarPage} from '../pages/ViajeRegistrarPage'

export const UserRoutes = () => {
  const { login } = useAuth();
  const { potigian, amdm } = useSelector(state => state.principal);

  return (
    <>
      <PaginaPrincipal />
      {potigian ? (
        <>
          <Navbar />
          <Routes>
            <Route path="users" element={<UsersPage />} />
            {!login.isAdmin || (
              <>
                <Route path="users/register" element={<RegisterPage />} />
                <Route path="users/edit/:id" element={<RegisterPage />} />
                <Route path="clientes" element={<ClientePage />} />
                <Route path="clientes/registrar" element={<ClienteForm />} />
                <Route path="clientes/editar/:id" element={<ClienteForm />} />
                <Route path='viajes' element={<ViajePage />} />
                <Route path="viajes/registrar" element={<ViajeRegistrarPage />} />
                <Route path="viajes/editar/:id" element={<ViajeRegistrarPage />} />
              </>
            )}
            <Route path="/" element={<Navigate to="/users" />} />
          </Routes>
        </>
      ) : amdm ? (
        <div>esta seccion esta en proceso</div>
      ) : null}
    </>
  );
};