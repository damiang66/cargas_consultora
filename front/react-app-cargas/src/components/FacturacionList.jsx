import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import axios from 'axios';

 export const FacturacionList = () => {
    const [facturas, setFacturas] = useState([]);
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Aquí se debe hacer la llamada al backend para obtener los datos iniciales.
        
    }, []);

    const filterByDate = () => {
        if (startDate && endDate) {
            const filtered = facturas.filter(factura => {
                const facturaDate = new Date(factura.fecha);
                return facturaDate >= startDate && facturaDate <= endDate;
            });
            setFilteredFacturas(filtered);
        } else {
            setFilteredFacturas(facturas);
        }
    };

    return (
        <div className="facturacion-list">
            <div className="p-grid p-align-center p-justify-between">
                <div className="p-col-12 p-md-4">
                    <Calendar 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.value)} 
                        placeholder="Fecha Inicio"
                        dateFormat="yy-mm-dd"
                        showIcon 
                    />
                </div>
                <div className="p-col-12 p-md-4">
                    <Calendar 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.value)} 
                        placeholder="Fecha Fin"
                        dateFormat="yy-mm-dd"
                        showIcon 
                    />
                </div>
                <div className="p-col-12 p-md-4">
                    <Button label="Filtrar" icon="pi pi-search" onClick={filterByDate} />
                </div>
            </div>
            <DataTable value={filteredFacturas} paginator rows={10} className="p-datatable-gridlines">
                <Column field="id" header="ID" sortable />
                <Column field="fecha" header="Fecha" sortable />
                <Column field="tipo" header="Tipo" sortable />
                <Column field="cuit" header="CUIT" sortable />
                <Column field="nombre" header="Nombre" sortable />
                <Column field="nroFactura" header="Nro Factura" sortable />
                <Column field="subTotal" header="Subtotal" sortable />
                <Column field="iva" header="IVA" sortable />
                <Column field="otro" header="Otro" sortable />
                <Column field="total" header="Total" sortable />
            </DataTable>
        </div>
    );
};


