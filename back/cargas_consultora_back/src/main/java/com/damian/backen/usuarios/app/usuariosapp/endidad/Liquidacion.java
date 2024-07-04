package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "liquidaciones")
public class Liquidacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Viaje viaje;
    @Temporal(TemporalType.DATE)
    private Date fecha;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Gasto> gastos;
    private Double TotalGastos;
    private Boolean pagado=false;
    private Double iva;
    private Double Total;

}
