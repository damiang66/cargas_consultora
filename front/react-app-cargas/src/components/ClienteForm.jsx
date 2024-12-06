import React, { useEffect, useState } from 'react'
import { useClientes } from '../hooks/useClientes';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useParams } from 'react-router-dom';
 

export const ClienteForm = ({ clienteSeleccionado, handlerCloseForm }) => {
    const { inicialClienteForm, handlerAddCliente, errors,clientes } = useClientes();

    const [clienteForm, setClienteFrom] = useState(inicialClienteForm);

    const { id, numeroCliente, nombre, direccion, localidad, provincia, telefono, email } = clienteForm;

    useEffect(() => {
        setClienteFrom({
            ...clienteSeleccionado
        });
    }, [clienteSeleccionado]);
    const {id:paramId} = useParams();
    useEffect(() => {
        if (paramId) {
            const cliente = clientes.find(e => e.id === parseInt(paramId));
            if (cliente) {
                setClienteFrom(cliente);
            }
        }
    }, [paramId, clientes]);

    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        setClienteFrom({
            ...clienteForm,
            [name]: value,
        })
    }



    const onSubmit = (event) => {
        event.preventDefault();
        // if (!username || (!password && id === 0) || !email) {
        //     Swal.fire(
        //         'Error de validacion',
        //         'Debe completar los campos del formulario!',
        //         'error'
        //     );

        //     return;
        // }
        // if (!email.includes('@')) {
        //     Swal.fire(
        //         'Error de validacion email',
        //         'El email debe ser valido, incluir un @!',
        //         'error'
        //     );
        //     return;
        // }
        // console.log(userForm);

        // guardar el user form en el listado de usuarios
        handlerAddCliente(clienteForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setClienteFrom(inicialClienteForm);
    }
    return (
        <div className="container m-2">
        <form onSubmit={onSubmit}>
            <FloatLabel >
                <InputText name='numeroCliente'  id="numeroCliente" value={numeroCliente} onChange={onInputChange} />
                <label htmlFor="numeroCliente">numeroCLiente</label>
            </FloatLabel>
            <p className="text-danger">{errors?.numeroCliente}</p>

            <FloatLabel className='m2' >
                <InputText name='nombre'  id="nombre" value={nombre} onChange={onInputChange} />
                <label htmlFor="nombre">nombre</label>
            </FloatLabel>
            <p className="text-danger">{errors?.nombre}</p>

            <FloatLabel  className='m2' >
                <InputText name='direccion'  id="direccion" value={direccion} onChange={onInputChange} />
                <label htmlFor="direccion">direccion</label>
            </FloatLabel >
            <p className="text-danger">{errors?.direccion}</p>
            <FloatLabel  className='m2' >
                <InputText name='localidad'  id="localidad" value={localidad} onChange={onInputChange} />
                <label htmlFor="localidad">localidad</label>
            </FloatLabel>
            <p className="text-danger">{errors?.localidad}</p>
            <FloatLabel  className='m2' >
                <InputText name='provincia'  id="provincia" value={provincia} onChange={onInputChange} />
                <label htmlFor="provincia">provincia</label>
            </FloatLabel>
            <p className="text-danger">{errors?.provincia}</p>
            <FloatLabel  className='m2' >
                <InputText name='telefono'  id="telefono" value={telefono} onChange={onInputChange} />
                <label htmlFor="telefono">telefono</label>
            </FloatLabel >
            <p className="text-danger">{errors?.telefono}</p>
            <FloatLabel  className='m2' >
                <InputText name='email' type='email'  id="email" value={email} onChange={onInputChange} />
                <label htmlFor="email">email</label>
            </FloatLabel>
            <p className="text-danger">{errors?.email}</p>


            <input type="hidden"
                name="id"
                value={id} />

            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>

            {!handlerCloseForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>}

        </form>
        </div>
    )
}