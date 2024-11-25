package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Fleteros;

import java.util.List;
import java.util.Optional;

public interface FleteroService {
    List<Fleteros> fleteros ();
    Optional<Fleteros>findbyId(Long id);
    Fleteros saveFleteros(Fleteros fleteros);
    void deleteById(Long id);
}
