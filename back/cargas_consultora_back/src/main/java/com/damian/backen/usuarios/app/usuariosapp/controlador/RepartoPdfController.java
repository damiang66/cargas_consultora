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
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api/repartos")
public class RepartoPdfController {

    // Exportar a Excel


    /*
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
    */
    @PostMapping("/export/excel")
    public ResponseEntity<ByteArrayResource> exportToExcel(@RequestBody RepartoDto repartoDto) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Repartos");
        double iva = 0.0;

        // Crear la fila de encabezados
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Row headerRow = sheet.createRow(0);
        String[] columns = {"Numero de Viaje", "Fecha", "Fletero Nombre", "Descripcion", "Cliente", "Kilos", "Importe", "Iva", "Total"};

        for (int i = 0; i < columns.length; i++) {
            org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
        }

        int rowIdx = 1;

        for (RepartoDto.Reparto reparto : repartoDto.getFilteredRepartos()) {
            double totalKilos = 0;
            boolean fleteroDataAdded = false;
            Row lastRow = null;

            if (reparto.getItems().isEmpty()) {
                String formattedDate = dateFormat.format(reparto.getFecha());
                // Si no hay clientes, aún necesitamos agregar una fila para el fletero
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(reparto.getViaje().getNumeroViaje());
                row.createCell(1).setCellValue(formattedDate);
                row.createCell(2).setCellValue(reparto.getFleteros().getNombre());
                row.createCell(3).setCellValue(reparto.getDescripcion());
                row.createCell(6).setCellValue(reparto.getPrecio());
                row.createCell(7).setCellValue(reparto.getPrecio() * 21 / 100);
                iva = reparto.getPrecio() * 21 / 100;
                row.createCell(8).setCellValue(reparto.getPrecio() + iva);
            } else {
                for (RepartoDto.Item item : reparto.getItems()) {
                    Row row = sheet.createRow(rowIdx++);

                    if (!fleteroDataAdded) {
                        String formattedDate = dateFormat.format(reparto.getFecha());
                        row.createCell(0).setCellValue(reparto.getViaje().getNumeroViaje());
                        row.createCell(1).setCellValue(formattedDate);
                        row.createCell(2).setCellValue(reparto.getFleteros().getNombre());
                        row.createCell(3).setCellValue(reparto.getDescripcion());
                        fleteroDataAdded = true;
                        lastRow = row;
                    }

                    iva = 0.0;
                    row.createCell(4).setCellValue(item.getCliente().getNumeroCliente());
                    row.createCell(5).setCellValue(item.getKilos());

                    totalKilos += item.getKilos();
                }

                if (lastRow != null) {
                    lastRow.createCell(6).setCellValue(reparto.getPrecio());
                    lastRow.createCell(7).setCellValue(reparto.getPrecio() * 21 / 100);
                    iva = reparto.getPrecio() * 21 / 100;
                    lastRow.createCell(8).setCellValue(reparto.getPrecio() + iva);
                }
            }

            // Agregar fila para el total de kilos si hay clientes
            if (!reparto.getItems().isEmpty()) {
                Row totalRow = sheet.createRow(rowIdx++);
                totalRow.createCell(4).setCellValue("Total");
                totalRow.createCell(5).setCellValue(totalKilos);
            }
        }

        workbook.write(out);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=repartos.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }


    @PostMapping("/export/pdf")
    public ResponseEntity<ByteArrayResource> exportToPDF(@RequestBody RepartoDto repartoDto) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        // Definir el ancho de las columnas
        float[] columnWidths = {2, 2, 2, 2, 2, 2, 2, 2, 2}; // Añadí una columna para el total
        Table table = new Table(columnWidths);

        // Encabezados de la tabla
        table.addCell(new Cell().add("Numero de Viaje"));
        table.addCell(new Cell().add("Fecha"));
        table.addCell(new Cell().add("Fletero Nombre"));
        table.addCell(new Cell().add("Descripcion"));
        table.addCell(new Cell().add("Cliente"));
        table.addCell(new Cell().add("Kilos"));
        table.addCell(new Cell().add("Sub Total"));
        table.addCell(new Cell().add("Iva"));
        table.addCell(new Cell().add("Total"));

        // Iterar sobre los repartos
        for (RepartoDto.Reparto reparto : repartoDto.getFilteredRepartos()) {
            double totalKilos = 0;
            double totalSubTotal = 0;
            boolean fleteroDataAdded = false;

            // Si no hay clientes, aún necesitamos agregar una fila para el fletero
            if (reparto.getItems().isEmpty()) {
                String formattedDate = dateFormat.format(reparto.getFecha());
                table.addCell(new Cell().add(String.valueOf(reparto.getViaje().getNumeroViaje())));
                table.addCell(new Cell().add(formattedDate));
                table.addCell(new Cell().add(reparto.getFleteros().getNombre()));
                table.addCell(new Cell().add(reparto.getDescripcion()));
                table.addCell(new Cell().add(""));
                table.addCell(new Cell().add(""));
                table.addCell(new Cell().add("0.0"));
                table.addCell(new Cell().add("0.0"));
                table.addCell(new Cell().add("0.0"));
            } else {
                for (RepartoDto.Item item : reparto.getItems()) {
                    if (!fleteroDataAdded) {
                        String formattedDate = dateFormat.format(reparto.getFecha());
                        table.addCell(new Cell().add(String.valueOf(reparto.getViaje().getNumeroViaje())));
                        table.addCell(new Cell().add(formattedDate));
                        table.addCell(new Cell().add(reparto.getFleteros().getNombre()));
                        table.addCell(new Cell().add(reparto.getDescripcion()));
                        fleteroDataAdded = true;
                    } else {
                        // Rellenar celdas vacías para mantener la alineación
                        table.addCell(new Cell());
                        table.addCell(new Cell());
                        table.addCell(new Cell());
                        table.addCell(new Cell());
                    }

                    // Datos del cliente y su cantidad de kilos
                    table.addCell(new Cell().add(String.valueOf(item.getCliente().getNumeroCliente())));
                    table.addCell(new Cell().add(String.valueOf(item.getKilos())));

                    // Cálculo del subtotal, IVA y total
                    double subTotal = reparto.getPrecio();
                    double iva = subTotal * 0.21; // 21% de IVA
                    double total = subTotal + iva;

                    // Mostrar Subtotal, IVA y Total
                    table.addCell(new Cell().add(String.valueOf(subTotal)));
                    table.addCell(new Cell().add(String.valueOf(iva)));
                    table.addCell(new Cell().add(String.valueOf(total)));

                    // Acumulando el total de kilos y subtotales
                    totalKilos += item.getKilos();
                }

                double subTotal = reparto.getPrecio();
                double iva = subTotal * 0.21; // 21% de IVA
                double total = subTotal + iva;
                totalSubTotal += subTotal;

                // Mostrar Subtotal, IVA y Total acumulados
                table.addCell(new Cell().add(String.valueOf(subTotal)));
                table.addCell(new Cell().add(String.valueOf(iva)));
                table.addCell(new Cell().add(String.valueOf(total)));

                // Agregar fila para el total de kilos
                table.addCell(new Cell().add("Total"));
                table.addCell(new Cell());
                table.addCell(new Cell());
                table.addCell(new Cell());
                table.addCell(new Cell());
                table.addCell(new Cell().add(String.valueOf(totalKilos)));

                // Agregar subtotal, IVA y total acumulados
                table.addCell(new Cell().add(String.valueOf(totalSubTotal)));
                table.addCell(new Cell().add(String.valueOf(totalSubTotal * 0.21)));
                table.addCell(new Cell().add(String.valueOf(totalSubTotal + (totalSubTotal * 0.21))));
            }
        }

        // Agregar la tabla al documento PDF
        document.add(table);
        document.close();

        // Convertir el documento PDF a ByteArray
        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());

        // Retornar la respuesta con el archivo PDF
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=repartos.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }





}
