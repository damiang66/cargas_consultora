package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;

import java.util.List;
import java.util.Optional;

public interface ViajeService {
    public List<Viaje>findAll();
    public List<Viaje>liquidado();
    public Optional<Viaje>findById(Long id);
    public Viaje save(Viaje viaje);
    public void delete(Long id);
}
