import axios from "axios";
import { Await } from "react-router-dom";

const BASE_URL = 'http://localhost:8080/facturacion';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
//compras
export const ComprasFIndAll = async(tipo)=>{
    
    
    try {
        const respuesta = await axios.get(`${BASE_URL}/compras-todas/${tipo}`, config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const ComprasSave = async(compra)=>{
    try {
        return await axios.post(`${BASE_URL}/compras`,compra,config())
    } catch (error) {
        throw error;
    }
}

//ventas
export const VentasFindAll = async(tipo)=>{
    
    
    try {
        const respuesta = await axios.get(`${BASE_URL}/ventas-todas/${tipo}`, config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export const VentasSave = async(data)=>{
    try {
      return  await axios.post(`${BASE_URL}/ventas`,data,config())
    } catch (error) {
        throw error;
    }
}
export const ComprasUpdate = async(data)=>{
    try {
        return await axios.put(`${BASE_URL}/compras/${data.id}`,data,config())
        
    } catch (error) {
        throw error;
    }
}
export const VentasUpdate = async(data)=>{
    try {
        return await axios.put(`${BASE_URL}/ventas/${data.id}`,data,config())
        
    } catch (error) {
        throw error;
    }
}