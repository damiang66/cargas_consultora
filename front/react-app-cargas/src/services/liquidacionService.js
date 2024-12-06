import axios from "axios";

const BASE_URL = 'http://localhost:8080/liquidacion';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const LiquidacionFindAll = async ()=>{
    try {
        const respuesta = await axios.get(BASE_URL,config())
        return respuesta
    } catch (error) {
        throw error;
    }
}
export const liquidacionFindById = async(id)=>{
    try {
        const respuesta = await axios.get(`${BASE_URL}/${id}`,config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const liquidacionSave = async (liquidacion)=>{
    try {
        console.log(liquidacion);
        const respuesta = await axios.post(BASE_URL,liquidacion,config())
       
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const liquidacionUpdate = async (liquidacion)=>{
    console.log("DESDE EL SERVICE " + JSON.stringify(liquidacion));
    try {
        const respuesta = await axios.put(`${BASE_URL}/${liquidacion.id}`,liquidacion,config());
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}
export const liquidacionRemove = async(id)=>{
    try {
        const respuesta = await axios.delete(`${BASE_URL}/${id}`,config());
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}
export const viajeLiquidado = async()=>{
    try {
        const respuesta = await axios.get(`${BASE_URL}/liquidado`,config())
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}
export const liquidar = async(id)=>{
    try {
        console.log("ANTES DE LIQUIDAR");
        const respuesta = await axios.put(`${BASE_URL}/liquidado/${id}`,config())
        return respuesta;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}
export const noLiquidar = async(id)=>{
    try {
        console.log('NO LIQUIDAR');
        const respuesta = await axios.put(`${BASE_URL}/noLiquidado/${id}`,config())
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const liquidacionBuscar = async(numero)=>{
    try {
        const respuesta = await axios.get(`${BASE_URL}/buscar/${numero}`);
        return respuesta;
    } catch (error) {
        throw error;
    }
}