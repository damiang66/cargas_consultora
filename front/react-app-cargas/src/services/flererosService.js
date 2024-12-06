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
export const FleterosFindAll = async()=>{
    try {
       return await axios.get(`${BASE_URL}/fleteros`, config())
    } catch (error) {
        throw error;
    }
}
export const fleterosFindById =  async (id)=>{
    try {
        return await axios.get(`${BASE_URL}/fleteros/${id}`,config())
    } catch (error) {
        throw error;
    }

}
export const FleterosSave = async( fletero)=>{
    try {
        return await axios.post(`${BASE_URL}/fleteros`,fletero, config())
    } catch (error) {
        throw error;
    }
}
export const fleterosUpdate =  async (fletero)=>{
    try {
        return await axios.put(`${BASE_URL}/fleteros/${fletero.id}`,fletero,config())
    } catch (error) {
        throw error;
    }

}
export const fleteroDelete= async(id)=>{
    try {
        return await axios.delete(`${BASE_URL}/fleteros/${id}`,config())
    } catch (error) {
        throw error;
    }
}
