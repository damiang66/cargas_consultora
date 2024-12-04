import React from 'react'
import '../assets/style/FacturacionPage.css'
import { OptionCard } from './OptionCard'
export const FacturacionPage = () => {
  return (
    <div className="facturacion-page">
    <h1>Facturación</h1>
    <div className="options-container">
      <OptionCard title="Compra A" description="Realiza una compra tipo A" />
      <OptionCard title="Compra B" description="Realiza una compra tipo B" />
      <OptionCard title="Venta A" description="Realiza una venta tipo A" />
      <OptionCard title="Venta B" description="Realiza una venta tipo B" />
    </div>
  </div>
  )
}
