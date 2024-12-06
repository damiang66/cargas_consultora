import React from 'react'
import '../assets/style/FacturacionPage.css'
import { OptionCard } from '../components/OptionCard'
import { useNavigate } from 'react-router-dom'
export const FacturacionPage = () => {
 
  return (
    <div className="facturacion-page">
    <h1>Facturación</h1>
    <div className="options-container">
    <OptionCard titulo='Compra Factura A' title="CompraA" description="Realiza una compra tipo A" />
        <OptionCard titulo='Compra Factura C' title="CompraB" description="Realiza una compra tipo C"/>
        <OptionCard titulo='Damian factura A' title="VentaA" description="Realiza una venta tipo A" />
        <OptionCard titulo='Clarisa Factura C'title="VentaB" description="Realiza una venta tipo C"  />
    </div>
  </div>
  )
}
