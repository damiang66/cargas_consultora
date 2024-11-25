package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Fleteros;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.FleterosReposity;
import com.damian.backen.usuarios.app.usuariosapp.service.FleteroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/fleteros")
public class FleteroControlador {
    @Autowired
    private FleteroService fleteroService;
    private ResponseEntity<?>validar(BindingResult result){
        Map<String,Object>errores = new HashMap<>();
        result.getFieldErrors().forEach(e->{
            errores.put(e.getField(),"El campo :" + e.getField() + " " + e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
    @GetMapping()
    public ResponseEntity<?>findAll(){
        return ResponseEntity.ok(fleteroService.fleteros());

    }
    @GetMapping("{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<Fleteros>fleterosOptional = fleteroService.findbyId(id);

        if(fleterosOptional.isPresent()){
            return ResponseEntity.ok(fleterosOptional.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping
    public ResponseEntity<?>saveFleteros(@Valid @RequestBody Fleteros fleteros,BindingResult result){
        if (result.hasErrors()){
            return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(fleteroService.saveFleteros(fleteros));
    }
    @PutMapping("{id}")
    public ResponseEntity<?>updateFleteros(@Valid @RequestBody Fleteros fleteros,BindingResult result,@PathVariable Long id){
        if (result.hasErrors()){
            return validar(result);
        }
        Optional<Fleteros>fleterosOptional = fleteroService.findbyId(id);

        if(fleterosOptional.isPresent()){
            Fleteros fleterosDb = null;
            fleterosDb = fleterosOptional.get();
            fleterosDb.setDescripcion(fleteros.getDescripcion());
            fleterosDb.setNombre(fleteros.getNombre());
            fleterosDb.setPrecioPorDia(fleteros.getPrecioPorDia());
            fleterosDb.setPrecioPorKilometros(fleteros.getPrecioPorKilometros());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(fleteroService.saveFleteros(fleterosDb));
        }
        return ResponseEntity.notFound().build();

    }
}
