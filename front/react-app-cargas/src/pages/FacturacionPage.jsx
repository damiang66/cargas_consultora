import React from 'react'
import '../assets/style/FacturacionPage.css'
import { OptionCard } from '../components/OptionCard'
import { useNavigate } from 'react-router-dom'
export const FacturacionPage = () => {
 
  return (
    <div className="facturacion-page">
    <h1>Facturación</h1>
    <div className="options-container">
    <OptionCard title="CompraA" description="Realiza una compra tipo A" />
        <OptionCard title="CompraB" description="Realiza una compra tipo B"/>
        <OptionCard title="VentaA" description="Realiza una venta tipo A" />
        <OptionCard title="VentaB" description="Realiza una venta tipo B"  />
    </div>
  </div>
  )
}
