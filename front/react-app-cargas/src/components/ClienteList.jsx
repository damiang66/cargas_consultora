import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { useClientes } from '../hooks/useClientes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';

export const ClienteList = ({clientes}) => {
  const {  getClientes, handlerRemoveClientes } = useClientes();
  const { login } = useAuth();
  const navegar = useNavigate();

  // Estados para la paginación
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(15); // Mostrar inicialmente 15 registros por página

  useEffect(() => {
    // Cargar clientes inicialmente
    //getClientes();
  }, []);

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

  return (
    <>
      <DataTable value={currentPageClientes} tableStyle={{ minWidth: '50rem' }}>
        <Column field="numeroCliente" header="Número Cliente"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="direccion" header="Dirección"></Column>
        <Column field="localidad" header="Localidad"></Column>
        <Column field="provincia" header="Provincia"></Column>
        <Column field="telefono" header="Teléfono"></Column>
        <Column field="email" header="Email"></Column>
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
