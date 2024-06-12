package com.damian.backen.usuarios.app.usuariosapp.modelo;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class UsuarioRequest {
    
    @NotBlank
    @Size(min = 4,max = 8)
    @Column(unique = true)
    private String username;
    @NotBlank
    @Email
    private String email;
    
}
