package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Item;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.ItemRepository;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/viajes")
public class ViajeController {
    @Autowired
    private ViajeService viajeService;
    @Autowired
    private ItemRepository itemRepository;
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
        System.out.println(viaje);

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
           viajeDb.setDiferenciaKilos(viajeDb.getDiferenciaKilos());
           viajeDb.setTotalKilos(viaje.getTotalKilos()+ viaje.getDiferenciaKilos());
           return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viajeDb));
        }
        return ResponseEntity.notFound().build();
    }
    // Método para buscar entre fechas
    @GetMapping("/buscar")
    public List<Viaje> searchByDate(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return viajeService.buscarPorFecha(startDate, endDate);
    }
    @GetMapping("/buscarPorNumero/{numero}")
    public ResponseEntity<?> buscar(@PathVariable Long numero){
        return ResponseEntity.ok(viajeService.buscarPorNumero(numero));
    }
    @PutMapping("/estado/{id}")
    public ResponseEntity<?>editarEstadoItem(@PathVariable Long id){
        Optional<Item>optionalItem = itemRepository.findById(id);
        Item item = null;
        if (optionalItem.isPresent()){
            item = optionalItem.get();
            if (item.getEstado().equals("Pendiente")){
                item.setEstado("Entregado");
            }else{
                item.setEstado("Pendiente");
            }
            return ResponseEntity.ok(item);
        }
     return ResponseEntity.notFound().build();
    }

    }


