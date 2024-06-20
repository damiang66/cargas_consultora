import React, { useEffect } from 'react'
import { useClientes } from '../hooks/useClientes';
import { useAuth } from '../auth/hooks/useAuth';
import { ClienteList } from '../components/ClienteList';
import { useNavigate } from 'react-router-dom';

export const ClientePage = () => {
    const {
        clientes,
        visibleForm,
        handlerOpenForm,
        getClientes,
    } = useClientes();
    const navegar = useNavigate()
    const abrirFormulario = ()=>{
        navegar('/clientes/registrar')
    }

    const { login } = useAuth();;

    useEffect(() => {
        getClientes();
        console.log(clientes);
    }, []);
    
    return (
        <>

            <div className="container my-4">
                <h2>Seccion Cliente</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={abrirFormulario}>
                            Nuevo Cliente
                        </button>}

                        {
                            clientes.length === 0
                                ? <div className="alert alert-warning">No hay clientes en el sistema!</div>
                                : <ClienteList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
