package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Compra;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Venta;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.service.CompraService;
import com.damian.backen.usuarios.app.usuariosapp.service.VentaService;
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
@RequestMapping("/facturacion")
public class FacturaController {
    @Autowired
    private VentaService ventaService;
    @Autowired
    private CompraService compraService;
    private ResponseEntity<?>validar(BindingResult result){
        Map<String,Object>errores = new HashMap<>();
        result.getFieldErrors().forEach(r->{
            errores.put(r.getField(), "El campo: " + r.getField()  + " " + r.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
    // COMPRAS
    @GetMapping("/compras-todas/{tipo}")
    public ResponseEntity<?>findAll(@PathVariable String tipo){
        System.out.println(tipo );
        List<Compra>selecionada = new ArrayList<>();
        List<Compra>compraList = compraService.findAll();
        compraList.forEach(l->{
            if(l.getTipo().equals(tipo)){
                selecionada.add(l);
            }
        });
       return ResponseEntity.ok(selecionada);
    }
    @GetMapping("/compras/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        Optional<Compra>optionalCompra = compraService.findById(id);
        if(optionalCompra.isPresent()){
            return ResponseEntity.ok(optionalCompra.get());
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/buscar-compras")
    public List<Compra> searchByDate(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return compraService.buscarPorFecha(startDate, endDate);
    }
    @PostMapping("/compras")
    public ResponseEntity<?>save (@Valid @RequestBody Compra compra, BindingResult result){
        if(result.hasErrors()){
    return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(compraService.save(compra));
    }
    @PutMapping("/compras/{id}")
    ResponseEntity<?>update(@Valid @RequestBody Compra compra, BindingResult result,@PathVariable Long id){
        if(result.hasErrors()){
            return validar(result);
        }
        Compra compraDb = null;
        Optional<Compra>optionalCompra = compraService.findById(id);
        if(optionalCompra.isPresent()){
            compraDb.setCuit(compra.getCuit());
            compraDb.setNombre(compra.getNombre());
            compraDb.setIva(compra.getIva());
            compraDb.setFecha(compra.getFecha());
            compraDb.setOtro(compra.getOtro());
            compraDb.setTotal(compra.getTotal());
            compraDb.setTipo(compra.getTipo());
            compraDb.setNroFactura(compra.getNroFactura());
            compraDb.setSubTotal(compraDb.getSubTotal());
            return ResponseEntity.ok(compraService.save(compraDb));
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/compras/{id}")
    public ResponseEntity<?>deleteById(@PathVariable Long id){
        Optional<Compra>optionalCompra = compraService.findById(id);
        if(optionalCompra.isPresent()){
            compraService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    //VENTAS
    @GetMapping("/ventas-todas/{tipo}")
    public ResponseEntity<?>findAllv(@PathVariable String tipo){
        List<Venta>selecionada = new ArrayList<>();
        List<Venta>compraList = ventaService.findAll();
        compraList.forEach(l->{
            if(l.getTipo().equals(tipo)){
                selecionada.add(l);
            }
        });
        return ResponseEntity.ok(selecionada);
    }
    @GetMapping("/ventas/{id}")
    public ResponseEntity<?>findByIdv(@PathVariable Long id){
        Optional<Venta>optionalCompra = ventaService.findById(id);
        if(optionalCompra.isPresent()){
            return ResponseEntity.ok(optionalCompra.get());
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/buscar-ventas")
    public List<Venta> buscar(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return ventaService.buscarPorFecha(startDate, endDate);
    }
    @PostMapping("/ventas")
    public ResponseEntity<?>save (@Valid @RequestBody Venta compra, BindingResult result){
        if(result.hasErrors()){
            return validar(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ventaService.save(compra));
    }
    @PutMapping("/ventas/{id}")
    ResponseEntity<?>update(@Valid @RequestBody Venta compra, BindingResult result,@PathVariable Long id){
        if(result.hasErrors()){
            return validar(result);
        }
        Venta compraDb = null;
        Optional<Venta>optionalCompra = ventaService.findById(id);
        if(optionalCompra.isPresent()){
            compraDb.setCuit(compra.getCuit());
            compraDb.setNombre(compra.getNombre());
            compraDb.setIva(compra.getIva());
            compraDb.setFecha(compra.getFecha());
            compraDb.setOtro(compra.getOtro());
            compraDb.setTotal(compra.getTotal());
            compraDb.setNroFactura(compra.getNroFactura());
            compraDb.setTipo(compra.getTipo());
            compraDb.setSubTotal(compraDb.getSubTotal());
            return ResponseEntity.ok(ventaService.save(compraDb));
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/ventas/{id}")
    public ResponseEntity<?>deleteByIdb(@PathVariable Long id){
        Optional<Venta>optionalCompra = ventaService.findById(id);
        if(optionalCompra.isPresent()){
            ventaService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
