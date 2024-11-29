package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.RepartoDto;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/repartos")
public class RepartoPdfController {

    // Exportar a Excel
    @PostMapping("/export/excel")
    public ResponseEntity<ByteArrayResource> exportToExcel(@RequestBody RepartoDto repartoDto) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Repartos");

        // Crear la fila de encabezados
        Row headerRow = sheet.createRow(0);
        String[] columns = {"ID", "Descripción", "Viaje", "Fecha", "Fletero", "Importe", "Total Kilos"};

        int i = 0;
        for (String column : columns) {
            org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
            cell.setCellValue(column);
            i++;
        }

        // Rellenar las filas con los datos de cada RepartoDto
        int rowIdx = 1;
        for (RepartoDto.Reparto reparto : repartoDto.getFilteredRepartos()) {
            Row row = sheet.createRow(rowIdx++);

            row.createCell(0).setCellValue(reparto.getId());
            row.createCell(1).setCellValue(reparto.getDescripcion());
            row.createCell(2).setCellValue(reparto.getViaje().getNumeroViaje());
            row.createCell(3).setCellValue(reparto.getFecha().toString());
            row.createCell(4).setCellValue(reparto.getFleteros().getNombre());
            row.createCell(5).setCellValue(reparto.getPrecio());

            // Sumar el total de kilos de los items
            double totalKilos = reparto.getItems().stream()
                    .mapToDouble(RepartoDto.Item::getKilos)
                    .sum();
            row.createCell(6).setCellValue(totalKilos);
        }

        // Escribir el archivo en el ByteArrayOutputStream
        workbook.write(out);
        workbook.close();

        // Crear el recurso para la respuesta
        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=repartos.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    // Exportar a PDF
    @PostMapping("/export/pdf")
    public ResponseEntity<ByteArrayResource> exportToPDF(@RequestBody RepartoDto repartoDto) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        float[] columnWidths = {1, 2, 2, 2, 2, 2, 2};
        Table table = new Table(columnWidths);

        table.addCell(new Cell().add("ID"));
        table.addCell(new Cell().add("Descripción"));
        table.addCell(new Cell().add("Viaje"));
        table.addCell(new Cell().add("Fecha"));
        table.addCell(new Cell().add("Fletero"));
        table.addCell(new Cell().add("Importe"));
        table.addCell(new Cell().add("Total Kilos"));

        // Iterar sobre los repartos en el RepartoDto
        for (RepartoDto.Reparto reparto : repartoDto.getFilteredRepartos()) {
            table.addCell(new Cell().add(String.valueOf(reparto.getId())));
            table.addCell(new Cell().add(reparto.getDescripcion()));
            table.addCell(new Cell().add(String.valueOf(reparto.getViaje().getNumeroViaje())));
            table.addCell(new Cell().add(reparto.getFecha().toString()));
            table.addCell(new Cell().add(reparto.getFleteros().getNombre()));
            table.addCell(new Cell().add(String.valueOf(reparto.getPrecio())));
            table.addCell(new Cell().add(String.valueOf(reparto.getItems().stream().mapToDouble(RepartoDto.Item::getKilos).sum())));
        }

        document.add(table);
        document.close();

        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=repartos.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}
