import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from 'react-router-dom';
import { ComprasFIndAll, ComprasSave, VentasFindAll, VentasSave } from '../services/facturacionService';

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

        if (name === 'subTotal') {
            const subTotal = parseFloat(value) || 0;
            const iva = subTotal * 0.21;
            const total = subTotal + iva + (formData.otro || 0);
            setFormData({ ...formData, subTotal, iva, total });
        }

        if (name === 'otro') {
            const otro = parseFloat(value) || 0;
            const total = (formData.subTotal || 0) + (formData.iva || 0) + otro;
            setFormData({ ...formData, otro, total });
        }
    };

    const handleSubmit = async () => {
        if (tipo.startsWith('Compra')) {
            await ComprasSave(formData);
            traerCompras(tipo); // Refresca la lista de facturas
        } else {
            await VentasSave(formData);
            traerVentas(tipo); // Refresca la lista de facturas
        }
        hideModal();
    };
    const imprimir=()=>{
        console.log(filteredFacturas);
        
    }

    const calculateTotals = () => {
        let totalSubtotal = 0;
        let totalIva = 0;
        let totalOtro = 0;
        let totalTotal = 0;

        filteredFacturas.forEach(factura => {
            totalSubtotal += factura.subTotal || 0;
            totalIva += factura.iva || 0;
            totalOtro += factura.otro || 0;
            totalTotal += factura.total || 0;
        });

        return {
            totalSubtotal,
            totalIva,
            totalOtro,
            totalTotal
        };
    };

    // Obtener los totales calculados
    const { totalSubtotal, totalIva, totalOtro, totalTotal } = calculateTotals();

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
                <Column field="subTotal" header="Subtotal" footer={totalSubtotal} sortable />
                <Column field="iva" header="IVA" footer={totalIva} sortable />
                <Column field="otro" header="Otro" footer={totalOtro} sortable />
                <Column field="total" header="Total" footer={totalTotal} sortable />
            </DataTable>
            <Button  className='m-2'label="Cargar" icon="pi pi-plus" onClick={openModal} />
            <Button label="Imprimir" icon="pi pi-print" className='m-2' onClick={imprimir} />
            <Dialog header="Nueva Factura" visible={displayModal} style={{ width: '50vw' }} onHide={hideModal}>
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
                                <InputNumber id="subTotal" name="subTotal" value={formData.subTotal} onValueChange={(e) => handleInputChange({ target: { name: 'subTotal', value: e.value } })} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="iva">IVA</label>
                                <InputNumber id="iva" name="iva" value={formData.iva} readOnly />
                            </div>
                            <div className="p-field">
                                <label htmlFor="otro">Otro</label>
                                <InputNumber id="otro" name="otro" value={formData.otro} onValueChange={(e) => handleInputChange({ target: { name: 'otro', value: e.value } })} />
                            </div>
                        </>
                    )}
                    <div className="p-field">
                        <label htmlFor="total">Total</label>
                        <InputNumber id="total" name="total" value={formData.total} readOnly />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
