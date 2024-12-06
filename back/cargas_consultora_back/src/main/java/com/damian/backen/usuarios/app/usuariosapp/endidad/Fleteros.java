package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "fleteros")
public class Fleteros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precioPorKilometros;
    private Double precioPorDia;
}
