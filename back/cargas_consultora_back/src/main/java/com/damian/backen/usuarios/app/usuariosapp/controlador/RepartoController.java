package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.*;
import com.damian.backen.usuarios.app.usuariosapp.service.RepartoService;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/reparto")
public class RepartoController {
    @Autowired
    RepartoService repartoService;
    @Autowired
    ViajeService viajeService;
    private ResponseEntity<?>validar(BindingResult result){
        Map<String,Object>errores = new HashMap<>();
        result.getFieldErrors().forEach(e->{
            errores.put(e.getField(),"El campo " + e.getField() + " " +  e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);


        }
    @GetMapping
    public ResponseEntity<?>findAll(){
        return ResponseEntity.ok(repartoService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<Reparto>optionalReparto = repartoService.findById(id);
        if(optionalReparto.isPresent()){
            return ResponseEntity.ok(optionalReparto.get());
        }
        return  ResponseEntity.notFound().build();
    }
    @PostMapping
    public ResponseEntity<?>save(@Valid @RequestBody Reparto reparto,BindingResult result){
        System.out.println(reparto);
        if (result.hasErrors()){
            return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repartoService.save(reparto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>update(@Valid @RequestBody Reparto reparto,BindingResult result,@PathVariable Long id){
        Optional<Reparto>optionalReparto = repartoService.findById(id);
        if(optionalReparto.isPresent()){
            Reparto repartoDb = null;
            repartoDb = optionalReparto.get();
            repartoDb.setItems(reparto.getItems());
            repartoDb.setDescripcion(reparto.getDescripcion());
         //   repartoDb.setEstado(reparto.getEstado());
            repartoDb.setFleteros(reparto.getFleteros());
            repartoDb.setFecha(reparto.getFecha());
            repartoDb.setPagado(reparto.getPagado());
            repartoDb.setViaje(reparto.getViaje());
            repartoDb.setPrecio(reparto.getPrecio());
            return ResponseEntity.status(HttpStatus.CREATED).body(repartoService.save(repartoDb));

        }
        return  ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id){
        Optional<Reparto>optionalReparto = repartoService.findById(id);
        if(optionalReparto.isPresent()){
            repartoService.deleteByid(id);
            return ResponseEntity.ok().build();
        }
        return  ResponseEntity.notFound().build();
    }
    /*
    aca mando la lista de clientes que tiene el viaje seleccionado
     */
    @GetMapping("/clientes-viajes/{id}")
        public ResponseEntity<?>clientesViajes(@PathVariable Long id){
          Optional<Viaje>optionalViaje = viajeService.findById(id);
        List<Item>items = new ArrayList<>();
          if (optionalViaje.isPresent()){
              Viaje viaje = optionalViaje.get();


             items = viaje.getItems();
              return ResponseEntity.ok(items);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/reparto-viaje/{id}")
    public ResponseEntity<?>repartoViaje(@PathVariable Long id){
        List<Reparto> repartos = new ArrayList<>();
        List<Reparto>repartosViaje = new ArrayList<>();
        repartos = repartoService.findAll();
        repartos.forEach(r->{
            if(r.getViaje().getNumeroViaje() == id){
                repartosViaje.add(r);
            }
        });
        return ResponseEntity.ok(repartosViaje);
    }
    @PostMapping("/pdf")
    public ResponseEntity<String> receiveRepartos(@RequestBody RepartoDto repartoDTO) {
        // Lógica para manejar los datos recibidos
        System.out.println("Datos recibidos: " + repartoDTO);

        // Por ejemplo, podrías guardarlos en la base de datos aquí

        return ResponseEntity.ok("Datos recibidos con éxito");
    }

}

