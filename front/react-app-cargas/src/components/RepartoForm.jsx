import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import Swal from 'sweetalert2';

import { viajeBuscar, viajeFindAll, viajeFindById } from '../services/viajeService';
import { RepartoFindById, RepartoSave, RepartoUpdate } from '../services/RepartoService';
import { FleterosFindAll } from '../services/flererosService';

export const RepartoForm = () => {
    const { id } = useParams();
    const navegar = useNavigate();
    
    const [viajeId, setViajeId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [clientes, setClientes] = useState([]);
    const [selectedFletero, setSelectedFletero] = useState(null);
    const [pagado, setPagado] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [precio, setPrecio] = useState(0);
    const [clientesDisponibles, setClientesDisponibles] = useState([]);
    const [items, setItems] = useState([]);
    const [fleterosDisponibles, setFleterosDisponibles] = useState([]);
    const [viajesDisponibles, setViajesDisponibles] = useState([]);
    
    useEffect(() => {
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
            const response = await RepartoFindById(id);
            const reparto = response.data;
            
            setViajeId(reparto.viaje.id); // Asignar el ID del viaje
            setDescripcion(reparto.descripcion);
            
            // Cargar los IDs de los clientes seleccionados
            setClientes(reparto.clientes.map(c => c.id)); // Solo extraemos los IDs de los clientes
            
            // Cargar el ID del fletero seleccionado
            setSelectedFletero(reparto.fleteros.id); // Solo el ID del fletero
            
            setPagado(reparto.pagado);
            setFecha(new Date(reparto.fecha));
            setPrecio(reparto.precio);
            
            // Cargar los clientes disponibles según el viaje seleccionado
            const viajeResponse = await viajeFindById(reparto.viaje.id);
            setClientesDisponibles(viajeResponse.data.clientes);
        } catch (error) {
            Swal.fire('Error', 'Error al cargar el reparto', 'error');
        }
    };

    const handleViajeChange = async (e) => {
        setViajeId(e.value);
        try {
            const response = await viajeBuscar(e.value.numeroViaje);
            if (response.data) {
                const clie = response.data[0];
                setItems(clie?.items);
                
                const clientes = clie?.items.map(m => m.cliente);
                setClientesDisponibles(clientes);

                setClientes(clientes.map(c => c.id)); // Solo extraemos los IDs de los clientes
            } else {
                Swal.fire('Error', 'Viaje no encontrado', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error validando el viaje', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Asegúrate de que selectedClientes contiene los clientes seleccionados correctamente
        const selectedClientes = clientes.length > 0 ? clientes.map(cliente => cliente.id) : [];
    
        // Si no hay clientes seleccionados, mantén todos los items del viaje
        const filteredItems = selectedClientes.length > 0
            ? items.filter(item => selectedClientes.includes(item.cliente.id))  // Filtra solo si hay clientes seleccionados
            : items;  // Si no hay clientes seleccionados, no se hace ningún filtro
    
        console.log("Filtered Items: ", filteredItems);  // Verifica que los items filtrados sean correctos
    
        // Si no hay items después de filtrar, muestra un error
       /* if (filteredItems.length === 0) {
            Swal.fire('Error', 'No se ha seleccionado ningún cliente válido', 'error');
            return;
        }*/
    
        // Ahora, si hay items válidos, puedes continuar con el resto de la lógica
        //let selectedFletero = selectedFletero ? { id: selectedFletero.id } : null;
        const viajeBack = viajeId;
        const fleteBack = selectedFletero;
    
        const reparto = {
            descripcion: descripcion,
            viaje:{id:viajeBack.id} ,
            items: filteredItems.map(i => ({ id: i.id })),  // Solo envía los items válidos
            fleteros:{id:selectedFletero.id} ,
            pagado: pagado,
            fecha: fecha,
            precio: precio
        };
    
        // Agregar los clientes seleccionados si hay alguno
      /*  if (selectedClientes.length > 0) {
            reparto.clientes = selectedClientes;
        }*/
       console.log(viajeBack.id);
       
    
        const repartoUpdate = {
            id: id,
            descripcion: descripcion,
            viaje:{id:viajeBack.id} ,
            items: filteredItems.map(i => ({ id: i.id })),
            fleteros:{id:selectedFletero.id} ,
            pagado: pagado,
            fecha: fecha,
            precio: precio
        };
    
        // Agregar los clientes seleccionados si hay alguno
        /*
        if (selectedClientes.length > 0) {
            repartoUpdate.clientes = selectedClientes;
        }
            */
        console.log(repartoUpdate);
        console.log(reparto);
        try {
            if (id) {
              
                
                await RepartoUpdate(repartoUpdate);
                Swal.fire('Éxito', 'Reparto actualizado con éxito', 'success');
            } else {
               
                
                await RepartoSave(reparto);
                Swal.fire('Éxito', 'Reparto creado con éxito', 'success');
            }
            navegar('/repartos');
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
    <Dropdown 
        id="viajeId" 
        value={viajeId} 
        options={viajesDisponibles} 
        onChange={handleViajeChange} 
        optionLabel="numeroViaje" 
        placeholder="Seleccione un viaje" 
        filter 
        filterBy="numeroViaje" // Configura el filtro para que busque por 'numeroViaje'
        filterPlaceholder="Buscar por número de viaje" // Mensaje de búsqueda
    />
</div>

                <div className="p-field">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="clientes">Clientes</label>
                    <DataTable value={clientesDisponibles} selection={clientes} onSelectionChange={(e) => setClientes(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} emptyMessage="No clients available">
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                        <Column field="numeroCliente" header="Número de Cliente" filter filterPlaceholder="Buscar por número"></Column>
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="direccion" header="Dirección"></Column>
                        <Column field="localidad" header="Localidad"></Column>
                    </DataTable>
                </div>
                <div className="p-field">
                    <label htmlFor="fleteros">Fletero</label>
                    <DataTable value={fleterosDisponibles} selection={selectedFletero} onSelectionChange={(e) => {
                        setSelectedFletero(e.value);
                        setPrecio(e.value ? e.value.importe : 0); // Asigna el importe del fletero seleccionado al precio
                    }} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} emptyMessage="No fleteros available">
                        <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="descripcion" header="Teléfono"></Column>
                        <Column field="precioPorKilometros" header="Precio por Kilómetros"></Column>
                        <Column field="precioPorDia" header="Precio por Día"></Column>
                    </DataTable>
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
