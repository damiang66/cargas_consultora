import React, { useEffect, useState } from 'react';
import { useViajes } from '../hooks/useViajes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import Swal from 'sweetalert2';
import { viajeExport } from '../services/viajeService';
import { InputText } from 'primereact/inputtext';

export const ViajeList = ({ lista }) => {
  const { viajes, getViajes, handlerRemoveViaje } = useViajes();
  const [buscador, setBuscador] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  useEffect(() => {
    getViajes();
  }, []);

  useEffect(() => {
    if (lista.length === 0) {
      setBuscador(viajes);
    } else {
      setBuscador(lista);
    }
  }, [lista, viajes]);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      const filteredViajes = viajes.filter(viaje => {
        const fecha = new Date(viaje.fecha);
        return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
      });
      setBuscador(filteredViajes);
    }
  }, [fechaInicio, fechaFin, viajes]);

  const editar = (rowData) => {
    return (
      <NavLink className="btn btn-primary" to={`/viajes/editar/` + rowData.id}>
        Editar
      </NavLink>
    );
  };

  const remove = (rowData) => {
    return (
      <button className="btn btn-danger" onClick={() => handlerRemoveViaje(rowData.id)}>
        Eliminar
      </button>
    );
  };

  const imprimir = (rowData) => {
    return (
      <button className="btn btn-success" onClick={() => pdfImprimir(rowData.id)}>
        Imprimir
      </button>
    );
  };

  const excel = (rowData) => {
    return (
      <button className="btn btn-success" onClick={() => excelImprimir(rowData.id)}>
        Exportar
      </button>
    );
  };

  const pdfImprimir = async (id) => {
    try {
      const respuesta = await pdfViajes(id);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  const excelImprimir = async (id) => {
    try {
      const respuesta = await ExcelViajes(id);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  // Función para enviar los datos filtrados al backend como JSON
  const enviarDatosAlBackend = async () => {
    // Filtrar los datos visibles en la tabla (buscador contiene los viajes filtrados)
    const datosFiltrados = buscador.map(viaje => ({
      fecha: viaje.fecha,                          // Fecha del viaje
      numeroViaje: viaje.numeroViaje,              // Número de viaje
      items: viaje.items.map(item => ({
        cliente:item.cliente,
        bultos: item.bultos,                       // Bultos del item
        kilos: item.kilos                          // Kilos del item
      })), 
      totalBultos: viaje.totalBultos,              // Total de bultos
      diferenciaKilos: viaje.diferenciaKilos || 0,  // Diferencia de kilos (si está disponible)
      totalKilos: viaje.totalKilos,                // Total de kilos
      liquidado: viaje.liquidado                   // Estado de liquidación
    }));

    const data = {
      viajes: datosFiltrados,  // Solo los datos visibles en la tabla
    };
    try {
      const respuesta = await viajeExport(data);
      Swal.fire('Exportación exitosa', 'Los archivos se han exportado correctamente', 'success');
    } catch (error) {
      console.error('Error exporting files:', error);
      Swal.fire('Error en la exportación', 'Hubo un problema al exportar los archivos', 'error');
    }
  };

  const onFilter = (e) => {
    const { field, value } = e.target;
    let newBuscador = [...viajes];
    if (value) {
      newBuscador = newBuscador.filter((item) => {
        if (item[field] !== null && item[field] !== undefined) {
          return item[field].toString().toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    }
    setBuscador(newBuscador);
  };

  return (
    <>
      <div className="p-inputgroup" style={{ marginBottom: '1em' }}>
        <span className="p-inputgroup-addon">Filtrar por Fecha Inicio</span>
        <Calendar
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.value)}
          dateFormat="dd/mm/yy"
          placeholder="Fecha Inicio"
        />
      </div>
      <div className="p-inputgroup" style={{ marginBottom: '1em' }}>
        <span className="p-inputgroup-addon">Filtrar por Fecha Fin</span>
        <Calendar
          value={fechaFin}
          onChange={(e) => setFechaFin(e.value)}
          dateFormat="dd/mm/yy"
          placeholder="Fecha Fin"
        />
      </div>

      <DataTable value={buscador} tableStyle={{ minWidth: '50rem' }} paginator rows={10}>
        <Column field="numeroViaje" header="Numero Viaje" filter filterElement={<InputText type="search" onInput={(e) => onFilter({ target: { field: 'numeroViaje', value: e.target.value } })} />} />
        <Column field="fecha" header="Fecha" filter filterElement={<InputText type="search" onInput={(e) => onFilter({ target: { field: 'fecha', value: e.target.value } })} />} />
        <Column field="totalBultos" header="Total Bultos" filter filterElement={<InputText type="search" onInput={(e) => onFilter({ target: { field: 'totalBultos', value: e.target.value } })} />} />
        <Column field="totalKilos" header="Total Kilos" filter filterElement={<InputText type="search" onInput={(e) => onFilter({ target: { field: 'totalKilos', value: e.target.value } })} />} />
        <Column body={editar} header="Editar" />
        <Column body={remove} header="Eliminar" />
        <Column body={imprimir} header="Imprimir" />
        <Column body={excel} header="Exportar" />
      </DataTable>

      {/* Botón para enviar los datos filtrados al backend */}
      <button className="btn btn-primary" onClick={enviarDatosAlBackend}>
        Imprimir
      </button>
    </>
  );
};
