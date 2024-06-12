package com.damian.backen.usuarios.app.usuariosapp.service;

import java.util.List;
import java.util.Optional;

import com.damian.backen.usuarios.app.usuariosapp.dto.UsuarioDto;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Usuario;

public interface UsuarioService {
    public List<UsuarioDto> findAll();
    public Optional<UsuarioDto>findById(Long id);
    public UsuarioDto save (Usuario usuario);
    public void delete(Long id);
}
