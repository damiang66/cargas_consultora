import axios from "axios";

const BASE_URL = 'http://localhost:8080/pdf';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const pdfViajes = async(id)=>{
   
        try {
         // const response = await axios.post(`${url}/${id}`, { responseType: 'arraybuffer' });
        const response = await axios.get(`${BASE_URL}/viajes/${id}`, { responseType: 'arraybuffer' });
       //  const response = await axios.get(`${url}/generar`, { responseType: 'arraybuffer' });
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const urlPdf = window.URL.createObjectURL(blob);
          window.open(urlPdf); // Abre el PDF en una nueva pestaña
        } catch (error) {
          console.error('Error al generar el PDF:', error);
        }
      
}
export const pdfLiquidaciones = async(id)=>{
   
    try {
     // const response = await axios.post(`${url}/${id}`, { responseType: 'arraybuffer' });
    const response = await axios.get(`${BASE_URL}/liquidaciones/${id}`, { responseType: 'arraybuffer' });
   //  const response = await axios.get(`${url}/generar`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf); // Abre el PDF en una nueva pestaña
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  
}