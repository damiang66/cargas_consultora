package com.damian.backen.usuarios.app.usuariosapp.repositorio;


import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ViajeRepository extends JpaRepository<Viaje,Long> {
    @Query("select v from Viaje v where liquidado=true ")
    public List<Viaje> liquidado();
    List<Viaje> findByFechaBetween(Date startDate, Date endDate);
    public List<Viaje> findByNumeroViaje(Long numeroViaje);
}
