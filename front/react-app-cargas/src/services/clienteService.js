import axios from "axios";

const BASE_URL = 'http://localhost:8080/cliente';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const clienteFindAll = async ()=>{
    try {
        const respuesta = await axios.get(BASE_URL,config())
        return respuesta
    } catch (error) {
        throw error;
    }
}
export const clienteFindById = async(id)=>{
    try {
        const respuesta = await axios.get(`${BASE_URL}/${id}`,config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const clienteSave = async (cliente)=>{
    try {
        const respuesta = await axios.post(BASE_URL,cliente,config())
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const clienteUpdate = async (cliente)=>{
    try {
        const respuesta = await axios.put(`${BASE_URL}/${cliente.id}`,cliente,config());
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}
export const clienteRemove = async(id)=>{
    try {
        const respuesta = await axios.delete(`${BASE_URL}/${id}`,config());
        return respuesta;
        
    } catch (error) {
        throw error;
    }
}
export const ClienteBuscar = async(nroCliente)=>{
    try {
        nroCliente = parseInt(nroCliente);
        const respuesta = await axios.get(`${BASE_URL}/numero/${nroCliente}`,config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}