package com.damian.backen.usuarios.app.usuariosapp.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Rol;

public interface RolRepositorio extends JpaRepository<Rol,Long> {
    public Optional<Rol> findByNombre(String nombre);
    
}
