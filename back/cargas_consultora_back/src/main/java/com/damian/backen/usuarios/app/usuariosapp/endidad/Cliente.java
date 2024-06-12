package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long numeroCliente;
    private String nombre;
    private String direccion;
    private String localidad;
    private String provincia;
    private String telefono;
    private String email;

}
