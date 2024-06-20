package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Cliente;
import com.damian.backen.usuarios.app.usuariosapp.service.ClienteService;
import com.damian.backen.usuarios.app.usuariosapp.service.ClienteServiceImpl;
import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Timer;
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
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;
    private ResponseEntity<?>validar (BindingResult result){
        Map<String,Object> errores = new HashMap<>();
        result.getFieldErrors().forEach(e->{
            errores.put(e.getField(),"El campo " + e.getField() + " " +  e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
    @GetMapping
    public ResponseEntity<?>findAll (){
        return ResponseEntity.ok(clienteService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<Cliente>clienteOptional = clienteService.findById(id);
        if (clienteOptional.isPresent()){
            return ResponseEntity.ok(clienteOptional.get());
        }
        return  ResponseEntity.notFound().build();
    }
    @GetMapping("/numero/{nroCliente}")
    public ResponseEntity<?>findByNumeroCliente(@PathVariable Long nroCliente){
        Optional<Cliente>clienteOptional = clienteService.findByNroCliente(nroCliente);
        if (clienteOptional.isPresent()){
            return ResponseEntity.ok(clienteOptional.get());
        }
        return  ResponseEntity.notFound().build();
    }
    @PostMapping
    public ResponseEntity<?>save (@Valid @RequestBody Cliente cliente, BindingResult result){
       if (result.hasErrors()){
           return validar(result);
    }
       return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(cliente));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>update (@Valid @RequestBody Cliente cliente,BindingResult result, @PathVariable Long id){
        if (result.hasErrors()){
            return  validar(result);
        }
        Cliente clienteDB = null;
        Optional<Cliente>clienteOptional = clienteService.findById(id);
        if (clienteOptional.isPresent()){
            clienteDB = clienteOptional.get();
            clienteDB.setNombre(cliente.getNombre());
            clienteDB.setNumeroCliente(cliente.getNumeroCliente());
            clienteDB.setTelefono(cliente.getTelefono());
            clienteDB.setDireccion(cliente.getDireccion());
            clienteDB.setLocalidad(cliente.getLocalidad());
            clienteDB.setProvincia(cliente.getProvincia());
            clienteDB.setEmail(cliente.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(clienteDB));


        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>delete (@PathVariable Long id){
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
