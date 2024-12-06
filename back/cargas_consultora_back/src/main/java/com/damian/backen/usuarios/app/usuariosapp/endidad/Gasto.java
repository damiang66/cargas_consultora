package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
@Table(name = "gastos")
public class Gasto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String concepto;

    private Double importe;


}
