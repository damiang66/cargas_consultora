package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Fleteros;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.FleterosReposity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FleterosServiceImpl implements FleteroService{
    @Autowired
    private FleterosReposity fleterosReposity;

    @Override
    public List<Fleteros> fleteros() {
        return fleterosReposity.findAll();
    }

    @Override
    public Optional<Fleteros> findbyId(Long id) {
        return fleterosReposity.findById(id);
    }

    @Override
    public Fleteros saveFleteros(Fleteros fleteros) {
        return fleterosReposity.save(fleteros);
    }

    @Override
    public void deleteById(Long id) {
    fleterosReposity.deleteById(id);
    }
}
