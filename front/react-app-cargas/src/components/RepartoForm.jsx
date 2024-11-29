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
    const navegar = useNavigate()
    
    const [viajeId, setViajeId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [clientes, setClientes] = useState([]);
    const [selectedFletero, setSelectedFletero] = useState(null);
    const [pagado, setPagado] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [precio, setPrecio] = useState(0);
    const [clientesDisponibles, setClientesDisponibles] = useState([]);
    const [items,setItems]=useState([])
    const [fleterosDisponibles, setFleterosDisponibles] = useState([]);
    const [viajesDisponibles, setViajesDisponibles] = useState([]);
   let clienteBack=[];
   let fleteBack;
   let viajeBack;

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
            const response = await RepartoFindById(id)
            const reparto = response.data;
            setViajeId(reparto.viaje.id);
            setDescripcion(reparto.descripcion);
            setClientes(reparto.clientes);
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
                
              // Mapeamos los clientes del viaje a un formato adecuado para el DataTable
            let clie = response.data[0]
            
            let clientes = []
            console.log(clie?.items);
           setItems(clie?.items)
             clie?.items.map(m => {
               clientes.push(m.cliente)
            })
            console.log(clientes);
            clientes.forEach(c=>{
                //console.log(c);
                
                clienteBack.push(c.id)
               // console.log("clienteId"+ clienteBack);
                
            })
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
        console.log(items);
        
        viajeBack=viajeId.id
        fleteBack= selectedFletero.id
        const reparto = {
            descripcion: descripcion,  // Descripción del reparto
            viaje: {
                id: viajeBack  // ID del viaje
            },
            items: items.map(i => ({ id: i.id })),  // Lista de objetos con los IDs de clientes
            fleteros: {
                id: fleteBack  // ID del fletero
            },
            pagado: pagado,  // Estado de pago
            fecha: fecha,  // Fecha del reparto
            precio: precio  // Precio asociado al reparto
        };
        const repartoUpdate = {
            id:id,
            descripcion: descripcion,  // Descripción del reparto
            viaje: {
                id: viajeBack  // ID del viaje
            },
            items: items.map(i => ({ id: i.id })),  // Lista de objetos con los IDs de clientes
            fleteros: {
                id: fleteBack  // ID del fletero
            },
            pagado: pagado,  // Estado de pago
            fecha: fecha,  // Fecha del reparto
            precio: precio  // Precio asociado al reparto
        };
        try {
            if (id) {
                console.log(repartoUpdate);
                
               await RepartoUpdate(repartoUpdate);
                Swal.fire('Éxito', 'Reparto actualizado con éxito', 'success');
            } else {
                console.log(reparto);
                
             await RepartoSave(reparto);
                Swal.fire('Éxito', 'Reparto creado con éxito', 'success');
            }
            navegar('/repartos')
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
                        <Column field="precioPorKilometros" header="precioPorKilometros"></Column>
                        <Column field="precioPorDia" header="precioPorDia"></Column>
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
}