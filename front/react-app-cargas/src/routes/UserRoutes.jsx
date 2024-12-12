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
import { LiquidacionPage } from '../pages/LiquidacionPage';
import { LiquidarionRegistrarPage } from '../pages/LiquidarionRegistrarPage';
import { Reportes } from '../components/layout/Reportes';
import { ReportesLiquidacion } from '../components/ReportesLiquidacion';
import { ReporteViajes } from '../components/ReporteViajes';
import { FleterosPage } from '../pages/FleterosPage';
import { FleterosForm } from '../components/FleterosForm';
import { RepartoPage } from '../pages/RepartoPage';
import { RepartoForm } from '../components/RepartoForm';
import { SeguimientoPage } from '../pages/SeguimientoPage';
import { FacturacionPage } from '../pages/FacturacionPage';
import { FacturacionList } from '../components/FacturacionList';
import { IvaPagar } from '../components/IvaPagar';

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
                <Route path='liquidaciones' element={<LiquidacionPage />} />
                <Route path="liquidaciones/registrar" element={<LiquidarionRegistrarPage />} />
                <Route path="liquidaciones/editar/:id" element={<LiquidarionRegistrarPage />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="reportesLiquidacion" element={<ReportesLiquidacion />} />
                <Route path="reportesViaje" element={<ReporteViajes />} />
                <Route path="fleteros" element={<FleterosPage />} />
                <Route path="fleteros/registrar" element={<FleterosForm />} />
                <Route path="fleteros/editar/:id" element={<FleterosForm />} />
                <Route path="repartos" element={<RepartoPage />} />
                <Route path="repartos/registrar" element={<RepartoForm />} />
                <Route path="repartos/editar/:id" element={<RepartoForm />} />
                <Route path="seguimiento" element={<SeguimientoPage />} />
                <Route path="seguimiento/ver/:id" element={<RepartoForm />} />
                <Route path="facturacion" element={<FacturacionPage />} />
                <Route path="facturacion/:tipo"element={<FacturacionList/>} />
                <Route path="facturacion/registrar" element={<FacturacionPage />} />
                <Route path="facturacion/editar/:id" element={<FacturacionPage />} />
                <Route path="ivaAPagar" element={<IvaPagar />} />
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