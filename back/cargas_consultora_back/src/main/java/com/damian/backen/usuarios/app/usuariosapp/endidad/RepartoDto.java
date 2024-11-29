package com.damian.backen.usuarios.app.usuariosapp.endidad;

import java.util.Date;
import java.util.List;

public class RepartoDto {
    private List<Reparto> filteredRepartos;
    private double totalImporte;

    // Getters y Setters para RepartoDto
    public List<Reparto> getFilteredRepartos() {
        return filteredRepartos;
    }

    public void setFilteredRepartos(List<Reparto> filteredRepartos) {
        this.filteredRepartos = filteredRepartos;
    }

    public double getTotalImporte() {
        return totalImporte;
    }

    public void setTotalImporte(double totalImporte) {
        this.totalImporte = totalImporte;
    }

    public static class Reparto {
        private Long id;
        private String descripcion;
        private Viaje viaje;
        private Date fecha;
        private Fletero fleteros;  // Cambié de fletero a fleteros
        private double precio;
        private List<Item> items;

        // Getters y Setters para Reparto
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getDescripcion() {
            return descripcion;
        }

        public void setDescripcion(String descripcion) {
            this.descripcion = descripcion;
        }

        public Viaje getViaje() {
            return viaje;
        }

        public void setViaje(Viaje viaje) {
            this.viaje = viaje;
        }

        public Date getFecha() {
            return fecha;
        }

        public void setFecha(Date fecha) {
            this.fecha = fecha;
        }

        public Fletero getFleteros() {  // Cambié el nombre de fletero a fleteros
            return fleteros;
        }

        public void setFleteros(Fletero fleteros) {  // Cambié el nombre de fletero a fleteros
            this.fleteros = fleteros;
        }

        public double getPrecio() {
            return precio;
        }

        public void setPrecio(double precio) {
            this.precio = precio;
        }

        public List<Item> getItems() {
            return items;
        }

        public void setItems(List<Item> items) {
            this.items = items;
        }
    }

    public static class Viaje {
        private Long id;
        private int numeroViaje;

        // Getters y Setters para Viaje
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public int getNumeroViaje() {
            return numeroViaje;
        }

        public void setNumeroViaje(int numeroViaje) {
            this.numeroViaje = numeroViaje;
        }
    }

    public static class Fletero {
        private Long id;
        private String nombre;
        private double precioPorKilometros;
        private double precioPorDia;

        // Getters y Setters para Fletero
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public double getPrecioPorKilometros() {
            return precioPorKilometros;
        }

        public void setPrecioPorKilometros(double precioPorKilometros) {
            this.precioPorKilometros = precioPorKilometros;
        }

        public double getPrecioPorDia() {
            return precioPorDia;
        }

        public void setPrecioPorDia(double precioPorDia) {
            this.precioPorDia = precioPorDia;
        }
    }

    public static class Item {
        private Long id;
        private Cliente cliente;
        private int bultos;
        private double kilos;

        // Getters y Setters para Item
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Cliente getCliente() {
            return cliente;
        }

        public void setCliente(Cliente cliente) {
            this.cliente = cliente;
        }

        public int getBultos() {
            return bultos;
        }

        public void setBultos(int bultos) {
            this.bultos = bultos;
        }

        public double getKilos() {
            return kilos;
        }

        public void setKilos(double kilos) {
            this.kilos = kilos;
        }
    }

    public static class Cliente {
        private Long id;
        private int numeroCliente;
        private String nombre;

        // Getters y Setters para Cliente
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public int getNumeroCliente() {
            return numeroCliente;
        }

        public void setNumeroCliente(int numeroCliente) {
            this.numeroCliente = numeroCliente;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }
    }
}
