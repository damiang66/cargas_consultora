package com.damian.backen.usuarios.app.usuariosapp.service;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.ItemRepository;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.ViajeRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
@Service
public class ViajeServiceImpl implements  ViajeService{
    @Autowired
    private ViajeRepository viajeRepository;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ItemRepository itemRepository;
    @Override
    public List<Viaje> findAll() {
        return viajeRepository.findAll();
    }

    @Override
    public Optional<Viaje> findById(Long id) {
        return viajeRepository.findById(id);
    }

    @Override
    public Viaje save(Viaje viaje) {
        if (viaje.getItems() != null) {
            viaje.getItems().forEach(item -> {
                if (item.getId() != null) {
                    // Si el item ya existe, hay que actualizarlo
                  itemRepository.findAllById(Collections.singleton(item.getId()));
                  itemRepository.save(item);
                } else {
                    // Si es un item nuevo, hay que persistirlo
                itemRepository.save(item);
                }
            });
        }
        return viajeRepository.save(viaje);
    }

    @Override
    public void delete(Long id) {
viajeRepository.deleteById(id);
    }
}
