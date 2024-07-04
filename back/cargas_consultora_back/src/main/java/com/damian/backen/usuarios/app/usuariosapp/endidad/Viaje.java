package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "viajes")
public class Viaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date fecha;
    private Long numeroViaje;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Item> items;
    private Integer totalBultos;
    private Double totalKilos;
    private Boolean liquidado = false;
    public void addItem(Item item){
        this.items.add(item);
    }
    public void totales(){
        items.forEach(i->{
            this.totalBultos +=i.getBultos();
            this.totalKilos += i.getKilos();
        });
    }
}
