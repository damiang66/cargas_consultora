package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/viajes")
public class ViajeController {
    @Autowired
    private ViajeService viajeService;
    private ResponseEntity<?>validar(BindingResult result){
        Map<String,Object>errores = new HashMap<>();
        result.getFieldErrors().forEach(e->{
            errores.put(e.getField(), "El campo " + e.getField() + " " + e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
    @GetMapping
    public ResponseEntity<?>findAll (){
        return ResponseEntity.ok(viajeService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<Viaje>viajeOptional = viajeService.findById(id);
        if (viajeOptional.isPresent()){
            return ResponseEntity.ok(viajeOptional.get());
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id){
        viajeService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<?>save (@Valid @RequestBody  Viaje viaje,BindingResult result){
        viaje.setTotalKilos(0.0);
        viaje.setTotalBultos(0);
        if(result.hasErrors()){
            return validar(result);
        }
        viaje.totales();
        return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viaje));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>update(@Valid @RequestBody  Viaje viaje,BindingResult result,@PathVariable Long id){
        Optional<Viaje>viajeOptional = viajeService.findById(id);
        Viaje viajeDb = null;
        if (viajeOptional.isPresent()){
           viajeDb = viajeOptional.get();
           viajeService.delete(viajeDb.getId());
           viajeDb.setNumeroViaje(viaje.getNumeroViaje());
           viajeDb.setFecha(viaje.getFecha());
           viajeDb.setItems(viaje.getItems());
           viajeDb.setTotalBultos(viaje.getTotalBultos());
           viajeDb.setTotalKilos(viaje.getTotalKilos());
           return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viajeDb));
        }
        return ResponseEntity.notFound().build();
    }
    }


