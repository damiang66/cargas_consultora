import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RepartoDelete, RepartoExport } from '../services/RepartoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import Swal from 'sweetalert2';

export const RepartoList = ({ repartos }) => {
    const [filters, setFilters] = useState({
        'viaje.numeroViaje': { value: '', matchMode: 'equals' },
        'fechaInicio': { value: null, matchMode: 'equals' },
        'fechaFin': { value: null, matchMode: 'equals' },
        'fleteros.nombre': { value: '', matchMode: 'contains' }
    });
    const [filteredRepartos, setFilteredRepartos] = useState(repartos);
    const [totalImporte, setTotalImporte] = useState(0);
    const [sortOrder, setSortOrder] = useState(1); // 1 for ascending, -1 for descending

    useEffect(() => {
        filterAndSortRepartos();
    }, [filters, repartos, sortOrder]);

    const filterAndSortRepartos = () => {
        let tempRepartos = repartos;

        if (filters['viaje.numeroViaje'].value) {
            tempRepartos = tempRepartos.filter(reparto =>
                reparto.viaje.numeroViaje.toString().includes(filters['viaje.numeroViaje'].value)
            );
        }

        if (filters['fechaInicio'].value && filters['fechaFin'].value) {
            tempRepartos = tempRepartos.filter(reparto => {
                const fechaReparto = new Date(reparto.fecha);
                return fechaReparto >= new Date(filters['fechaInicio'].value) && fechaReparto <= new Date(filters['fechaFin'].value);
            });
        }

        if (filters['fleteros.nombre'].value) {
            tempRepartos = tempRepartos.filter(reparto =>
                reparto.fleteros.nombre.toLowerCase().includes(filters['fleteros.nombre'].value.toLowerCase())
            );
        }

        tempRepartos = tempRepartos.sort((a, b) => (a.viaje.numeroViaje > b.viaje.numeroViaje ? sortOrder : -sortOrder));

        setFilteredRepartos(tempRepartos);
        calculateTotalImporte(tempRepartos);
    };

    const calculateTotalImporte = (filteredRepartos) => {
        const total = filteredRepartos.reduce((acc, curr) => acc + curr.precio, 0);
        setTotalImporte(total);
    };

    const onViajeFilterChange = (e) => {
        const value = e.target.value;
        setFilters({ ...filters, 'viaje.numeroViaje': { value, matchMode: 'equals' } });
    };

    const onFechaInicioFilterChange = (e) => {
        const value = e.value;
        setFilters({ ...filters, 'fechaInicio': { value, matchMode: 'equals' } });
    };

    const onFechaFinFilterChange = (e) => {
        const value = e.value;
        setFilters({ ...filters, 'fechaFin': { value, matchMode: 'equals' } });
    };

    const onFleteroFilterChange = (e) => {
        const value = e.target.value;
        setFilters({ ...filters, 'fleteros.nombre': { value, matchMode: 'contains' } });
    };

    const enviarAlBackend = async (format) => {
        const data = {
            filteredRepartos: filteredRepartos, // Envía los repartos filtrados
            totalImporte // Enviar el total de importe, si es necesario
        };

        try {
            await RepartoExport(format, data);
            Swal.fire('Exportación exitosa', `Los repartos se han exportado correctamente a ${format.toUpperCase()}`, 'success');
        } catch (error) {
            console.error('Error exporting files:', error);
            Swal.fire('Error en la exportación', `Hubo un problema al exportar los repartos a ${format.toUpperCase()}`, 'error');
        }
    };

    const editar = (rowData) => {
        return (
            <NavLink className="btn btn-primary" to={`/repartos/editar/` + rowData.id}>
                Editar
            </NavLink>
        );
    };

    const totalKilos = (rowData) => {
        let total = 0;
        rowData.items.forEach(item => {
            total += item.kilos;
        });
        return total;
    };

    const remove = (rowData) => {
        return (
            <button className="btn btn-danger" onClick={() => handlerRemoveReparto(rowData.id)}>
                Eliminar
            </button>
        );
    };

    const handlerRemoveReparto = async (id) => {
        try {
            await RepartoDelete(parseInt(id));
            Swal.fire('Eliminado', 'Reparto Eliminado con éxito', 'warning');
        } catch (error) {
            throw error;
        }
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder * -1);
    };

    return (
        <>
            <div className="p-inputgroup" style={{ marginBottom: '1em' }}>
                <span className="p-inputgroup-addon">Filtrar por número de viaje</span>
                <InputText
                    type="text"
                    value={filters['viaje.numeroViaje'].value || ''}
                    onChange={onViajeFilterChange}
                    placeholder="Número de viaje"
                />
            </div>
            <div className="p-inputgroup" style={{ marginBottom: '1em' }}>
                <span className="p-inputgroup-addon">Filtrar por fecha de inicio</span>
                <Calendar
                    value={filters['fechaInicio'].value}
                    onChange={onFechaInicioFilterChange}
                    placeholder="Fecha Inicio"
                    dateFormat="dd/mm/yy"
                />
            </div>
            <div className="p-inputgroup" style={{ marginBottom: '1em' }}>
                <span className="p-inputgroup-addon">Filtrar por fecha de fin</span>
                <Calendar
                    value={filters['fechaFin'].value}
                    onChange={onFechaFinFilterChange}
                    placeholder="Fecha Fin"
                    dateFormat="dd/mm/yy"
                />
            </div>
            <div className="p-inputgroup" style={{ marginBottom: '1em' }}>
                <span className="p-inputgroup-addon">Filtrar por fletero</span>
                <InputText
                    type="text"
                    value={filters['fleteros.nombre'].value || ''}
                    onChange={onFleteroFilterChange}
                    placeholder="Fletero"
                />
            </div>
{console.log(filteredRepartos)
}
            <DataTable value={filteredRepartos} tableStyle={{ minWidth: '50rem' }} paginator rows={10}>
                <Column field="id" header="ID"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column
                    field="viaje.numeroViaje"
                    header="Viaje"
                    sortable
                    onSort={() => toggleSortOrder()}
                    sortField="viaje.numeroViaje"
                    sortOrder={sortOrder}
                ></Column>
                <Column field="fecha" header="Fecha"></Column>
                <Column field="fleteros.nombre" header="Fletero"></Column>
                <Column field="precio" header="Importe"></Column>
                <Column body={totalKilos} header="Total Kilos"></Column>
                <Column body={editar} header="Editar"></Column>
                <Column body={remove} header="Eliminar"></Column>
            </DataTable>

            <div className="p-mt-2">
                <strong>Total Importe:</strong> {totalImporte}
            </div>

            <button className="btn btn-primary" onClick={() => enviarAlBackend('pdf')}>Exportar a PDF</button>
            <button className="btn btn-primary" onClick={() => enviarAlBackend('excel')}>Exportar a Excel</button>
        </>
    );
};
