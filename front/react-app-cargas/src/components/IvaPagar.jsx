import React, { useState } from 'react';
import axios from 'axios';




export const IvaPagar = () => {
    const BASE_URL = 'http://localhost:8080/facturacion';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ivaCompra, setIvaCompra] = useState(0);
  const [ivaVenta, setIvaVenta] = useState(0);
  const [ivaPagar, setIvaPagar] = useState(0);

  const config = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  };

  const fetchCompras = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/compras-todas/CompraA`, config());
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchVentas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ventas-todas/VentaA`, config());
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const calculateIva = async () => {
    const compras = await fetchCompras();
    const ventas = await fetchVentas();

    const filteredCompras = compras.filter(compra => {
      const date = new Date(compra.fecha);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    const filteredVentas = ventas.filter(venta => {
      const date = new Date(venta.fecha);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    const ivaCompraTotal = filteredCompras.reduce((acc, compra) => acc + compra.iva, 0);
    const ivaVentaTotal = filteredVentas.reduce((acc, venta) => acc + venta.iva, 0);

    setIvaCompra(ivaCompraTotal);
    setIvaVenta(ivaVentaTotal);
    setIvaPagar(ivaVentaTotal - ivaCompraTotal);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">IVA a Pagar</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="startDate">Fecha Inicio:</label>
          <input 
            type="date" 
            id="startDate" 
            className="form-control" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="endDate">Fecha Fin:</label>
          <input 
            type="date" 
            id="endDate" 
            className="form-control" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={calculateIva}>Calcular IVA</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">IVA Compras</h5>
              <p className="card-text">{ivaCompra}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">IVA Ventas</h5>
              <p className="card-text">{ivaVenta}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">IVA a Pagar</h5>
              <p className="card-text">{ivaPagar}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
