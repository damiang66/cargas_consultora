import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLiquidacion } from '../hooks/useLiquidacion';
import { LiquidacionList } from '../components/LiquidacionList';
import { useAuth } from '../auth/hooks/useAuth';

export const LiquidacionPage = () => {
    const {
        liquidaciones,
        visibleForm,
        handlerOpenForm,
        getLiquidaciones,
    } = useLiquidacion();
    const navegar = useNavigate()
    const abrirFormulario = ()=>{
        navegar('/liquidaciones/registrar')
    }

    const { login } = useAuth();;

    useEffect(() => {
        getLiquidaciones();
        console.log(liquidaciones);
    }, []);
    
    return (
        <>

            <div className="container my-4">
                <h2>Seccion Liquidaciones</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={abrirFormulario}>
                            Cargar Liquidacion
                        </button>}

                        {
                            liquidaciones.length === 0
                                ? <div className="alert alert-warning">No hay liquidaciones en el sistema!</div>
                                : <LiquidacionList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
