import React, { useEffect, useState } from 'react'
import { viajeFindAll } from '../services/viajeService'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { NavLink } from 'react-router-dom'

export const SeguimientoPage = () => {
    const[viajes,setViajes]=useState([])
    const[cliente,setCliente]=useState([])
    useEffect(()=>{
traerClientes()
    },[])
    const traerClientes = async()=>{
        try {
           const respuesta = await viajeFindAll();
            console.log(respuesta.data);
            setViajes(respuesta.data)
            
        } catch (error) {
            throw error;
        }
    }
  
   const editar = (rowData) => {
        return (
            
            <NavLink className="btn btn-primary" to={`/seguimiento/ver/`+rowData.id}>
               Editar
               
            </NavLink>
        );
    };
    const remove = (rowData)=>{
      return(
        <button className="btn btn-danger" >
        Eliminar
    </button>
    
      )
    }
   

  return (
    <>
    <DataTable value={viajes} tableStyle={{ minWidth: '50rem' }}>
    <Column field="id" header="id"></Column>
    <Column field="numeroViaje" header="Numero de viaje"></Column>
    <Column field="totalBultos" header="Total Bultos"></Column>
    <Column field="totalKilos" header="Total Kilos"></Column>
    <Column field="terminado" header="Terminado"></Column>
    <Column body={editar} header="Ver"></Column>
<Column body={remove} header="cambiar Estado"></Column>
   
</DataTable>
</>
  )
}
