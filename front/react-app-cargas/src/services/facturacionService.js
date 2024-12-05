import axios from "axios";

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

//ventas
export const VentasFindAll = async(tipo)=>{
    
    
    try {
        const respuesta = await axios.get(`${BASE_URL}/ventas-todas/${tipo}`, config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}