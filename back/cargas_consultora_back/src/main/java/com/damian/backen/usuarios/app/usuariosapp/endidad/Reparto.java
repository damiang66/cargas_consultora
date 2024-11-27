package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "repartos")
public class Reparto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    @ManyToOne(cascade = CascadeType.ALL)
    private Viaje viaje;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Cliente> clientes;
    private String estado;
    @ManyToOne(cascade = CascadeType.ALL)
    private Fleteros fleteros;
    private Boolean pagado;
    @Temporal(TemporalType.DATE)
    private Date fecha;
    private Double precio;



}
