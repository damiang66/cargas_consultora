import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { useClientes } from '../hooks/useClientes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';

export const ClienteList = ({ clientes }) => {
    const { getClientes, handlerRemoveClientes } = useClientes();
    const { login } = useAuth();
    const navegar = useNavigate();

    // Estados para la paginación
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15); // Mostrar inicialmente 15 registros por página

    useEffect(() => {
        // Cargar clientes inicialmente
        //getClientes();
    }, []);

    // Estados para el filtrado
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        numeroCliente: { value: null, matchMode: 'contains' },
        nombre: { value: null, matchMode: 'contains' },
        direccion: { value: null, matchMode: 'contains' },
        localidad: { value: null, matchMode: 'contains' },
        provincia: { value: null, matchMode: 'contains' },
        telefono: { value: null, matchMode: 'contains' },
        email: { value: null, matchMode: 'contains' }
    });

    // Obtener los clientes para la página actual
    const currentPageClientes = clientes.slice(first, first + rows);

    const editar = (rowData) => {
        return (
            <NavLink className="btn btn-primary" to={`/clientes/editar/${rowData.id}`}>
                Editar
            </NavLink>
        );
    };

    const remove = (rowData) => {
        return (
            <button className="btn btn-danger" onClick={() => handlerRemoveClientes(rowData.id)}>
                Eliminar
            </button>
        );
    };

    const onPageChange = (event) => {
        setFirst(event.first); // Actualizar el índice del primer registro visible
        setRows(event.rows);   // Actualizar la cantidad de registros por página
    };

    const onFilter = (e) => {
        const { field, value } = e.target;
        let newFilters = { ...filters };
        newFilters[field].value = value;
        setFilters(newFilters);
    };

    return (
        <>
            <DataTable
                value={currentPageClientes}
                tableStyle={{ minWidth: '50rem' }}
                paginator
                rows={rows}
                first={first}
                onPage={onPageChange}
                filters={filters}
                filterDisplay="row"
            >
                <Column
                    field="numeroCliente"
                    header="Número Cliente"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.numeroCliente.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'numeroCliente', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column
                    field="nombre"
                    header="Nombre"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.nombre.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'nombre', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column
                    field="direccion"
                    header="Dirección"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.direccion.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'direccion', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column
                    field="localidad"
                    header="Localidad"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.localidad.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'localidad', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column
                    field="provincia"
                    header="Provincia"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.provincia.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'provincia', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column
                    field="telefono"
                    header="Teléfono"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.telefono.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'telefono', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column
                    field="email"
                    header="Email"
                    filter
                    filterElement={
                        <InputText
                            type="search"
                            value={filters.email.value || ''}
                            onChange={(e) => onFilter({ target: { field: 'email', value: e.target.value } })}
                        />
                    }
                ></Column>
                <Column body={editar} header="Editar"></Column>
                <Column body={remove} header="Eliminar"></Column>
            </DataTable>

            <Paginator
                first={first}
                rows={rows}
                totalRecords={clientes.length} // Total de registros en el array local
                onPageChange={onPageChange}
                rowsPerPageOptions={[15, 30, 50]} // Opciones de cantidad de registros por página
            />
        </>
    );
};
