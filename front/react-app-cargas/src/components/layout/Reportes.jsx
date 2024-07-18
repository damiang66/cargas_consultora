import React from 'react'
import { NavLink } from 'react-router-dom'

export const Reportes = () => {
    
  return (
    <>
    <NavLink to={'/reportesViaje'} className='btn btn-primary btn-sm m-2'>Viajes Por fecha</NavLink>
    <NavLink to={'/reportesLiquidacion'}  className='btn btn-primary btn-sm m-2'>Liquidacion Por fecha</NavLink>
    </>
  )
}
