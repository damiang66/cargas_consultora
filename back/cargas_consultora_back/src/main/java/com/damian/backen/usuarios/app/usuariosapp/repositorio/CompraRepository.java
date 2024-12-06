package com.damian.backen.usuarios.app.usuariosapp.repositorio;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Compra;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CompraRepository extends JpaRepository<Compra,Long> {
    List<Compra> findByFechaBetween(Date startDate, Date endDate);
}
