import axios from 'axios';
import React, { useState } from 'react';

export const ReporteViajes = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [resultData, setResultData] = useState([]);
    const [totalKilos, setTotalKilos] = useState(0.0); // Estado para almacenar el total de kilos

    const handleSearch = async () => {
        const BASE_URL = 'http://localhost:8080/viajes';
        try {
            const response = await axios.get(`${BASE_URL}/buscar?startDate=${startDate}&endDate=${endDate}`);
            setResultData(response.data);

            // Calcular el total de kilos sumando los valores de cada item en resultData
            let total = 0.0;
            response.data.forEach(item => {
                total += item.totalKilos;
            });

            // Actualizar el estado con el total calculado
            setTotalKilos(total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Buscar entre fechas</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="startDate" className="form-label">Fecha de inicio:</label>
                        <input
                            type="date"
                            id="startDate"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="endDate" className="form-label">Fecha de fin:</label>
                        <input
                            type="date"
                            id="endDate"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="col-auto align-self-end">
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </div>
                </div>
            </form>

            <div className="my-4">
                <h3>Resultados:</h3>
                {resultData.length === 0 ? (
                    <p>No hay resultados</p>
                ) : (
                    <ul className="list-group">
                        {resultData.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{item.nombre}</h5>
                                    <p className="mb-1">Total Kilos: {item.totalKilos}</p>
                                </div>
                                <span className="badge bg-secondary rounded-pill">{item.totalBultos} Bultos</span>
                            </li>
                        ))}
                    </ul>
                )}
                <h4 className="mt-4">TOTAL DE KILOS:</h4>
                <p className="lead">{totalKilos}</p>
                
            </div>
        </div>
    );
};
