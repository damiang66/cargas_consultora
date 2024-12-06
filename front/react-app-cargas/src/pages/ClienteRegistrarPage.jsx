import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useClientes } from '../hooks/useClientes';
import { ClienteForm } from '../components/ClienteForm';

export const ClienteRegistrarPage = () => {
    const { clientes = [], inicialClienteForm } = useClientes();

    const [clienteSelected, setClienteSelected] = useState(inicialClienteForm);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const cliente = clientes.find(u => u.id == id) || inicialClienteForm;
            setUserSelected(cliente);
        }
    }, [id])

    return (
        <div className="container my-4">
            <h4>{ clienteSelected.id > 0 ? 'Editar' : 'Registrar'} Cliente</h4>
            <div className="row">
                <div className="col">
                    <ClienteForm clienteSeleccionado={clienteSelected} />
                </div>
            </div>
        </div>
    )
}

