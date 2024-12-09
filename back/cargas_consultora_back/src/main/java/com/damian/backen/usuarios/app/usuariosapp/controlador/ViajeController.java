package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Item;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.repositorio.ItemRepository;
import com.damian.backen.usuarios.app.usuariosapp.service.RepartoService;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import jakarta.validation.Valid;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@CrossOrigin("*")
@RequestMapping("/viajes")
public class ViajeController {

    @Autowired
    private ViajeService viajeService;

    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private RepartoService repartoService;

    // Validar errores
    private ResponseEntity<?> validar(BindingResult result) {
        Map<String, Object> errores = new HashMap<>();
        result.getFieldErrors().forEach(e -> {
            errores.put(e.getField(), "El campo " + e.getField() + " " + e.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(viajeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Viaje> viajeOptional = viajeService.findById(id);
        if (viajeOptional.isPresent()) {
            return ResponseEntity.ok(viajeOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        viajeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Viaje viaje, BindingResult result) {
        viaje.setTotalKilos(0.0);
        viaje.setTotalBultos(0);

        if (result.hasErrors()) {
            return validar(result);
        }
        viaje.totales();
        return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viaje));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Viaje viaje, BindingResult result, @PathVariable Long id) {
        Optional<Viaje> viajeOptional = viajeService.findById(id);
        if (viajeOptional.isPresent()) {
            Viaje viajeDb = viajeOptional.get();
            viajeService.delete(viajeDb.getId());
            viajeDb.setNumeroViaje(viaje.getNumeroViaje());
            viajeDb.setFecha(viaje.getFecha());
            viajeDb.setItems(viaje.getItems());
            viajeDb.setTotalBultos(viaje.getTotalBultos());
            viajeDb.setTotalKilos(viaje.getTotalKilos());
            viajeDb.setDiferenciaKilos(viajeDb.getDiferenciaKilos());
            viajeDb.setTotalKilos(viaje.getTotalKilos() + viaje.getDiferenciaKilos());
            return ResponseEntity.status(HttpStatus.CREATED).body(viajeService.save(viajeDb));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public List<Viaje> searchByDate(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return viajeService.buscarPorFecha(startDate, endDate);
    }

    @GetMapping("/buscarPorNumero/{numero}")
    public ResponseEntity<?> buscar(@PathVariable Long numero) {
        return ResponseEntity.ok(viajeService.buscarPorNumero(numero));
    }

    @PutMapping("/estado/{id}")
    public ResponseEntity<?> editarEstadoItem(@PathVariable Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setEstado(item.getEstado().equals("Pendiente") ? "Entregado" : "Pendiente");
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para generar el archivo ZIP con PDF y Excel
    @PostMapping("/exportar")
    public ResponseEntity<byte[]> generateFiles(@RequestBody Map<String, Object> requestBody) throws IOException {
        // Extraer la lista de viajes del Map
        ObjectMapper mapper = new ObjectMapper();

        // Convertir el contenido de "viajes" a una lista de objetos Viaje
        List<Viaje> viajes = mapper.convertValue(requestBody.get("viajes"), new TypeReference<List<Viaje>>(){});

        byte[] zipContent = createZipWithPdfAndExcel(viajes);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/zip");
        headers.add("Content-Disposition", "attachment; filename=viajes.zip");

        return ResponseEntity.ok().headers(headers).body(zipContent);
    }

    // Crear ZIP con PDF y Excel
    private byte[] createZipWithPdfAndExcel(List<Viaje> viajes) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ZipOutputStream zipOut = new ZipOutputStream(baos);

        // Generar y añadir PDF al ZIP
        byte[] pdfContent = generatePdf(viajes);
        ZipEntry pdfEntry = new ZipEntry("viajes.pdf");
        zipOut.putNextEntry(pdfEntry);
        zipOut.write(pdfContent);
        zipOut.closeEntry();

        // Generar y añadir Excel al ZIP
        byte[] excelContent = generateExcel(viajes);
        ZipEntry excelEntry = new ZipEntry("viajes.xlsx");
        zipOut.putNextEntry(excelEntry);
        zipOut.write(excelContent);
        zipOut.closeEntry();

        zipOut.close();
        return baos.toByteArray();
    }

    // Generar PDF
    private byte[] generatePdf(List<Viaje> viajes) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        for (Viaje viaje : viajes) {
            String formattedDate = dateFormat.format(viaje.getFecha());
            document.add(new Paragraph("Fecha: " + formattedDate));
            document.add(new Paragraph("Nro Viaje: " + viaje.getNumeroViaje()));
            document.add(new Paragraph("Cliente\tKilos"));

            double totalKilos = 0;
            for (Item item : viaje.getItems()) {
                if (item.getCliente() != null) {
                    document.add(new Paragraph(item.getCliente().getNumeroCliente() + "\t" + item.getKilos()));
                    totalKilos += item.getKilos();
                }
            }

            document.add(new Paragraph("Total\t" + totalKilos));
            document.add(new Paragraph("Diferencia\t" + viaje.getDiferenciaKilos()));
            document.add(new Paragraph("Total\t" + (totalKilos + viaje.getDiferenciaKilos())));
            document.add(new Paragraph("-----------"));
        }

        document.close();
        return baos.toByteArray();
    }

    // Generar Excel
    private byte[] generateExcel(List<Viaje> viajes) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Viajes");
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        int rowNum = 0;

        for (Viaje viaje : viajes) {
            String formattedDate = dateFormat.format(viaje.getFecha());
            // Fecha y número de viaje
            Row fechaRow = sheet.createRow(rowNum++);
            fechaRow.createCell(0).setCellValue("Fecha");
            fechaRow.createCell(1).setCellValue(formattedDate);

            Row numeroViajeRow = sheet.createRow(rowNum++);
            numeroViajeRow.createCell(0).setCellValue("Nro Viaje");
            numeroViajeRow.createCell(1).setCellValue(viaje.getNumeroViaje());

            // Crear encabezado de la tabla
            Row headerRow = sheet.createRow(rowNum++);
            headerRow.createCell(0).setCellValue("Cliente");
            headerRow.createCell(1).setCellValue("Kilos");

            double totalKilos = 0;

            // Llenar filas de clientes y kilos
            for (Item item : viaje.getItems()) {
                if (item.getCliente() != null) {
                    Row row = sheet.createRow(rowNum++);
                    row.createCell(0).setCellValue(item.getCliente().getNumeroCliente());
                    row.createCell(1).setCellValue(item.getKilos());
                    totalKilos += item.getKilos();
                }
            }

            // Agregar fila de total de kilos
            Row totalKilosRow = sheet.createRow(rowNum++);
            totalKilosRow.createCell(0).setCellValue("Total");
            totalKilosRow.createCell(1).setCellValue(totalKilos);

            // Calcular la diferencia y total final
            double diferencia = viaje.getDiferenciaKilos();
            double totalFinal = totalKilos + diferencia;

            // Agregar fila de diferencia
            Row diferenciaRow = sheet.createRow(rowNum++);
            diferenciaRow.createCell(0).setCellValue("Diferencia");
            diferenciaRow.createCell(1).setCellValue(diferencia);

            // Agregar fila de total final
            Row totalFinalRow = sheet.createRow(rowNum++);
            totalFinalRow.createCell(0).setCellValue("Total");
            totalFinalRow.createCell(1).setCellValue(totalFinal);

            // Añadir una fila vacía para separar viajes
            sheet.createRow(rowNum++);
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        workbook.close();

        return baos.toByteArray();
    }
}
