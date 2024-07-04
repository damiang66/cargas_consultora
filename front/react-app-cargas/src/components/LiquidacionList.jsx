import React, { useEffect } from 'react'
import { useLiquidacion } from '../hooks/useLiquidacion';
import { useAuth } from '../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LiquidacionList = () => {
    const { liquidaciones,getLiquidaciones,handlerRemoveLiquidacion } = useLiquidacion();
    const { login } = useAuth();
    const navegar = useNavigate()
    useEffect(()=>{
getLiquidaciones()
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
      <button className="btn btn-danger" onClick={() => handlerRemoveLiquidacion(rowData.id)}>
      Eliminar
  </button>
    )
  }
 
   
  
  return (
   <>
   <DataTable value={liquidaciones} tableStyle={{ minWidth: '50rem' }}>
    <Column field="viaje.numeroViaje" header="Numero Viaje"></Column>
    <Column field="fecha" header="fecha"></Column>
    
    <Column field="totaGastos" header="Total Gastos"></Column>
    <Column field="pagado" header="Pagado"></Column>
    <Column body={editar} header="Editar"></Column>
    <Column body={remove} header="Eliminar"></Column>
</DataTable>
   </>
  )
}
