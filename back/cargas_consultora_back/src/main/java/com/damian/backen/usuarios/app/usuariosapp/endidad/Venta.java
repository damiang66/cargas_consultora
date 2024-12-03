package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "ventas")
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cuit;
    @Temporal(TemporalType.DATE)
    private Date fecha;
    private String nombre;
    private String nroFactura;
    private Double subTotal;
    private Double iva;
    private Double otro;
    private Double total;
}
