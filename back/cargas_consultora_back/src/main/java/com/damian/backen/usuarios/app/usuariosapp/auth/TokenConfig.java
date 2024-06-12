package com.damian.backen.usuarios.app.usuariosapp.auth;

import java.security.Key;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class TokenConfig {
  //  public final static String SECRET_KEY="algun-token-con-alguna-frase-secreta";
    public final static Key SECRET_KEY=Keys.secretKeyFor(SignatureAlgorithm.HS256); 
    public final static String PREFIX_TOKEN="Bearer ";
    public final static String HEADER_AUTHORIZATION="Authorization";
     
}
