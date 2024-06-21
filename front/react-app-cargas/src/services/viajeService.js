import axios from "axios";

const BASE_URL = 'http://localhost:8080/viajes';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const viajeFindAll = async ()=>{
    try {
        const respuesta = await axios.get(BASE_URL,config())
        return respuesta
    } catch (error) {
        throw error;
    }
}
export const viajeFindById = async(id)=>{
    try {
        const respuesta = await axios.get(`${BASE_URL}/${id}`,config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const viajeSave = async (viaje)=>{
    try {
        const respuesta = await axios.post(BASE_URL,viaje,config())
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const viajeUpdate = async (viaje)=>{
    try {
        const respuesta = await axios.put(`${BASE_URL}/${viaje.id}`,viaje,config());
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}
export const viajeRemove = async(id)=>{
    try {
        const respuesta = await axios.delete(`${BASE_URL}/${id}`,config());
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}