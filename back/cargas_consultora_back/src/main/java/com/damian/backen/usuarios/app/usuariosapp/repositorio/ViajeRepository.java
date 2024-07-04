package com.damian.backen.usuarios.app.usuariosapp.repositorio;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViajeRepository extends JpaRepository<Viaje,Long> {
    @Query("select v from Viaje v where liquidado=true ")
    public List<Viaje> liquidado();
}
