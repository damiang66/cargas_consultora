package com.damian.backen.usuarios.app.usuariosapp.service;



import com.damian.backen.usuarios.app.usuariosapp.endidad.Venta;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VentaService {
    List<Venta> findAll();
    Optional<Venta> findById(Long id);
    Venta save(Venta compra);
    void deleteById(Long id);
    List<Venta>buscarPorFecha(Date inicio,Date fin);
}
