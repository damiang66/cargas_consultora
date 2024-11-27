import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import Swal from 'sweetalert2';

import { viajeBuscar, viajeFindAll, viajeFindById } from '../services/viajeService';
import { RepartoFindById } from '../services/RepartoService';
import { FleterosFindAll } from '../services/flererosService';

export const RepartoForm = () => {
    const { id } = useParams();
    
    const [viajeId, setViajeId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [clientes, setClientes] = useState([]);
    const [estado, setEstado] = useState('');
    const [selectedFletero, setSelectedFletero] = useState(null);
    const [pagado, setPagado] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [precio, setPrecio] = useState(0);
    const [clientesDisponibles, setClientesDisponibles] = useState([]);
    const [fleterosDisponibles, setFleterosDisponibles] = useState([]);
    const [viajesDisponibles, setViajesDisponibles] = useState([]);

    useEffect(() => {
        // Cargar fleteros y viajes disponibles desde el backend
        cargarFleteros();
        cargarViajes();

        if (id) {
            cargarReparto(id);
        }
    }, [id]);

    const cargarFleteros = async () => {
        try {
            const respuesta = await FleterosFindAll();
            setFleterosDisponibles(respuesta.data);
        } catch (error) {
            Swal.fire('Error', 'Error al cargar los fleteros', 'error');
        }
    };

    const cargarViajes = async () => {
        try {
            const respuesta = await viajeFindAll();
            setViajesDisponibles(respuesta.data);
        } catch (error) {
            Swal.fire('Error', 'Error al cargar los viajes', 'error');
        }
    };

    const cargarReparto = async (id) => {
        try {
            const response = await RepartoFindById(id)
            const reparto = response.data;
            setViajeId(reparto.viaje.id);
            setDescripcion(reparto.descripcion);
            setClientes(reparto.clientes);
            setEstado(reparto.estado);
            setSelectedFletero(reparto.fleteros);
            setPagado(reparto.pagado);
            setFecha(new Date(reparto.fecha));
            setPrecio(reparto.precio);

            // Cargar clientes disponibles del viaje asociado
            const viajeResponse = await viajeFindById(viajeId);
            setClientesDisponibles(viajeResponse.data.clientes);
        } catch (error) {
            Swal.fire('Error', 'Error al cargar el reparto', 'error');
        }
    };

    const handleViajeChange = async (e) => {
        console.log(e.value);
        
        setViajeId(e.value);
        try {
            const response = await viajeBuscar(e.value.numeroViaje)
            if (response.data) {
                console.log(response.data[0]);
                
              // Mapeamos los clientes del viaje a un formato adecuado para el Dropdown
            let clie = response.data[0]
            let clientes = []
            console.log(clie?.items);
             clie?.items.map(m=>{
               clientes.push( m.cliente)
                
            })
            console.log(clientes);
            
            setClientesDisponibles(clientes);
                
            } else {
                Swal.fire('Error', 'Viaje no encontrado', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error validando el viaje', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reparto = {
            descripcion,
            viaje: { id: viajeId },
            clientes,
            estado,
            fleteros: selectedFletero,
            pagado,
            fecha,
            precio
        };
        try {
            if (id) {
                await axios.put(`/api/repartos/${id}`, reparto);
                Swal.fire('Éxito', 'Reparto actualizado con éxito', 'success');
            } else {
                await axios.post('/api/repartos', reparto);
                Swal.fire('Éxito', 'Reparto creado con éxito', 'success');
            }
            history.push('/repartos');
        } catch (error) {
            Swal.fire('Error', 'Error guardando el reparto', 'error');
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Reparto' : 'Crear Reparto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="viajeId">Número de Viaje</label>
                    <Dropdown id="viajeId" value={viajeId} options={viajesDisponibles} onChange={handleViajeChange} optionLabel="numeroViaje" placeholder="Seleccione un viaje" />
                </div>
                <div className="p-field">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="p-field">
                <label htmlFor="clientes">Clientes</label>
               
                <Dropdown
    id="clientes"
    value={clientes}  // `clientes` debería ser un array de objetos con la estructura { label, value }
    options={clientesDisponibles}
    onChange={(e) => setClientes(e.value)}  // `e.value` es un array de los clientes seleccionados
    multiple
    optionLabel="id"  // La propiedad que el Dropdown debe mostrar (nombre del cliente)
    optionValue="id"  // La propiedad que el Dropdown usará como valor (ID del cliente)
    placeholder="Seleccione clientes"
/>
            </div>
                <div className="p-field">
                    <label htmlFor="estado">Estado</label>
                    <InputText id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="fleteros">Fletero</label>
                    <Dropdown id="fleteros" value={selectedFletero} options={fleterosDisponibles} onChange={(e) => setSelectedFletero(e.value)} optionLabel="nombre" placeholder="Seleccione fletero" />
                </div>
                <div className="p-field">
                    <label htmlFor="pagado">Pagado</label>
                    <Checkbox id="pagado" checked={pagado} onChange={(e) => setPagado(e.checked)} />
                </div>
                <div className="p-field">
                    <label htmlFor="fecha">Fecha</label>
                    <Calendar id="fecha" value={fecha} onChange={(e) => setFecha(e.value)} showIcon />
                </div>
                <div className="p-field">
                    <label htmlFor="precio">Precio</label>
                    <InputNumber id="precio" value={precio} onValueChange={(e) => setPrecio(e.value)} mode="currency" currency="USD" />
                </div>
                <Button label={id ? 'Actualizar' : 'Guardar'} icon="pi pi-check" type="submit" />
            </form>
        </div>
    );
};


