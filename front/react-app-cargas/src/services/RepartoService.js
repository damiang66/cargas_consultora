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
        return await axios.put(`${BASE_URL}/reparto/${parseInt(reparto.id)}`,reparto,config())
    } catch (error) {
        throw error;
    }
}
export const RepartoDelete = async(id)=>{
    try {
        return await axios.delete(`${BASE_URL}/reparto/${id}`,config())
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
    export const RepartoExport = async (format, data) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/repartos/export/${format}`, data, {
                ...config(),
                responseType: 'blob', // Esto es necesario para tratar la respuesta como un archivo binario
            });
    
            // Crear un enlace temporal para descargar el archivo
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
    
            // Verificar si la cabecera 'Content-Disposition' está presente y extraer el nombre del archivo
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'reparto_file'; // Nombre por defecto
    
            if (contentDisposition) {
                // Intentar extraer el nombre del archivo desde la cabecera
                const matches = /filename="(.+)"/.exec(contentDisposition);
                if (matches && matches[1]) {
                    fileName = matches[1];
                }
            }
    
            // Definir el nombre del archivo y abrir la descarga
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
    
            // Limpiar
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
    
        } catch (error) {
            console.error("Error al exportar el archivo:", error);
            throw error;
        }
    };
    