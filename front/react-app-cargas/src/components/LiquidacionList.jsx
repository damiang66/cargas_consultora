import React, { useEffect } from 'react'
import { useLiquidacion } from '../hooks/useLiquidacion';
import { useAuth } from '../auth/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { liquidacionSave } from '../services/liquidacionService';

export const LiquidacionList = () => {
    const { liquidaciones,getLiquidaciones,handlerRemoveLiquidacion } = useLiquidacion();
    const { login } = useAuth();
    const navegar = useNavigate()
    useEffect(()=>{
getLiquidaciones()
console.log(liquidaciones);
    },[])
    const editar = (rowData) => {
      return (
          <NavLink className="btn btn-primary" to={`/liquidaciones/editar/`+rowData.id}>
             Editar
          </NavLink>
      );
  };
  const remove = (rowData)=>{
    return(
      <button className="btn btn-danger" onClick={() => handlerRemoveLiquidacion(rowData.id,rowData?.viaje?.id)}>
      Eliminar
  </button>
    )
  }
  const imprimir =(rowData)=>{
    return(
      <button className="btn btn-success" onClick={() =>console.log("Imprimir") }>
      Imprimir
  </button>
    )
  
   }
   
  
  return (
   <>
   <DataTable  value={liquidaciones} tableStyle={{ minWidth: '50rem' }}>
    <Column field="viaje.numeroViaje" header="Numero Viaje"></Column>
    <Column field="fecha" header="fecha"></Column>
    
    <Column field="total" header="Total Gastos"></Column>
    <Column field="pagado" header="Pagado"></Column>
    <Column body={editar} header="Editar"></Column>
    <Column body={remove} header="Eliminar"></Column>
    <Column body={imprimir} header="Imprimir"></Column>
</DataTable>
   </>
  )
}
