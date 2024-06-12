package com.damian.backen.usuarios.app.usuariosapp.dto.mapper;

import com.damian.backen.usuarios.app.usuariosapp.dto.UsuarioDto;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Usuario;

public class DtoMapperUsuario {

    private Usuario usuario;
    private DtoMapperUsuario(){

    }
    public static DtoMapperUsuario getInstance(){
       return new DtoMapperUsuario();
       
    }

    

    

    /**
     * @param usuario the usuario to set
     */
    public DtoMapperUsuario setUsuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }
    public UsuarioDto build(){
        if(usuario ==null){
            throw new RuntimeException("Debe pasar la entidad usuario");

        }
        return  new UsuarioDto(this.usuario.getId(),this.usuario.getUsername(),this.usuario.getEmail());
    }

}
