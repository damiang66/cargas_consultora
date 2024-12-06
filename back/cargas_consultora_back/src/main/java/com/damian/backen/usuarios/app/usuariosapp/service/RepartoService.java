package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Reparto;

import java.util.List;
import java.util.Optional;

public interface RepartoService {
    List<Reparto> findAll();
    Optional<Reparto>findById(Long id);
    Reparto save(Reparto reparto);
    void deleteByid(Long id);

}
