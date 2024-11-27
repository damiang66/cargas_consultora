package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Cliente;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Reparto;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
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
        if (result.hasErrors()){
            return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(reparto);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>update(@Valid @RequestBody Reparto reparto,BindingResult result,@PathVariable Long id){
        Optional<Reparto>optionalReparto = repartoService.findById(id);
        if(optionalReparto.isPresent()){
            Reparto repartoDb = null;
            repartoDb = optionalReparto.get();
            repartoDb.setClientes(reparto.getClientes());
            repartoDb.setDescripcion(reparto.getDescripcion());
            repartoDb.setEstado(reparto.getEstado());
            repartoDb.setFleteros(reparto.getFleteros());
            repartoDb.setFecha(reparto.getFecha());
            repartoDb.setPagado(reparto.getPagado());
            repartoDb.setViaje(reparto.getViaje());
            return ResponseEntity.status(HttpStatus.CREATED).body(repartoDb);

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
        List<Cliente>clientes = new ArrayList<>();
          if (optionalViaje.isPresent()){
              Viaje viaje = optionalViaje.get();


             viaje.getItems().forEach(c->{
                  clientes.add(c.getCliente());
              });
              return ResponseEntity.ok(clientes);
        }
        return ResponseEntity.notFound().build();
    }
}
