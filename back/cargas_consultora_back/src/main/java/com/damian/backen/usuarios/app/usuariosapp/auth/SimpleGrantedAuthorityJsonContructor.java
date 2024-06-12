package com.damian.backen.usuarios.app.usuariosapp.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class SimpleGrantedAuthorityJsonContructor {
    @JsonCreator
   public SimpleGrantedAuthorityJsonContructor(@JsonProperty("authority")String role){

   } 
    
}
