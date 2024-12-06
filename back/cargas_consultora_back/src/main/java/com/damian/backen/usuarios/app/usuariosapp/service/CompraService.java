package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Compra;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface CompraService {
    List<Compra>findAll();
    Optional<Compra>findById(Long id);
    Compra save(Compra compra);
    void deleteById(Long id);
    List<Compra>buscarPorFecha(Date inicio, Date fin);
}
