package com.damian.backen.usuarios.app.usuariosapp.controlador;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Controller
@RequestMapping("/pdf")
public class PdfController {
@Autowired
private ViajeService viajeService;

    @GetMapping("/viajes/{id}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long id) throws IOException {
        Optional<Viaje>viajeOptional = viajeService.findById(id);
        Viaje viaje = viajeOptional.get();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        // Agregar imagen en la parte superior
        ClassPathResource resource = new ClassPathResource("logo.png"); // Asegúrate de tener la imagen en src/main/resources/static/
        InputStream inputStream = resource.getInputStream();
        ImageData imageData = ImageDataFactory.create(inputStream.readAllBytes());
        Image image = new Image(imageData);
        document.add(image);
        document.add(new Paragraph("VIAJE NRO ")
                .setTextAlignment(TextAlignment.LEFT)
                .setFixedPosition(100, 100, 100));
        // Agregar una tabla
        float[] columnWidths = {1, 5}; // Anchos de las columnas
        Table table = new Table(columnWidths);

        // Encabezados de la tabla
        table.addCell(new Cell().add(new Paragraph("ID")));
        table.addCell(new Cell().add(new Paragraph("Nombre")));

        // Datos de la tabla
        table.addCell(new Cell().add(new Paragraph("1")));
        table.addCell(new Cell().add(new Paragraph("John Doe")));
        table.addCell(new Cell().add(new Paragraph("2")));
        table.addCell(new Cell().add(new Paragraph("Jane Doe")));

        document.add(table);
        document.close();

        byte[] pdfBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "tabla.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdfBytes);
    }
}