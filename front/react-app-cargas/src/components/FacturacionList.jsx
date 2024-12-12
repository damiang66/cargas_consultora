import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { useParams } from 'react-router-dom';
import { ComprasFIndAll, ComprasSave, ComprasUpdate, VentasFindAll, VentasSave, VentasUpdate } from '../services/facturacionService';

export const FacturacionList = () => {
    const { tipo } = useParams();
    const [facturas, setFacturas] = useState([]);
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
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
    const [selectedFactura, setSelectedFactura] = useState(null);

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

    const openModal = (factura = null) => {
        if (factura) {
            setSelectedFactura(factura);
            setFormData({ ...factura }); // Al seleccionar, copia toda la factura al estado del formulario
        } else {
            setFormData({
                id: null,
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
        }
        setDisplayModal(true);
    };

    const hideModal = () => {
        setDisplayModal(false);
        setSelectedFactura(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValueChange = (e, fieldName) => {
        const value = e.value;
        setFormData({ ...formData, [fieldName]: value });

        if (fieldName === 'subTotal') {
            const subTotal = parseFloat(value) || 0;
            const iva = subTotal * 0.21;
            const total = subTotal + iva + (formData.otro || 0);
            setFormData({ ...formData, subTotal, iva, total });
        }

        if (fieldName === 'otro') {
            const otro = parseFloat(value) || 0;
            const total = (formData.subTotal || 0) + (formData.iva || 0) + otro;
            setFormData({ ...formData, otro, total });
        }
    };

    const handleSubmit = async () => {
        if (selectedFactura) {
            const updatedFactura = { ...formData, id: selectedFactura.id };
            if (tipo === 'CompraA' || tipo === 'CompraB') {
                await ComprasUpdate(updatedFactura);
                setFacturas(facturas.map(factura => factura.id === updatedFactura.id ? updatedFactura : factura)); // Actualiza la factura en el estado
                setFilteredFacturas(filteredFacturas.map(factura => factura.id === updatedFactura.id ? updatedFactura : factura)); // Actualiza en la vista filtrada
            } else {
                await VentasUpdate(updatedFactura);
                setFacturas(facturas.map(factura => factura.id === updatedFactura.id ? updatedFactura : factura));
                setFilteredFacturas(filteredFacturas.map(factura => factura.id === updatedFactura.id ? updatedFactura : factura));
            }
        } else {
            const newFactura = { ...formData, id: Date.now() };
            if (tipo === 'CompraA' || tipo === 'CompraB') {
                await ComprasSave(newFactura);
                setFacturas([...facturas, newFactura]); // Agrega la nueva factura al estado
                setFilteredFacturas([...filteredFacturas, newFactura]); // Agrega la nueva factura a la vista filtrada
            } else {
                await VentasSave(newFactura);
                setFacturas([...facturas, newFactura]);
                setFilteredFacturas([...filteredFacturas, newFactura]);
            }
        }
        hideModal();
    };

    const handleDelete = async (facturaId) => {
        setFacturas(facturas.filter(factura => factura.id !== facturaId));
        setFilteredFacturas(filteredFacturas.filter(factura => factura.id !== facturaId));
    };

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

    const { totalSubtotal, totalIva, totalOtro, totalTotal } = calculateTotals();

    const handlePrint = () => {
        const content = document.getElementById('factura-table');
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Facturas</title><style>');
        printWindow.document.write(`
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; margin-bottom: 20px; }
            .footer { text-align: center; margin-top: 20px; }
        `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write('<h2>Listado de Facturas</h2>');
        printWindow.document.write(content.innerHTML);
        printWindow.document.write('<div class="footer">Generado por la aplicación de Facturación</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
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
            <Button label="Imprimir" icon="pi pi-print" onClick={handlePrint} className="p-mb-2" />
            <Button label="Agregar Factura" icon="pi pi-plus" onClick={() => openModal()} className="p-mb-2" />
            <DataTable id="factura-table" value={filteredFacturas} paginator rows={10} className="p-datatable-gridlines">
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
                <Column
                    body={(rowData) => (
                        <>
                            <Button label="Editar" icon="pi pi-pencil" onClick={() => openModal(rowData)} className="p-mr-2" />
                            <Button label="Eliminar" icon="pi pi-trash" onClick={() => handleDelete(rowData.id)} className="p-button-danger" />
                        </>
                    )}
                    header="Acciones"
                />
            </DataTable>
            <Dialog header="Editar Factura" visible={displayModal} style={{ width: '50vw' }} footer={(
                <>
                    <Button label="Cancelar" icon="pi pi-times" onClick={hideModal} className="p-button-text" />
                    <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} />
                </>
            )} onHide={hideModal}>
                <div className="p-grid">
                    <div className="p-col-12">
                        <Calendar name="fecha" value={formData.fecha} onChange={(e) => handleInputChange(e)} dateFormat="yy-mm-dd" showIcon placeholder="Fecha" />
                    </div>
                    <div className="p-col-12">
                        <InputText name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
                    </div>
                    <div className="p-col-12">
                        <InputText name="cuit" value={formData.cuit} onChange={handleInputChange} placeholder="CUIT" />
                    </div>
                    <div className="p-col-12">
                        <InputText name="nroFactura" value={formData.nroFactura} onChange={handleInputChange} placeholder="Número de Factura" />
                    </div>
                    <div className="p-col-12">
                        <InputNumber name="subTotal" value={formData.subTotal} onValueChange={(e) => handleValueChange(e, 'subTotal')} mode="decimal" min={0} placeholder="Subtotal" />
                    </div>
                    <div className="p-col-12">
                        <InputNumber name="iva" value={formData.iva} onValueChange={(e) => handleValueChange(e, 'iva')} mode="decimal" min={0} placeholder="IVA" />
                    </div>
                    <div className="p-col-12">
                        <InputNumber name="otro" value={formData.otro} onValueChange={(e) => handleValueChange(e, 'otro')} mode="decimal" min={0} placeholder="Otro" />
                    </div>
                    <div className="p-col-12">
                        <InputNumber name="total" value={formData.total} onValueChange={(e) => handleValueChange(e, 'total')} mode="decimal" min={0} placeholder="Total" disabled />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
