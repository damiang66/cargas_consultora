package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.*;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.FleterosReposity;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.ItemRepository;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.RepartoRepository;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.ViajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RepartoServiceImp implements RepartoService {
    @Autowired
    private RepartoRepository repartoRepository;
@Autowired
private FleterosReposity fleterosReposity;
@Autowired
private ViajeRepository viajeRepository;
@Autowired
private ItemRepository itemRepository;

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
        Fleteros fleteros = null;
        List<Item>items = new ArrayList<>();
        Viaje viaje= null;
        Optional<Fleteros>fleterosOptional= fleterosReposity.findById(reparto.getFleteros().getId());
        reparto.setFleteros(fleterosOptional.get());
        Optional<Viaje>viajeOptional = viajeRepository.findById(reparto.getViaje().getId());
        reparto.setViaje(viajeOptional.get());
        reparto.getItems().forEach(c->{
            Optional<Item>optionalItem = null;
            optionalItem = itemRepository.findById(c.getId());
            System.out.println(c.getId());
            items.add(optionalItem.get());
        });
        System.out.println(items);
        reparto.setItems(items);
        return repartoRepository.save(reparto);
    }

    @Override
    public void deleteByid(Long id) {
        repartoRepository.deleteById(id);
    }
}
