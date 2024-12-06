import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLiquidacion } from '../hooks/useLiquidacion';
import { LiquidacionList } from '../components/LiquidacionList';
import { useAuth } from '../auth/hooks/useAuth';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { liquidacionBuscar } from '../services/liquidacionService';

export const LiquidacionPage = () => {
    const [lista,setLista]=useState([])
    const {
        liquidaciones,
        visibleForm,
        handlerOpenForm,
        getLiquidaciones,
    } = useLiquidacion();
    const navegar = useNavigate()
    const abrirFormulario = ()=>{
        navegar('/liquidaciones/registrar')
    }
    const [numero,setNumero]=useState('')
    const { login } = useAuth();;

    useEffect(() => {
        getLiquidaciones();
        console.log(liquidaciones);
    }, []);
    const buscar =async()=>{
try {
    const respuesta = await liquidacionBuscar(numero);
    console.log('BUSCAR' + JSON.stringify(respuesta.data));
    setLista(respuesta.data)
} catch (error) {
    throw error;
}
    }
    return (
        <>

            <div className="container my-4">
                <h2>Seccion Liquidaciones</h2>
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
                            Cargar Liquidacion
                        </button>
                        
                        
                        </>}

                        {
                            liquidaciones.length === 0
                                ? <div className="alert alert-warning">No hay liquidaciones en el sistema!</div>
                                : <LiquidacionList lista={lista} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
