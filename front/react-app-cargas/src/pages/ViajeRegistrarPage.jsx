import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useViajes } from '../hooks/useViajes';
import { ViajeForm } from '../components/ViajeForm';

export const ViajeRegistrarPage = () => {
    const { viajes = [], inicialViajeForm } = useViajes();

    const [viajeSeleccionado, setViajeSeleccionado] = useState(inicialViajeForm);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const viaje = viajes.find(u => u.id == id) || inicialViajeForm;
            setViajeSeleccionado(viaje);
        }
    }, [id])

    return (
        <div className="container my-4">
            <h4>{ viajeSeleccionado.id > 0 ? 'Editar' : 'Registrar'} Viaje</h4>
            <div className="row">
                <div className="col">
                    <ViajeForm viajeSeleccionado={viajeSeleccionado} />
                </div>
            </div>
        </div>
    )
}

