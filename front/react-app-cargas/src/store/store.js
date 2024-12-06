import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { clienteSlice } from "./slices/cliente/clienteSlice";
import { principalSlice } from "./slices/principal/principalSlice";
import { viajeSlice } from "./slices/viaje/viajeSlice";
import { liquidacionSlice } from "./slices/liquidacion/liquidacionSlice";

export const store = configureStore({
    reducer:{
        users:userSlice.reducer,
        auth:authSlice.reducer,
        clientes:clienteSlice.reducer,
        principal:principalSlice.reducer,
        viajes:viajeSlice.reducer,
        liquidaciones:liquidacionSlice.reducer,
    }
})