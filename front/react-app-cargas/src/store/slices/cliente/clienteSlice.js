import { createSlice } from "@reduxjs/toolkit";
export const inicialClienteForm = {
    id: 0,
    numeroCliente: '',
    npmbre: '',
    direccion: '',
    localidad: "",
    provincia:"",
    telefono:"",
    email:"",
}
const initialErrors = {
    numeroCliente: '',
    npmbre: '',
    direccion: '',
    localidad: "",
    provincia:"",
    telefono:"",
    email:"",
}
export const clienteSlice = createSlice({
    name: 'clientes',
    initialState:{
        clientes:[],
        clienteSeleccionado:inicialClienteForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addCliente:(state,action)=>{
            state.clientes=[
                ...state.clientes,
                {
                    ...action.payload,
                }
            ];
            state.clienteSelect=inicialClienteForm;
            state.visibleForm=false;
           
        },
        removeCliente:(state,action)=>{
            state.clientes= state.clientes.filter(u=>u.id !== action.payload)
        },
        updateCliente:(state,action)=>{
            state.clientes=state.clientes.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.clienteSeleccionado=inicialClienteForm;
            state.visibleForm=false;
        },
        loadingClientes:(state,action)=>{
            state.clientes = action.payload
        },
        onClienteSelectedForm:(state,action)=>{
            state.clienteSeleccionado= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.userSelected=initialUserForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addCliente,
    removeCliente,
    updateCliente,
    loadingClientes,
    onClienteSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=clienteSlice.actions;