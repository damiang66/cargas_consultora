import React, { useState } from 'react'
import '../assets/style/OptionCard.css'
import { useNavigate } from 'react-router-dom'
export const OptionCard = ({ title, description, onClick }) => {
  const[tipo,setTipo]=useState("")
  const[facturacion,setFacturacion]=useState("")
  const navigate = useNavigate();
  const handleOptionClick = (tipo) => {
    navigate(`/facturacion/${tipo}`);
  };
           
  return (


    <div className="option-card">
    <h2>{title}</h2>
    <p>{description}</p>
    <button  onClick={() => handleOptionClick(title)}>Seleccionar</button>
  </div>
  )
}
