import React from 'react'
import '../assets/style/OptionCard.css'
export const OptionCard = ({ title, description }) => {
   
           
  return (
    <div className="option-card">
    <h2>{title}</h2>
    <p>{description}</p>
    <button>Seleccionar</button>
  </div>
  )
}
