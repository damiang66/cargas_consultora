package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Compra;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ComprasServiceImpl implements CompraService{
    @Autowired
    private CompraRepository compraService;

    @Override
    public List<Compra> findAll() {
        return compraService.findAll();
    }

    @Override
    public Optional<Compra> findById(Long id) {
        return compraService.findById(id);
    }

    @Override
    public Compra save(Compra compra) {
        return compraService.save(compra);
    }

    @Override
    public void deleteById(Long id) {
    compraService.deleteById(id);
    }

    @Override
    public List<Compra> buscarPorFecha(Date inicio, Date fin) {
        return compraService.findByFechaBetween(inicio,fin);
    }
}
