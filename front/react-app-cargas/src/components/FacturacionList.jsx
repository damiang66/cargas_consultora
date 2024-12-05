import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from 'react-router-dom';
import { ComprasFIndAll, VentasFindAll } from '../services/facturacionService';

export const FacturacionList = () => {
    const { tipo } = useParams();
    const [facturas, setFacturas] = useState([]);
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);
    const [formData, setFormData] = useState({
        fecha: null,
        tipo: tipo,
        cuit: '',
        nombre: '',
        nroFactura: '',
        subTotal: null,
        iva: null,
        otro: null,
        total: null
    });

    useEffect(() => {
        if (tipo.startsWith('Compra')) {
            traerCompras(tipo);
        } else {
            traerVentas(tipo);
        }
    }, [tipo]);

    const traerCompras = async (tipo) => {
        const respuesta = await ComprasFIndAll(tipo);
        setFacturas(respuesta.data);
        setFilteredFacturas(respuesta.data);
    };

    const traerVentas = async (tipo) => {
        const respuesta = await VentasFindAll(tipo);
        setFacturas(respuesta.data);
        setFilteredFacturas(respuesta.data);
    };

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

    const openModal = () => {
        setDisplayModal(true);
    };

    const hideModal = () => {
        setDisplayModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Aquí deberías agregar la lógica para enviar los datos al backend.
        console.log(formData);
        hideModal();
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={hideModal} className="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} autoFocus />
            </div>
        );
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
            <Button label="Cargar" icon="pi pi-plus" onClick={openModal} />
            <Dialog header="Nueva Factura" visible={displayModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={hideModal}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="fecha">Fecha</label>
                        <Calendar id="fecha" name="fecha" value={formData.fecha} onChange={handleInputChange} dateFormat="yy-mm-dd" showIcon />
                    </div>
                    <div className="p-field">
                        <label htmlFor="cuit">CUIT</label>
                        <InputText id="cuit" name="cuit" value={formData.cuit} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="nroFactura">Nro Factura</label>
                        <InputText id="nroFactura" name="nroFactura" value={formData.nroFactura} onChange={handleInputChange} />
                    </div>
                    {(tipo === 'CompraA' || tipo === 'VentaA') && (
                        <>
                            <div className="p-field">
                                <label htmlFor="subTotal">Subtotal</label>
                                <InputNumber id="subTotal" name="subTotal" value={formData.subTotal} onValueChange={(e) => setFormData({ ...formData, subTotal: e.value })} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="iva">IVA</label>
                                <InputNumber id="iva" name="iva" value={formData.iva} onValueChange={(e) => setFormData({ ...formData, iva: e.value })} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="otro">Otro</label>
                                <InputNumber id="otro" name="otro" value={formData.otro} onValueChange={(e) => setFormData({ ...formData, otro: e.value })} />
                            </div>
                        </>
                    )}
                    <div className="p-field">
                        <label htmlFor="total">Total</label>
                        <InputNumber id="total" name="total" value={formData.total} onValueChange={(e) => setFormData({ ...formData, total: e.value })} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
