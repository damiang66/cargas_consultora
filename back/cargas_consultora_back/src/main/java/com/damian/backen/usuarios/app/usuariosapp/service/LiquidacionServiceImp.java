package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.GastoRepository;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.LiquidacionRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class LiquidacionServiceImp implements LiquidacionService{
    @Autowired
    private LiquidacionRepositorio liquidacionRepositorio;
    @Autowired
    private GastoRepository gastoRepository;
    @Override
    public List<Liquidacion> findAll() {
        return liquidacionRepositorio.findAll();
    }

    @Override
    public Optional<Liquidacion> finbyId(Long id) {
        return liquidacionRepositorio.findById(id);
    }

    @Override
    public Liquidacion save(Liquidacion liquidacion) {

        if (liquidacion.getGastos() != null) {
            liquidacion.getGastos().forEach(item -> {
                if (item.getId() != null) {
                    // Si el item ya existe, hay que actualizarlo
                    gastoRepository.findAllById(Collections.singleton(item.getId()));
                    gastoRepository.save(item);
                } else {
                    // Si es un item nuevo, hay que persistirlo
                    gastoRepository.save(item);
                }
            });
        }
        return liquidacionRepositorio.save(liquidacion);
    }

    @Override
    public void delete(Long id) {
        liquidacionRepositorio.deleteById(id);
    }

    @Override
    public List<Liquidacion> buscarPorFecha(Date inicio, Date fin) {
        return liquidacionRepositorio.findByFechaBetween(inicio,fin);
    }
}
