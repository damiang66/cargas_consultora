import axios from 'axios';
import React, { useState } from 'react';

export const ReportesLiquidacion = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [resultData, setResultData] = useState([]);
    const [total, setTotal] = useState(0.0);

    const handleSearch = async () => {
        const BASE_URL = 'http://localhost:8080/liquidacion';
        try {
            const response = await axios.get(`${BASE_URL}/buscar?startDate=${startDate}&endDate=${endDate}`);
            setResultData(response.data);

            // Calcular el total sumando los valores de 'total' de cada item en resultData
            let sum = 0.0;
            response.data.forEach(item => {
                sum += item.total;
            });

            // Actualizar el estado con el total calculado
            setTotal(sum);
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
                                    <h5 className="mb-1">NUMERO DE VIAJE : {item.viaje.numeroViaje}</h5>
                                    <p className="mb-1">Importe Total: {item.total}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {resultData.length > 0 && (
                    <div className="mt-4">
                        <h4>TOTAL:</h4>
                        <p className="lead">{total}</p>
                    </div>
                )}
            </div>
        </div>
    );
};