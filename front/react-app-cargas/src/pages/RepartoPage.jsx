import React, { useEffect, useState } from 'react'
import { RepartoFindAll, RepartoViajeFIndAll } from '../services/RepartoService';
import { RepartoList } from '../components/RepartoList';
import { useAuth } from '../auth/hooks/useAuth';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

export const RepartoPage = () => {
  
   const abrirFormulario = () => {
        navegar('/repartos/registrar');
    }
    const navegar = useNavigate();
    const [numero, setNumero] = useState('');
    const { login } = useAuth();
    const [buscar, setBuscar] = useState([]);
    const [reparto, setReparto] = useState([]);

    useEffect(() => {
        TraerTodosLosRepartos()
    }, []);

    useEffect(() => {
        setBuscar(reparto);
    }, [reparto]);
    const TraerTodosLosRepartos=async()=>{
        const response = await RepartoFindAll();
        setReparto(response.data);
    }


    const traerReparto = async () => {
        console.log('Buscando cliente con número:', numero);
        try {
            if (numero.trim() === '') {
                setBuscar(reparto);
            } else {
                const respuesta = await RepartoViajeFIndAll(numero);
                console.log('Respuesta de la API:', respuesta);
                if (respuesta && respuesta.data) {
                    setBuscar(respuesta.data);
                } else {
                    console.error('La respuesta no contiene datos esperados.');
                    setBuscar([]);
                }
            }
        } catch (error) {
            console.error('Error al buscar cliente:', error);
            setBuscar([]);
        }
    }

    return (
        <>
            <div className="container m-4">
                <h2>Sección Reparto</h2>
                <FloatLabel className="m-4">
                    <InputText id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                    <label htmlFor="numero">Buscar</label>
                </FloatLabel>
                <button className="btn btn-primary" onClick={traerReparto}>Buscar</button>
                <div className="row">
                    <div className="col">
                        {(!login.isAdmin) || (
                            <button className="btn btn-primary my-2" onClick={abrirFormulario}>
                                Nuevo Reparto
                            </button>
                        )}
                        {
                            buscar.length === 0
                                ? <div className="alert alert-warning">No hay Reparto en el sistema!</div>
                                : <RepartoList repartos={buscar} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

