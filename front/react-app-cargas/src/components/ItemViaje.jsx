import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useClientes } from '../hooks/useClientes';
import { useViajes } from '../hooks/useViajes';

export const ItemViaje = ({ agregarItemViaje }) => {
  const [item, setItem] = useState({
    bultos: '',
    kilos: '',
    cliente: null
  });

  const [selectedClientes, setSelectedClientes] = useState([]);
  const { clientes, getClientes } = useClientes();
  const { handlerCloseForm } = useViajes();

  const handleClienteChange = (e) => {
    setSelectedClientes(e.value);
  };

  useEffect(() => {
    getClientes();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };
  const cerrar=()=>{
    setSelectedClientes([]);
    handlerCloseForm();
  }

  const agregar = () => {
    const newItem = {
      ...item,
      cliente: selectedClientes.length > 0 ? selectedClientes[0] : null,
    };

    agregarItemViaje(newItem);

    // Limpiar el estado después de agregar el item si es necesario
    setItem({
      bultos: '',
      kilos: '',
      cliente: null
    });
    setSelectedClientes([]);
    handlerCloseForm();
  };

  return (
    <>
      <div className="abrir-modal animacion fadeIn">
        <div className="modal " style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Agregar Cliente
                </h5>
              </div>
              <div className="modal-body">
                <label htmlFor="">Seleccione Cliente</label>
                <MultiSelect
                  value={selectedClientes}
                  onChange={handleClienteChange}
                  options={clientes}
                  optionLabel="numeroCliente"
                  placeholder="Seleccione Cliente"
                  maxSelectedLabels={5}
                  className="w-full md:w-20rem m-2"
                  filter
                  filterBy="numeroCliente"
                />
                <FloatLabel className='m-2'>
                  <InputText id="bultos" name='bultos' value={item.bultos} onChange={onInputChange} />
                  <label htmlFor="bultos">Bultos</label>
                </FloatLabel>
                <FloatLabel className='m-2'>
                  <InputText id="kilos" name='kilos' value={item.kilos} onChange={onInputChange} />
                  <label htmlFor="kilos">Kilos</label>
                </FloatLabel>
                <Button className='btn btn-primary m-2' type='button' onClick={agregar}> Agregar +</Button>
                <Button className='btn btn-danger m-2' type='button' onClick={cerrar}> Cerrar </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
