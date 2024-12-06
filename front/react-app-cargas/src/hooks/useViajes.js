import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";
import { viajeFindAll, viajeRemove, viajeSave, viajeUpdate } from "../services/viajeService";
import { addViaje, inicialViajeForm, loadingViajes, onCloseForm, onError, onOpenForm, onViajesSelectedForm, removeViaje, updateViaje } from "../store/slices/viaje/viajeSlice";


export const useViajes =()=>{
    const {viajes,viajeSeleccionado,visibleForm,errors}= useSelector(state=>state.viajes)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getViajes = async () => {
        try {
            
       
        const result = await viajeFindAll();
        console.log(result);
        dispatch(loadingViajes(result.data));
          
     } catch (error) {
            
    }
}

    const handlerAddViaje = async (viaje) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {
            console.log(viaje.id);

            if (viaje.id === undefined) {
                console.log('entre en el if');
                response = await viajeSave(viaje);
                dispatch(addViaje(response.data))
            } else {
                console.log('entre en el else');
                response = await viajeUpdate(viaje);
                dispatch(updateViaje(response.data))
            }

            

            Swal.fire(
                (viaje.id === 0) ?
                    'Viaje Creado' :
                    'Viaje Actualizado',
                (viaje.id === 0) ?
                    'El viaje ha sido creado con exito!' :
                    'El viaje ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            // cambiar
            navigate('/viajes');
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

    const handlerRemoveViaje = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el viaje sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await viajeRemove(id);
                    dispatch(removeViaje(id));
                    Swal.fire(
                        'Viaje Eliminado!',
                        'El viaje ha sido eliminado con exito!',
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

    const handlerViajeSelectedForm = (viaje) => {
      
   dispatch(onViajesSelectedForm({...viaje}))
    }

    const handlerOpenForm = () => {
     
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
      dispatch(onCloseForm())
      dispatch(onError({}));
    }
    return {
        viajes,
        viajeSeleccionado,
        inicialViajeForm,
        visibleForm,
        errors,
        handlerAddViaje,
        handlerRemoveViaje,
        handlerViajeSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getViajes,
    }
}