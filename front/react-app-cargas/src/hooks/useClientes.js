import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { clienteFindAll, clienteRemove, clienteSave, clienteUpdate } from "../services/clienteService";
import { addCliente, inicialClienteForm, loadingClientes, onClienteSelectedForm, onCloseForm, onError, onOpenForm, removeCliente, updateCliente } from "../store/slices/cliente/clienteSlice";
import Swal from "sweetalert2";

export const useClientes =()=>{
    const {clientes,clienteSeleccionado,visibleForm,errors}= useSelector(state=>state.clientes)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getClientes = async () => {
        try {
            
       
        const result = await clienteFindAll();
        console.log(result);
        dispatch(loadingClientes(result.data));
          
     } catch (error) {
            
    }
}

    const handlerAddCliente = async (cliente) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {
            console.log(cliente.id);

            if (cliente.id === undefined) {
                console.log('entre en el if');
                response = await clienteSave(cliente);
                dispatch(addCliente(response.data))
            } else {
                console.log('entre en el else');
                response = await clienteUpdate(cliente);
                dispatch(updateCliente(response.data))
            }

            

            Swal.fire(
                (cliente.id === 0) ?
                    'Cliente Creado' :
                    'Cliente Actualizado',
                (cliente.id === 0) ?
                    'El cliente ha sido creado con exito!' :
                    'El cliente ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            // cambiar
            navigate('/users');
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

    const handlerRemoveClientes = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el cliente sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await clienteRemove(id);
                    dispatch(removeCliente(id));
                    Swal.fire(
                        'Cliente Eliminado!',
                        'El cliente ha sido eliminado con exito!',
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

    const handlerCLienteSelectedForm = (cliente) => {
      
   dispatch(onClienteSelectedForm({...cliente}))
    }

    const handlerOpenForm = () => {
     
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
      dispatch(onCloseForm())
      dispatch( onError({}));
    }
    return {
        clientes,
        clienteSeleccionado,
        inicialClienteForm,
        visibleForm,
        errors,
        handlerAddCliente,
        handlerRemoveClientes,
        handlerCLienteSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getClientes,
    }
}