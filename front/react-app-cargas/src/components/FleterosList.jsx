import axios from 'axios';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { fleteroDelete } from '../services/flererosService';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

export const FleterosList = ({fleteros}) => {
    const editar = (rowData) => {
        return (
            <NavLink className="btn btn-primary" to={`/fleteros/editar/`+rowData.id}>
               Editar
               
            </NavLink>
        );
    };
    const remove = (rowData)=>{
      return(
        <button className="btn btn-danger" onClick={() => handlerRemoveFletero(rowData.id)}>
        Eliminar
    </button>
    
      )
    }
    const handlerRemoveFletero = async (id)=>{
try {
    await fleteroDelete(id);
    Swal.fire('Eliminado', 'Fletero Eliminado con exito', 'warning');
} catch (error) {
    throw error;
}
    }

  return (
    <>
    <DataTable value={fleteros} tableStyle={{ minWidth: '50rem' }}>
    <Column field="id" header="id"></Column>
    <Column field="nombre" header="nombre"></Column>
    <Column field="descripcion" header="descripcion"></Column>
    <Column field="precioPorDia" header="precio Por dia"></Column>
    <Column field="precioPorKilometros" header="precio Por kilometros"></Column>
    <Column body={editar} header="Editar"></Column>
    { /*<Column body={remove} header="Eliminar"></Column>*/}
   
</DataTable>
</>
  )
}
