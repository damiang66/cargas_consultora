import axios from "axios";

const BASE_URL = 'http://localhost:8080';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const RepartoFindAll= async()=>{
    try {
        return await axios.get(`${BASE_URL}/reparto`, config())
    } catch (error) {
        throw error;
    }

}
export const RepartoFindById= async(id)=>{
    try {
        return await axios.get(`${BASE_URL}/reparto/${id}`, config())
    } catch (error) {
        throw error;
    }
}
export const RepartoSave = async(reparto)=>{
    try {
        return await axios.post(`${BASE_URL}/reparto`,reparto,config())
    } catch (error) {
        throw error;
    }
}
export const RepartoUpdate = async(reparto)=>{
    try {
        return await axios.put(`${BASE_URL}/reparto/${reparto.id}`,reparto,config())
    } catch (error) {
        throw error;
    }
}
export const RepartoDelete = async(reparto)=>{
    try {
        return await axios.delete(`${BASE_URL}/reparto/${reparto.id}`,config())
    } catch (error) {
        throw error;
    }
}
export const RepartoClientePorViajeFindAll= async (nroViaje)=>{
try {
     return await axios.get(`${BASE_URL}/reparto/clientes-viajes/${nroViaje}`,config())
} catch (error) {
    throw error;
}
}
export const RepartoViajeFIndAll= async (nroViaje)=>{
    try {
         return await axios.get(`${BASE_URL}/reparto/reparto-viaje/${nroViaje}`,config())
    } catch (error) {
        throw error;
    }
    }