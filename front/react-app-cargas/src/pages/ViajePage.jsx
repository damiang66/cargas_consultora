import React, { useEffect } from 'react'
import { useClientes } from '../hooks/useClientes';
import { useAuth } from '../auth/hooks/useAuth';
import { ClienteList } from '../components/ClienteList';
import { useNavigate } from 'react-router-dom';
import { useViajes } from '../hooks/useViajes';
import { ViajeList } from '../components/ViajeList';

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

    const { login } = useAuth();;

    useEffect(() => {
        getViajes();
        console.log(viajes);
    }, []);
    
    return (
        <>

            <div className="container my-4">
                <h2>Seccion Viajes</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={abrirFormulario}>
                            Cargar Viaje
                        </button>}

                        {
                            viajes.length === 0
                                ? <div className="alert alert-warning">No hay viajes en el sistema!</div>
                                : <ViajeList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
