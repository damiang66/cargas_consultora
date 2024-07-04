import React, { useEffect, useState } from 'react'
import { useLiquidacion } from '../hooks/useLiquidacion';
import { viajeLiquidado } from '../services/liquidacionService';
import { Gastos } from './Gastos';
import { useParams } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

export const LiquidacionForm = ({liquidacionSeleccionada,handlerCloseForm}) => {
  const { inicialLiquidacionForm, handlerAddLiquidacion, errors, liquidaciones, visibleForm, handlerOpenForm } = useLiquidacion();
 // const { getClientes, clientes } = useClientes();

  const [liquidacionForm, setLiquidacionForm] = useState(inicialLiquidacionForm);
  const [gastos, setGastos] = useState([]);
  const[viaje,setViaje]=useState({})
  const [viajeSeleccionado,setViajeSeleccionado]=useState({})

  const { id,  fecha, totalGastos,iva,total } = liquidacionForm;

  useEffect(() => {
      setLiquidacionForm({
          ...liquidacionSeleccionada
      });
  }, [liquidacionSeleccionada]);

  const { id: paramId } = useParams();

  useEffect(() => {
      if (paramId) {
          const liquidacion = liquidaciones.find(e => e.id === parseInt(paramId));
          if (liquidacion) {
              setLiquidacionForm(liquidacion);
              setGastos(liquidacion.gastos || []);
          }
      }
  }, [paramId, liquidaciones]);

  useEffect(() => {
    liquidados()
    
  }, []);
  const liquidados = async()=>{
    try {
      const respuesta = await viajeLiquidado();
     console.log(respuesta);
      setViaje(respuesta.data)
      console.log('VIAJE'+JSON.stringify(viaje));

    } catch (error) {
      throw error;
    }
  }
  

  const onInputChange = ({ target }) => {
      const { name, value } = target;
      setLiquidacionForm({
          ...liquidacionForm,
          [name]: value,
      });
  };

  const calcularTotales = (items) => {
  /*    const totalBultos = items.reduce((total, item) => total + parseFloat(item.bultos || 0), 0);
      const totalKilos = items.reduce((total, item) => total + parseFloat(item.kilos || 0), 0);
      setViajeFrom({
          ...viajeForm,
          totalBultos,
          totalKilos
      });
      */
  };

  const agregarItemViaje = (newItem) => {
      setItemsViaje((prevItems) => {
          const itemExistente = prevItems.find(item => item.cliente?.numeroCliente === newItem.cliente?.numeroCliente);

          let updatedItems;
          if (itemExistente) {
              updatedItems = prevItems.map(item =>
                  item.cliente?.numeroCliente === newItem.cliente?.numeroCliente ? newItem : item
              );
          } else {
              updatedItems = [...prevItems, newItem];
          }

          calcularTotales(updatedItems);
          return updatedItems;
      });
  };

  const eliminarItemViaje = (clienteNumeroCliente) => {
      setItemsViaje((prevItems) => {
          const updatedItems = prevItems.filter(item => item.cliente?.numeroCliente !== clienteNumeroCliente);
          calcularTotales(updatedItems);
          return updatedItems;
      });
  };

  const onSubmit = (event) => {
      event.preventDefault();
      const liquidacionCompleta = {
          ...liquidacionForm,
          gastos: gastos
      };
      handlerAddLiquidacion(liquidacionCompleta);
  };

  const onCloseForm = () => {
      handlerCloseForm();
      setLiquidacionForm(inicialLiquidacionForm);
  };

  return (
      <>
          {!visibleForm || <Gastos agregarItemViaje={agregarItemViaje} clientes={clientes} />}
          <div className="container m-4">
              <form onSubmit={onSubmit}>
                  <div className="container m-2" style={{ display: 'flex', flexDirection: 'column' }}>
                  <MultiSelect  onChange={(e) => setViajeSeleccionado(e.value)} options={viaje} optionLabel="name" 
    placeholder="Seleccione Viaje" maxSelectedLabels={1} className="w-full md:w-20rem" />
                  
                      <label htmlFor="">Fecha</label>
                      <Calendar className='form' value={fecha} onChange={(e) => onInputChange({ target: { name: 'fecha', value: e.value } })} />
                      <button className='btn btn-success m-2' type='button' onClick={handlerOpenForm}>Agregar Gastos + </button>
                      {/* Mostrar tabla de items de viaje */}
                      <div className="container mt-4">
                          <h2>Items de Viaje</h2>
                          <table className="table">
                              <thead>
                                  <tr>
                                       <th>Descripcion</th>
                                      <th>Importe</th>
                                     
                                      <th>Acciones</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {gastos.map((item, index) => (
                                      <tr key={index}>
                                          <td>{item.concepto ? item.concepto : ''}</td>
                                          <td>{item.importe}</td>
                                      
                                          
                                          <td>
                                              <button 
                                              type='button'
                                                  className="btn btn-danger" 
                                                  onClick={() => eliminarItemViaje(item.cliente.numeroCliente)}
                                              >
                                                  Eliminar
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                      <input type="hidden" name="id" value={id} />
                      <label htmlFor="">Total Bultos</label>
                      <InputText disabled value={totalGastos} />
                      <label htmlFor="">Total Kilos</label>
                      <InputText disabled value={total} />

                      <button style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
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
                  </div>
              </form>
          </div>
      </>
  );
}
