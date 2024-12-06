import axios from "axios";

const BASE_URL = 'http://localhost:8080/excel';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const ExcelViajes = async(id)=>{
   
        try {
            const response = await axios.get(`${BASE_URL}/viajes/${id}`, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const urlExcel = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = urlExcel;
            link.setAttribute('download', 'viaje.xlsx'); // El nombre del archivo que se descargará
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al generar el Excel:', error);
        }
    };
    export const ExcelLiquidaciones = async(id)=>{
   
        try {
            const response = await axios.get(`${BASE_URL}/liquidaciones/${id}`, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const urlExcel = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = urlExcel;
            link.setAttribute('download', 'liquidacion.xlsx'); // El nombre del archivo que se descargará
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al generar el Excel:', error);
        }
    };
