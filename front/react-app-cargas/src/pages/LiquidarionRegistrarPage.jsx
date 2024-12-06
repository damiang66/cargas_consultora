import React, { useEffect, useState } from 'react'
import { useLiquidacion } from '../hooks/useLiquidacion';
import { useParams } from 'react-router-dom';
import { LiquidacionForm } from '../components/LiquidacionForm';

export const LiquidarionRegistrarPage = () => {
  const { liquidaciones = [], inicialLiquidacionForm } = useLiquidacion();

  const [liquidacionSeleccionada, setLiquidacionSeleccionada] = useState(inicialLiquidacionForm);

  const { id } = useParams();

  useEffect(() => {
      console.log(id);
      if (id) {
          const liquidacion = liquidaciones.find(u => u.id == id) || inicialLiquidacionForm;
          setLiquidacionSeleccionada(liquidacion);
      }
  }, [id])

  return (
      <div className="container my-4">
          <h4>{ liquidacionSeleccionada.id > 0 ? 'Editar' : 'Registrar'} Liquidacion</h4>
          <div className="row">
              <div className="col">
                  <LiquidacionForm liquidacionSeleccionada={liquidacionSeleccionada} />
              </div>
          </div>
      </div>
  )
}
