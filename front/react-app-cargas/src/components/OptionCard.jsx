
import React, { useState } from 'react'
import '../assets/style/OptionCard.css'
import { useNavigate } from 'react-router-dom'
export const OptionCard = ({ title, description, onClick,titulo }) => {
  const[tipo,setTipo]=useState("")
  const[facturacion,setFacturacion]=useState("")
  const navigate = useNavigate();
  const handleOptionClick = (tipo) => {
    navigate(`/facturacion/${tipo}`);
  };
           
  return (


    <div className="option-card">
    <h2>{titulo}</h2>
    <p hidden>{title}</p>
    <p>{description}</p>
    <button  onClick={() => handleOptionClick(title)}>Seleccionar</button>
  </div>
  )
}
