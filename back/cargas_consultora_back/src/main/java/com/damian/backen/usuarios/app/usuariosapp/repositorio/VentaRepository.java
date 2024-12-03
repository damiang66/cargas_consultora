package com.damian.backen.usuarios.app.usuariosapp.repositorio;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Venta;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta,Long> {
    List<Venta> findByFechaBetween(Date startDate, Date endDate);
}
