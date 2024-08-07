import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/hooks/useAuth';
import { useClientes } from '../hooks/useClientes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from 'react-router-dom';
import { useViajes } from '../hooks/useViajes';
import { pdfViajes } from '../services/PdfService';
import { ExcelViajes } from '../services/excelPdf';

         

export const ViajeList = ({lista}) => {
  const { viajes,getViajes,handlerRemoveViaje } = useViajes();
    const { login } = useAuth();
    const navegar = useNavigate()
    const [buscador,setBuscardor]=useState([])
    useEffect(()=>{
getViajes()
    },[])
    useEffect(()=>{
      if (lista.length === 0) {
        setBuscardor(viajes)
        console.log('Lista actualizada con liquidaciones');
    }else{
      setBuscardor(lista)
    }
    },[lista,viajes])
    const editar = (rowData) => {
      return (
          <NavLink className="btn btn-primary" to={`/viajes/editar/`+rowData.id}>
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
 const imprimir =(rowData)=>{
  return(
    <button className="btn btn-success" onClick={() =>pdfImprimir(rowData.id) }>
    Imprimir
</button>
  )

 }
 const excel = (rowData)=>{
  return(
    <button className="btn btn-success" onClick={() =>excelImprimir(rowData.id) }>
    Excel
</button>
  )
 }
 const pdfImprimir = async (id)=>{
  try {
    const respuesta = await pdfViajes(id);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
 }
 const excelImprimir = async(id)=>{
  try {
    const respuesta = await ExcelViajes(id);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
 }
   
  
  return (
   <>
   <DataTable value={buscador} tableStyle={{ minWidth: '50rem' }}>
    <Column field="numeroViaje" header="Numero Viaje"></Column>
    <Column field="fecha" header="fecha"></Column>
    
    <Column field="totalBultos" header="Total Bultos"></Column>
    <Column field="totalKilos" header="Total kilos"></Column>
    <Column body={editar} header="Editar"></Column>
    <Column body={remove} header="Eliminar"></Column>
    <Column body={imprimir} header="Imprimir"></Column>
    <Column body={excel} header="Exportar"></Column>
</DataTable>
   </>
  )
}
