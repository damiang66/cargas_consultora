package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface LiquidacionService {
    public List<Liquidacion> findAll();
    public Optional<Liquidacion>finbyId(Long id);
    public Liquidacion save(Liquidacion liquidacion);
    public void delete(Long id);
    public List<Liquidacion>buscarPorFecha(Date inicio, Date fin);
}
