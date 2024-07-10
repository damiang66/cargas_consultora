import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { LiquidacionFindAll, liquidacionRemove, liquidacionSave, liquidacionUpdate, liquidar } from "../services/liquidacionService";
import { addLiquidacion, loadingliquidaciones, onCloseForm, onError, onLiquidacionSelectedForm, onOpenForm, removeLiquidacion, updateLiquidacion,inicialLiquidacionForm } from "../store/slices/liquidacion/liquidacionSlice";


export const useLiquidacion =()=>{
    const {liquidaciones,liquidacionSeleccionado,visibleForm,errors}= useSelector(state=>state.liquidaciones)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getLiquidaciones = async () => {
        try {
            
       
        const result = await LiquidacionFindAll();
        console.log(result);
        dispatch(loadingliquidaciones(result.data));
       
          
     } catch (error) {
            
    }
}


    const handlerAddLiquidacion = async (liquidacion) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {
            console.log(liquidacion.id);

            if (liquidacion.id === 0) {
                console.log('entre en el if');
                response = await liquidacionSave(liquidacion);
                dispatch(addLiquidacion(response.data))
            } else {
                console.log('entre en el else');
                response = await liquidacionUpdate(liquidacion);
                dispatch(updateLiquidacion(response.data))
            }

       

            Swal.fire(
                (liquidacion.id === 0) ?
                    'Liquidacion Creada' :
                    'Liquidacion Actualizada',
                (liquidacion.id=== 0) ?
                    'La Liquidacion ha sido creada con exito!' :
                    'La Liquidacion ha sido actualizada con exito!',
                'success'
            );
           // handlerCloseForm();
            // cambiar
            console.log(liquidacion);
            const respuesta = await liquidar(liquidacion.viaje.id)
            navigate('/liquidaciones');
        } catch (error) {
            if (error.response && error.response.status == 400) {
               dispatch( onError(error.response.data));
          
            } else if (error.response?.status == 401) {
                handlerLogout();
            } else if(error.response && error.response.status == 403) {
               Swal.fire('Error', 'error faltan datos o no tiene permisos para esta accion', 'warning');
            }else{
                throw error;   
            }
        }
    }

    const handlerRemoveLiquidacion = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado la liquidacion sera eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await liquidacionRemove(id);
                    dispatch(removeLiquidacion(id));
                    Swal.fire(
                        'Liquidacion Eliminada!',
                        'La liquidacion ha sido eliminada con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerLiquidacionSelectedForm = (liquidacion) => {
      
   dispatch(onLiquidacionSelectedForm({...liquidacion}))
    }

    const handlerOpenForm = () => {
     
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
      dispatch(onCloseForm())
      dispatch( onError({}));
    }
    return {
        liquidaciones,
        liquidacionSeleccionado,
        inicialLiquidacionForm,
        visibleForm,
        errors,
        handlerAddLiquidacion,
        handlerRemoveLiquidacion,
        handlerLiquidacionSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getLiquidaciones,
    }
}