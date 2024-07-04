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
        const respuesta = await axios.post(BASE_URL,liquidacion,config())
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const liquidacionUpdate = async (liquidacion)=>{
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