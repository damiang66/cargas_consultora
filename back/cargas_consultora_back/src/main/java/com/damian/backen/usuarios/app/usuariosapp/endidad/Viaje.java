package com.damian.backen.usuarios.app.usuariosapp.endidad;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "viajes")
public class Viaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Item> items;
    private Integer totalBultos;
    private Double totalKilos;
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
