import React, { useEffect } from 'react'
import { useAuth } from '../auth/hooks/useAuth';
import { useClientes } from '../hooks/useClientes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from 'react-router-dom';

         

export const ClienteList = () => {
  const { clientes,getClientes,handlerRemoveClientes } = useClientes();
    const { login } = useAuth();
    const navegar = useNavigate()
    useEffect(()=>{
getClientes()
    },[])
    const editar = (rowData) => {
      return (
          <NavLink className="btn btn-primary" to={`/clientes/editar/`+rowData.id}>
             Editar
          </NavLink>
      );
  };
  const remove = (rowData)=>{
    return(
      <button className="btn btn-danger" onClick={() => handlerRemoveClientes(rowData.id)}>
      Eliminar
  </button>
    )
  }
  const onEditCliente = (cliente)=>{
    navegar(`editar/${cliente.id}`)
  }
  const onRemoveCliente = (data)=>{
    console.log(data?.id)
  }
   
  
  return (
   <>
   <DataTable value={clientes} tableStyle={{ minWidth: '50rem' }}>
    <Column field="numeroCliente" header="numeroCliente"></Column>
    <Column field="nombre" header="nombre"></Column>
    <Column field="direccion" header="direccion"></Column>
    <Column field="localidad" header="localidad"></Column>
    <Column field="provincia" header="provincia"></Column>
    <Column field="telefono" header="telefono"></Column>
    <Column field="email" header="email"></Column>
    <Column body={editar} header="Editar"></Column>
    <Column body={remove} header="Eliminar"></Column>
</DataTable>
   </>
  )
}
