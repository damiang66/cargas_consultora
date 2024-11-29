import axios from "axios";

const BASE_URL = 'http://localhost:8080/viajes';

const configPdf = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        },
        responseType: 'blob' // Añadir esto para manejar la respuesta binaria
    }
}
const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

export const viajeFindAll = async () => {
    try {
        const respuesta = await axios.get(BASE_URL, config())
        return respuesta
    } catch (error) {
        throw error;
    }
}

export const viajeFindById = async (id) => {
    try {
        const respuesta = await axios.get(`${BASE_URL}/${id}`, config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export const viajeSave = async (viaje) => {
    try {
        const respuesta = await axios.post(BASE_URL, viaje, config())
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export const viajeUpdate = async (viaje) => {
    try {
        const respuesta = await axios.put(`${BASE_URL}/${viaje.id}`, viaje, config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export const viajeRemove = async (id) => {
    try {
        const respuesta = await axios.delete(`${BASE_URL}/${id}`, config());
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export const viajeBuscar = async (numero) => {
    try {
        const respuesta = await axios.get(`${BASE_URL}/buscarPorNumero/${numero}`)
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export const viajeExport = async (viajes) => {
    try {
        const respuesta = await axios.post(`${BASE_URL}/exportar`, viajes, configPdf())
        // Crear una URL para el archivo
        const url = window.URL.createObjectURL(new Blob([respuesta.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'viajes.zip'); // nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return respuesta;
    } catch (error) {
        throw error;
    }
}
