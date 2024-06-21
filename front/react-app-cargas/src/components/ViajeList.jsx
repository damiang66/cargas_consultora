import React, { useEffect } from 'react'
import { useAuth } from '../auth/hooks/useAuth';
import { useClientes } from '../hooks/useClientes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from 'react-router-dom';
import { useViajes } from '../hooks/useViajes';

         

export const ViajeList = () => {
  const { viajes,getViajes,handlerRemoveViaje } = useViajes();
    const { login } = useAuth();
    const navegar = useNavigate()
    useEffect(()=>{
getViajes()
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
      <button className="btn btn-danger" onClick={() => handlerRemoveViaje(rowData.id)}>
      Eliminar
  </button>
    )
  }
 
   
  
  return (
   <>
   <DataTable value={viajes} tableStyle={{ minWidth: '50rem' }}>
    <Column field="numeroViaje" header="numeroViaje"></Column>
    <Column field="fecha" header="fecha"></Column>
    
    <Column field="totalBultos" header="Total Bultos"></Column>
    <Column field="TotalKilos" header="Total kilos"></Column>
    <Column body={editar} header="Editar"></Column>
    <Column body={remove} header="Eliminar"></Column>
</DataTable>
   </>
  )
}
