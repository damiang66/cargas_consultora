package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "compras")
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date fecha;
    private String cuit;
    private String nombre;
    private String nroFactura;
    private Double subTotal;
    private Double iva;
    private Double otro;
    private Double total;
}
