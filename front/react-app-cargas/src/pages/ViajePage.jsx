import React, { useEffect, useState } from 'react'
import { useClientes } from '../hooks/useClientes';
import { useAuth } from '../auth/hooks/useAuth';
import { ClienteList } from '../components/ClienteList';
import { useNavigate } from 'react-router-dom';
import { useViajes } from '../hooks/useViajes';
import { ViajeList } from '../components/ViajeList';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { viajeBuscar } from '../services/viajeService';

export const ViajePage = () => {
    const {
        viajes,
        visibleForm,
        handlerOpenForm,
        getViajes,
    } = useViajes();
    const navegar = useNavigate()
    const abrirFormulario = ()=>{
        navegar('/viajes/registrar')
    }
    const [lista,setLista]=useState([])
    const { login } = useAuth();;
    const[numero,setNumero]=useState('')
    useEffect(() => {
        getViajes();
        console.log(viajes);
    }, []);
    const buscar = async()=>{
        try {
         const respuesta = await viajeBuscar(numero);
            setLista(respuesta.data)
        } catch (error) {
            throw error;
        }
    }
    return (
        <>

            <div className="container my-4">
                <h2>Seccion Viajes</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) ||
                        
                        <>
                           <FloatLabel className="m-4">
                    <InputText id="numero" value={numero} 
                    onKeyUp={buscar}
                    onChange={(e) => setNumero(e.target.value)} />
                    <label htmlFor="numero">Buscar</label>
                </FloatLabel>
                        <button
                            className="btn btn-primary my-2"
                            onClick={abrirFormulario}>
                            Cargar Viaje
                        </button>
                        </>
                        }

                        {
                            viajes.length === 0
                                ? <div className="alert alert-warning">No hay viajes en el sistema!</div>
                                : <ViajeList lista={lista} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
