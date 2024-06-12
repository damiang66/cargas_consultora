package com.damian.backen.usuarios.app.usuariosapp.service;


import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Usuario;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.UsuarioRepositorio;
@Service
public class JpaUserDetailsService implements UserDetailsService {
    @Autowired 
    private UsuarioRepositorio repositorio;

    @Override
    @Transactional(readOnly=true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> r = repositorio.findByUsername(username);
        Usuario usuario = null;
        if (r.isPresent()){
        usuario=r.get();
     //   List<GrantedAuthority> authorities= new ArrayList<>();
     //   authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
     List<GrantedAuthority> authorities=usuario.getRoles()
     .stream()
     . map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
     .collect(Collectors.toList());
    
     
        return new User(usuario.getUsername(),
        usuario.getPassword(),
        true,
        true,
        true
        ,true
        ,authorities);
    }   
    throw new UsernameNotFoundException(String.format("Username %s no existe en el sistema", username));
        }
     //   if(!username.equals("admin")){
     //       throw new UsernameNotFoundException("Username no exite en el sistema");
     //   }
       
   
}
