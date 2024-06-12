package com.damian.backen.usuarios.app.usuariosapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.damian.backen.usuarios.app.usuariosapp.dto.UsuarioDto;
import com.damian.backen.usuarios.app.usuariosapp.dto.mapper.DtoMapperUsuario;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Rol;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Usuario;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.RolRepositorio;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServiceImpl implements UsuarioService {
   @Autowired
   private UsuarioRepositorio repositorio;
   @Autowired
   private PasswordEncoder passwordEncoder;
   @Autowired
   private RolRepositorio rolRepositio;

   @Override
   public List<UsuarioDto> findAll() {
      // return DtoMapperUsuario.getInstance().s repositorio.findAll();

      List<Usuario> usuarios = repositorio.findAll();

      return usuarios.stream().map(u->  DtoMapperUsuario.getInstance().setUsuario(u).build())
      .collect(Collectors.toList());
   }

   @Override
   public Optional<UsuarioDto> findById(Long id) {
      return repositorio.findById(id).map(u->DtoMapperUsuario
      .getInstance()
      .setUsuario(u)
      .build());
      

   }

   @Override
   public UsuarioDto save(Usuario usuario) {
      String passwordBc = passwordEncoder.encode(usuario.getPassword());
      usuario.setPassword(passwordBc);
      Optional<Rol> o = rolRepositio.findByNombre("ROLE_USER");
      List<Rol> roles = new ArrayList();
      if (o.isPresent()) {
         roles.add(o.get());
      }
      usuario.setRoles(roles);

      return DtoMapperUsuario.getInstance().setUsuario(repositorio.save(usuario)).build();
   }

   @Override
   public void delete(Long id) {
      repositorio.deleteById(id);
   }

}
