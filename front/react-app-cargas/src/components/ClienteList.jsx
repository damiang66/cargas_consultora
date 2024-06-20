import React, { useEffect } from 'react'
import { useAuth } from '../auth/hooks/useAuth';
import { useClientes } from '../hooks/useClientes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink } from 'react-router-dom';
         

export const ClienteList = () => {
  const { clientes,getClientes } = useClientes();
    const { login } = useAuth();
    useEffect(()=>{
getClientes()
    },[])
    const editar = (rowData) => {
      return (
          <button className="btn btn-primary" onClick={() => onEditCliente(rowData)}>
              Editar
          </button>
      );
  };
  const onEditCliente = (cliente)=>{
    console.log(cliente)
  }
  return (
   <>
   <DataTable value={clientes} tableStyle={{ minWidth: '50rem' }}>
    <Column field="numeroCliente" header="numeroCliente"></Column>
    <Column field="nombre" header="nombre"></Column>
    <Column field="direcion" header="direccion"></Column>
    <Column field="localidad" header="localidad"></Column>
    <Column field="provincia" header="provincia"></Column>
    <Column field="telefono" header="telefono"></Column>
    <Column field="email" header="email"></Column>
    <Column body={editar} header="Editar"></Column>
</DataTable>
   </>
  )
}
