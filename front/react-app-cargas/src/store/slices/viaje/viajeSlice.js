import { createSlice } from "@reduxjs/toolkit";
export const inicialViajeForm = {
        id:undefined,
        numeroViaje:0,
        fecha:'',
        totalBultos:0,
        totalKilos:0.0,
    cliente:{
        id: 0,
   
    }
}
const initialErrors = {
   
}
export const viajeSlice = createSlice({
    name: 'clientes',
    initialState:{
        viajes:[],
        viajeSelecionado:inicialViajeForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addViaje:(state,action)=>{
            state.viajes=[
                ...state.viajes,
                {
                    ...action.payload,
                }
            ];
            state.viajeSelecionado=inicialViajeForm;
            state.visibleForm=false;
           
        },
        removeViaje:(state,action)=>{
            state.viajes= state.viajes.filter(u=>u.id !== action.payload)
        },
        updateViaje:(state,action)=>{
            state.viajes=state.viajes.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.viajeSelecionado=inicialViajeForm;
            state.visibleForm=false;
        },
        loadingViajes:(state,action)=>{
            state.viajes = action.payload
        },
        onViajesSelectedForm:(state,action)=>{
            state.viajeSelecionado= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.viajeSelecionado=inicialViajeForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addViaje,
    removeViaje,
    updateViaje,
    loadingViajes,
    onViajesSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=viajeSlice.actions;