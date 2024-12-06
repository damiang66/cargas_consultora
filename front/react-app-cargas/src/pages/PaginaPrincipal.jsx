import React from 'react';
import { Button } from 'primereact/button';
import { usePrincipal } from '../hooks/usePrincipal';



export const PaginaPrincipal = () => {
  const { onAmdm, onPotigian } = usePrincipal();

  return (
    <>
    <div className="container">
      <h1>Cargas Consultora</h1>
      <Button label="Potigian" icon="pi pi-check" iconPos="right" onClick={onPotigian} style={{margin:'10px'}} />
      <Button label="AMDM" icon="pi pi-check" onClick={onAmdm} iconPos="right" style={{margin:'10px'}}  />
      </div>
    </>
  );
}
