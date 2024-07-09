import React, { useEffect, useState } from 'react'
import { useLiquidacion } from '../hooks/useLiquidacion';
import { viajeLiquidado } from '../services/liquidacionService';
import { Gastos } from './Gastos';
import { useParams } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

export const LiquidacionForm = ({ liquidacionSeleccionada, handlerCloseForm }) => {
    const { inicialLiquidacionForm, handlerAddLiquidacion, errors, liquidaciones, visibleForm, handlerOpenForm } = useLiquidacion();
    // const { getClientes, clientes } = useClientes();

    const [liquidacionForm, setLiquidacionForm] = useState(inicialLiquidacionForm);
    const [gastos, setGastos] = useState({});
    const [listaGasto, setListaGasto] = useState([]);
    const [viaje, setViaje] = useState([]);
    const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
    const [totalGastos, setTotalGastos] = useState(0);
    const [iva, setIva] = useState(0);
    const [total, setTotal] = useState(0);

    const { id, fecha } = liquidacionForm;
    const { concepto, importe } = gastos;

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
                setListaGasto(liquidacion.gastos || []);
            }
        }
    }, [paramId, liquidaciones]);

    useEffect(() => {
        liquidados();
    }, []);

    useEffect(() => {
        calcularTotales();
    }, [listaGasto]);

    const liquidados = async () => {
        try {
            const respuesta = await viajeLiquidado();
            console.log(respuesta.data);
            setViaje(respuesta?.data);
            console.log('VIAJE' + JSON.stringify(viaje));
            return viaje;
        } catch (error) {
            throw error;
        }
    }

    const changeGasto = ({ target }) => {
        const { name, value } = target;
        setGastos({
            ...gastos,
            [name]: value,
        });
    }

    const agregarGasto = () => {
        const nuevoGasto = { ...gastos, id: listaGasto.length + 1 }; // Añade un id único para cada gasto
        setListaGasto([...listaGasto, nuevoGasto]);
        setGastos({
            concepto: '',
            importe: '',
        });
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLiquidacionForm({
            ...liquidacionForm,
            [name]: value,
        });
    };

    const eliminarItemViaje = (gastoId) => {
        setListaGasto((prevItems) => {
            const updatedItems = prevItems.filter(item => item.id !== gastoId);
            return updatedItems;
        });
    };

    const calcularTotales = () => {
        const totalGastosCalculado = listaGasto.reduce((acc, item) => acc + parseFloat(item.importe), 0);
        const ivaCalculado = totalGastosCalculado * 0.21;
        const totalCalculado = totalGastosCalculado + ivaCalculado;

        setTotalGastos(totalGastosCalculado);
        setIva(ivaCalculado);
        setTotal(totalCalculado);
    };

    const onSubmit = (event) => {

        event.preventDefault();
      
     if(id){
       
const liquidacionCompleta = {
    ...liquidacionForm,
    gastos: listaGasto,
    totalGastos:totalGastos,
    iva:iva,
    total:total,
}
handlerAddLiquidacion(liquidacionCompleta);
     }else{
        const liquidacionCompleta = {
            ...liquidacionForm,
            gastos: listaGasto,
            totalGastos:totalGastos,
            iva:iva,
            total:total,
            viaje:viajeSeleccionado[0],
          

        };
        handlerAddLiquidacion(liquidacionCompleta);
        console.log(liquidacionCompleta);
     }

       
     
    };

    return (
        <>
            {!visibleForm || <Gastos agregarItemViaje={agregarItemViaje} clientes={clientes} />}
            <div className="container m-4">
                <form onSubmit={onSubmit}>
                    <div className="container m-2" style={{ display: 'flex', flexDirection: 'column' }}>
                        {id?"":<>
                            <MultiSelect
                            value={viajeSeleccionado}
                            onChange={(e) => setViajeSeleccionado(e.value)}
                            options={viaje}
                            optionLabel="numeroViaje"
                            placeholder="Seleccione Viaje"
                            maxSelectedLabels={1}
                            className="w-full md:w-20rem"
                        />

                        <label htmlFor="">Fecha</label>
                        <Calendar className='form' value={fecha} onChange={(e) => onInputChange({ target: { name: 'fecha', value: e.value } })} />
                        </>}
                       
                        <div className='m-2'>
                            <FloatLabel>
                                <InputText id="concepto" value={concepto} onChange={changeGasto} name='concepto' />
                                <label htmlFor="concepto">Concepto</label>
                            </FloatLabel>
                        </div>
                        <div className='m-2'>
                            <FloatLabel>
                                <InputText id="importe" value={importe} onChange={changeGasto} name='importe' />
                                <label htmlFor="importe">Importe</label>
                            </FloatLabel>
                        </div>
                        <button className='btn btn-success m-2' type='button' onClick={agregarGasto}>Agregar Gastos + </button>
                        {/* Mostrar tabla de items de viaje */}
                        <div className="container mt-4">
                            <h2>Tabla de Gastos</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Concepto</th>
                                        <th>Importe</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaGasto.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.concepto}</td>
                                            <td>{item.importe}</td>
                                            <td>
                                                <button
                                                    type='button'
                                                    className="btn btn-danger"
                                                    onClick={() => eliminarItemViaje(item.id)}
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
                        <label htmlFor="">Total Gastos</label>
                        <InputText disabled value={totalGastos.toFixed(2)} />
                        <label htmlFor="">IVA</label>
                        <InputText disabled value={iva.toFixed(2)} />
                        <label htmlFor="">Total</label>
                        <InputText disabled value={total.toFixed(2)} />
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
