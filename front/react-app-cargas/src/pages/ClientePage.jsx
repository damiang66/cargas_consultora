import React, { useEffect, useState } from 'react';
import { useClientes } from '../hooks/useClientes';
import { useAuth } from '../auth/hooks/useAuth';
import { ClienteList } from '../components/ClienteList';
import { useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { ClienteBuscar } from '../services/clienteService';

export const ClientePage = () => {
    const { clientes, visibleForm, handlerOpenForm, getClientes } = useClientes();
    const navegar = useNavigate();
    const abrirFormulario = () => {
        navegar('/clientes/registrar');
    }
    const [numero, setNumero] = useState('');
    const { login } = useAuth();
    const [buscar, setBuscar] = useState([]);

    useEffect(() => {
        getClientes();
    }, []);

    useEffect(() => {
        setBuscar(clientes);
    }, [clientes]);

    const traerCliente = async () => {
        console.log('Buscando cliente con número:', numero);
        try {
            if (numero.trim() === '') {
                setBuscar(clientes);
            } else {
                const respuesta = await ClienteBuscar(numero);
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
                <h2>Sección Cliente</h2>
                <FloatLabel className="m-4">
                    <InputText id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                    <label htmlFor="numero">Buscar</label>
                </FloatLabel>
                <button className="btn btn-primary" onClick={traerCliente}>Buscar</button>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || (
                            <button className="btn btn-primary my-2" onClick={abrirFormulario}>
                                Nuevo Cliente
                            </button>
                        )}
                        {
                            buscar.length === 0
                                ? <div className="alert alert-warning">No hay clientes en el sistema!</div>
                                : <ClienteList clientes={buscar} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
