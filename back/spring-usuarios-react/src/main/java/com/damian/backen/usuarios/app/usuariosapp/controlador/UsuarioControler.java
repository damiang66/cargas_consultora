package com.damian.backen.usuarios.app.usuariosapp.controlador;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.damian.backen.usuarios.app.usuariosapp.dto.UsuarioDto;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Usuario;
import com.damian.backen.usuarios.app.usuariosapp.modelo.UsuarioRequest;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.UsuarioRepositorio;
import com.damian.backen.usuarios.app.usuariosapp.service.UsuarioService;

import jakarta.validation.Valid;
@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioControler {
    @Autowired
    private UsuarioRepositorio repositorio;
    @Autowired
    private UsuarioService service;
    private ResponseEntity<?>validar(BindingResult result){
        Map<String,Object> errores = new HashMap<>();
        result.getFieldErrors().forEach(e->{
            errores.put(e.getField(), "el campo "+ e.getField()+ "  "+ e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
    @GetMapping
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok().body(service.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<UsuarioDto> r = service.findById(id);
        if(r.isPresent()){
           return ResponseEntity.ok().body(r.get());
        }
        return ResponseEntity.notFound().build();

    }
    @PostMapping
    public ResponseEntity<?>save (@Valid@RequestBody Usuario usuario, BindingResult result){
        if(result.hasErrors()){
            return this.validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(usuario));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?>editar(@Valid @RequestBody UsuarioRequest usuario, BindingResult result,@PathVariable Long id){
        if (result.hasErrors()){
            return this.validar(result);
        }
        Optional<Usuario> r = repositorio.findById(id);
        if (r.isPresent()){
            Usuario usuarioDb = r.get();
            usuarioDb.setUsername(usuario.getUsername());
            usuarioDb.setEmail(usuario.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(usuarioDb));
        }
        return ResponseEntity.notFound().build();

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<UsuarioDto> r = service.findById(id);
        
        if (r.isPresent()){
            service.delete(id);
            return ResponseEntity.noContent().build(); //204
        }
        return ResponseEntity.notFound().build(); //404
    }

    
}
