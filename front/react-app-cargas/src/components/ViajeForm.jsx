import React, { useEffect, useState } from 'react';
import { useClientes } from '../hooks/useClientes';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useParams } from 'react-router-dom';
import { useViajes } from '../hooks/useViajes';
import { Calendar } from 'primereact/calendar';

import { ItemViaje } from './ItemViaje';

export const ViajeForm = ({ viajeSeleccionado, handlerCloseForm }) => {
  const { inicialViajeForm, handlerAddViaje, errors, viajes, visibleForm, handlerOpenForm } = useViajes();
  const { getClientes, clientes } = useClientes();

  const [viajeForm, setViajeFrom] = useState(inicialViajeForm);
  const [itemsViaje, setItemsViaje] = useState([]);

  const { id, numeroViaje, fecha, totalBultos, totalKilos } = viajeForm;

  useEffect(() => {
    setViajeFrom({
      ...viajeSeleccionado
    });
  }, [viajeSeleccionado]);

  const { id: paramId } = useParams();

  useEffect(() => {
    if (paramId) {
      const viaje = viajes.find(e => e.id === parseInt(paramId));
      if (viaje) {
        setViajeFrom(viaje);
      }
    }
  }, [paramId, viajes]);

  useEffect(() => {
    getClientes();
  }, []);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setViajeFrom({
      ...viajeForm,
      [name]: value,
    });
  };

  const agregarItemViaje = (item) => {
    setItemsViaje([...itemsViaje, item]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // Guardar viajeForm y itemsViaje en la base de datos o enviar a la API
    const viajeCompleto = {
      ...viajeForm,
      items: itemsViaje // Asumiendo que tienes un campo en viajeForm para almacenar los items del viaje
    };
    handlerAddViaje(viajeCompleto);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setViajeFrom(inicialViajeForm);
  };

  return (
    <>
      {!visibleForm || <ItemViaje agregarItemViaje={agregarItemViaje} />}
      <div className="container m-4">
        <form onSubmit={onSubmit}>
          <div className="container m-2" style={{ display: 'flex', flexDirection: 'column' }}>
            <FloatLabel >
              <InputText name='numeroViaje' id="numeroViaje" value={numeroViaje} onChange={onInputChange} />
              <label htmlFor="numeroViaje">numero Viaje</label>
            </FloatLabel>
            <p className="text-danger">{errors?.numeroViaje}</p>
            <label htmlFor="">Fecha</label>
            <Calendar className='form' value={fecha} onChange={onInputChange} />
            <button className='btn btn-success m-2' type='button' onClick={handlerOpenForm}>Agregar Cliente + </button>
 {/* Mostrar tabla de items de viaje */}
 <div className="container mt-4">
        <h2>Items de Viaje</h2>
        <table className="table">
          <thead>
            <tr>
              <th>CLientes</th>
              <th>Bultos</th>
              <th>Cliente</th>
            </tr>
          </thead>
          <tbody>
            {itemsViaje.map((item, index) => (
              <tr key={index}>
                <td>{item.cliente ? item.cliente.numeroCliente : ''}</td>
                <td>{item.bultos}</td>
                <td>{item.kilos}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            <input type="hidden"
              name="id"
              value={id} />
            <label htmlFor="">Total Bultos</label>
            <InputText disabled value={totalBultos} />
            <label htmlFor="">Total Kilos</label>
            <InputText disabled value={totalKilos} />

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
};