import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FleterosFindAll, fleterosFindById, FleterosSave, fleterosUpdate } from '../services/flererosService';
import Swal from 'sweetalert2';

export const FleterosForm = ({fleteroSeleccionado}) => {
    const navegar = useNavigate()
    const [fleteroForm,setFleteroForm]=useState({});
    const {id,nombre,descripcion,precioPorKilometros,precioPorDia}= fleteroForm;
    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        setFleteroForm({
            ...fleteroForm,
            [name]: value,
        })
    }
   
    const [fleteros,setFleteros]=useState([])
  
    useEffect(() => {
        setFleteroForm({
            ...fleteroSeleccionado
        });
    }, [fleteroSeleccionado]);
    const {id:paramId} = useParams();
    useEffect(() => {
     
       traerUnFletero(paramId)
      
    }, [paramId]);
    const traerUnFletero = async(id)=>{
        try {
            const respuesta = await fleterosFindById(parseInt(id));
            setFleteroForm(respuesta.data);
            console.log(fleteroForm);
            
        } catch (error) {
            throw error;
        }
    }
    const onSubmit= async()=>{
        event.preventDefault();
try {
    if (!paramId){
        FleterosSave(fleteroForm)
        Swal.fire('Creado', 'Fletero creado con exito', 'success')

    }else{
        fleterosUpdate(fleteroForm);
        Swal.fire('Actualizado', 'Fletero actualizado con exito', 'success');
    }
    navegar('/fleteros')
} catch (error) {
    throw error;
}
    }
  return (
   <>
   <div className="container m-4">
   <form onSubmit={onSubmit}>
   <FloatLabel>
    <InputText disabled hidden name="id"  value={id} onChange={onInputChange} />
   
</FloatLabel>
<FloatLabel className='m-4'>
    <InputText   name="nombre"  value={nombre} onChange={onInputChange} />
    <label htmlFor="nombre">Nombre</label>
</FloatLabel>
<FloatLabel className='m-4'>
    <InputText   name="descripcion"  value={descripcion} onChange={onInputChange} />
    <label htmlFor="descripcion">Descipcion</label>
</FloatLabel>
<FloatLabel className='m-4'>
    <InputText   name="precioPorKilometros"  value={precioPorKilometros} onChange={onInputChange} />
    <label htmlFor="precioPorKilometros">precio Por Kilometro</label>
</FloatLabel>
<FloatLabel className='m-4'>
    <InputText   name="precioPorDia"  value={precioPorDia} onChange={onInputChange} />
    <label htmlFor="precioPorDia">Precio Por dia</label>
</FloatLabel>


<button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>
            </form>
</div>
          
   </>
  
  )
}
