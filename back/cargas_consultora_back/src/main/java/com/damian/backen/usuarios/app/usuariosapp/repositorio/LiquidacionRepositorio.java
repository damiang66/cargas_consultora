package com.damian.backen.usuarios.app.usuariosapp.repositorio;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface LiquidacionRepositorio extends JpaRepository<Liquidacion,Long> {
    List<Liquidacion> findByFechaBetween(Date startDate, Date endDate);
}
