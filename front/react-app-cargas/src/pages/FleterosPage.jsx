import React, { useEffect, useState } from 'react'
import { FleterosFindAll } from '../services/flererosService'
import { useAuth } from '../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FleterosList } from '../components/FleterosList';

export const FleterosPage = () => {
    const { login } = useAuth();
    const navegar =useNavigate()
    const[fleteros,setFleteros]=useState([])
    const traerFleteros= async()=>{
        const respuesta = await FleterosFindAll();
        setFleteros(respuesta.data);

    }
    const abrirFormulario = ()=>{
navegar('/fleteros/registrar')
    }
    useEffect(()=>{
        traerFleteros()

    },[])
  return (
    <>
    <div className="container m-4">
        <h2>Sección Fleteros</h2>
        
        <div className="row">
            <div className="col">
                {(!login.isAdmin) || (
                    <button className="btn btn-primary my-2" onClick={abrirFormulario}>
                        Nuevo Fletero                    </button>
                )}
            {fleteros?'': <div className="alert alert-warning">No hay fleteros en el sistema!</div>}
                 
                     
                      <FleterosList fleteros={fleteros} />
           
            </div>
        </div>
    </div>
</>
  )
}
