package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Reparto;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.RepartoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepartoServiceImp implements RepartoService {
    @Autowired
    private RepartoRepository repartoRepository;

    @Override
    public List<Reparto> findAll() {
        return repartoRepository.findAll();
    }

    @Override
    public Optional<Reparto> findById(Long id) {
        return repartoRepository.findById(id);
    }

    @Override
    public Reparto save(Reparto reparto) {
        return repartoRepository.save(reparto);
    }

    @Override
    public void deleteByid(Long id) {
        repartoRepository.deleteById(id);
    }
}
