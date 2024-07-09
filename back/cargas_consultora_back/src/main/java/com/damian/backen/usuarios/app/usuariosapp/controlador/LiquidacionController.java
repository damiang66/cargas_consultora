package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.service.LiquidacionService;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/liquidacion")
public class LiquidacionController {
    @Autowired
    private LiquidacionService liquidacionService;
    @Autowired
    private ViajeService viajeService;
    @GetMapping
    public ResponseEntity<?>findAll(){
        return ResponseEntity.ok(liquidacionService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<Liquidacion>liquidacionOptional  = liquidacionService.finbyId(id);
        if(liquidacionOptional.isPresent()){
            return ResponseEntity.ok(liquidacionOptional.get());
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>delete (@PathVariable Long id){
        liquidacionService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<?>save(@RequestBody Liquidacion liquidacion){
        System.out.println("LIQUIDACION"+liquidacion);

        return ResponseEntity.status(HttpStatus.CREATED).body(liquidacionService.save(liquidacion));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>update( @RequestBody Liquidacion liquidacion, BindingResult result, @PathVariable Long id){
        Optional<Liquidacion>liquidacionOptional = liquidacionService.finbyId(id);
        Liquidacion liquidaciondb = null;
        if (liquidacionOptional.isPresent()){
            liquidaciondb = liquidacionOptional.get();
            liquidacionService.delete(liquidaciondb.getId());
            liquidaciondb.setFecha(liquidacion.getFecha());
            liquidaciondb.setGastos(liquidacion.getGastos());
            liquidaciondb.setViaje(liquidacion.getViaje());
            liquidaciondb.setTotalGastos(liquidacion.getTotalGastos());
            liquidaciondb.setPagado(liquidacion.getPagado());
            return ResponseEntity.status(HttpStatus.CREATED).body(liquidacionService.save(liquidaciondb));
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/liquidado")
    public ResponseEntity<?>liquidado(){
        return ResponseEntity.ok().body(viajeService.liquidado());
    }
    @PutMapping("/liquidado/{id}")
    public ResponseEntity<?>liquidar(@PathVariable Long id){
        Optional<Viaje> viajeOptional = viajeService.findById(id);
        Viaje viaje= null;
        if (viajeOptional.isPresent()){
            viaje = viajeOptional.get();
            viaje.setLiquidado(true);
            return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viaje));
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/noLiquidado/{id}")
    public ResponseEntity<?>liquidarNo(@PathVariable Long id){
        Optional<Viaje> viajeOptional = viajeService.findById(id);
        Viaje viaje= null;
        if (viajeOptional.isPresent()){
            viaje = viajeOptional.get();
            viaje.setLiquidado(false);
            return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viaje));
        }
        return ResponseEntity.notFound().build();
    }
}
