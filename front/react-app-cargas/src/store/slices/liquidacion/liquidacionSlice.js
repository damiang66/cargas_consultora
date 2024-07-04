import { createSlice } from "@reduxjs/toolkit";
export const inicialLiquidacionForm = {
    id: 0,
    viaje: {},
    fecha: '',
    gastos: [],
    totalGastos: 0.0,
    pagado:false,
  
}
const initialErrors = {
    id: 0,
    viaje: {},
    fecha: '',
    gastos: [],
    totalGastos: 0.0,
    pagado:false,
}
export const liquidacionSlice = createSlice({
    name: 'liquidaciones',
    initialState:{
        liquidaciones:[],
        liquidacionSeleccionado:inicialLiquidacionForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addLiquidacion:(state,action)=>{
            state.liquidaciones=[
                ...state.liquidaciones,
                {
                    ...action.payload,
                }
            ];
            state.liquidacionSeleccionado=inicialLiquidacionForm;
            state.visibleForm=false;
           
        },
        removeLiquidacion:(state,action)=>{
            state.liquidaciones= state.liquidaciones.filter(u=>u.id !== action.payload)
        },
        updateLiquidacion:(state,action)=>{
            state.liquidaciones=state.liquidaciones.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.liquidacionSeleccionado=inicialLiquidacionForm;
            state.visibleForm=false;
        },
        loadingliquidaciones:(state,action)=>{
            state.liquidaciones = action.payload
        },
        onLiquidacionSelectedForm:(state,action)=>{
            state.liquidacionSeleccionado= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.userSelected=inicialClienteForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addLiquidacion,
    removeLiquidacion,
    updateLiquidacion,
    loadingliquidaciones,
    onLiquidacionSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=liquidacionSlice.actions;