package com.damian.backen.usuarios.app.usuariosapp.controlador;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Gasto;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Item;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.service.LiquidacionService;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFontFactory;
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

import javax.swing.text.Element;
import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Controller
@RequestMapping("/pdf")
public class PdfController {
    @Autowired
    private ViajeService viajeService;
    @Autowired
    private LiquidacionService liquidacionService;

    @GetMapping("/viajes/{id}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long id) throws IOException {
        Optional<Viaje> viajeOptional = viajeService.findById(id);
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
        document.add(new Paragraph("-------------------------------------------------------------------------------------------------------------------------------------------")
                .setTextAlignment(TextAlignment.JUSTIFIED)
                .setFixedPosition(0, 600, 1000));
        document.add(new Paragraph("DETALLE DEL VIAJE ")
                .setTextAlignment(TextAlignment.CENTER).setBold()
                .setFixedPosition(0, 570, 200));
        document.add(new Paragraph("VIAJE NRO ")
                .setTextAlignment(TextAlignment.LEFT)
                .setFixedPosition(0, 540, 100));
        document.add(new Paragraph(viaje.getNumeroViaje().toString())
                .setTextAlignment(TextAlignment.LEFT)
                .setFixedPosition(75, 540, 100));

        // Agregar una tabla
        float[] columnWidths = {4, 4, 4}; // Ajusta los anchos de las columnas
        Table table = new Table(columnWidths);

        // Encabezados de la tabla
        table.addCell(new Cell().add(new Paragraph("CLIENTE").setTextAlignment(TextAlignment.CENTER)));
        table.addCell(new Cell().add(new Paragraph("BULTOS").setTextAlignment(TextAlignment.CENTER)));
        table.addCell(new Cell().add(new Paragraph("KILOS").setTextAlignment(TextAlignment.CENTER)));

        int totalBultos = 0;
        double totalKilos = 0.0;

        // Datos de la tabla
        for (Item item : viaje.getItems()) {
            table.addCell(new Cell().add(new Paragraph(item.getCliente().getNumeroCliente().toString()).setTextAlignment(TextAlignment.CENTER)));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(item.getBultos())).setTextAlignment(TextAlignment.CENTER)));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(item.getKilos())).setTextAlignment(TextAlignment.CENTER)));

            // Sumar los totales
            totalBultos += item.getBultos();
            totalKilos += item.getKilos();
        }

        // Fila de totales
        table.addCell(new Cell(1, 1).add(new Paragraph("TOTAL").setTextAlignment(TextAlignment.CENTER).setBold()));
        table.addCell(new Cell(1, 1).add(new Paragraph(String.valueOf(totalBultos)).setTextAlignment(TextAlignment.CENTER).setBold()));
        table.addCell(new Cell(1, 1).add(new Paragraph(String.valueOf(totalKilos)).setTextAlignment(TextAlignment.CENTER).setBold()));


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

    @GetMapping("/liquidaciones/{id}")
    public ResponseEntity<byte[]> generatePdfLiquidacion(@PathVariable Long id) throws IOException {
        Optional<Liquidacion> liquidacionOptional = liquidacionService.finbyId(id);
        Liquidacion liquidacion = liquidacionOptional.get();
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
        document.add(new Paragraph("-------------------------------------------------------------------------------------------------------------------------------------------")
                .setTextAlignment(TextAlignment.JUSTIFIED)
                .setFixedPosition(0, 600, 1000));
        document.add(new Paragraph("LIQUIDACION ")
                .setTextAlignment(TextAlignment.CENTER).setBold()
                .setFixedPosition(0, 570, 200));
        document.add(new Paragraph("VIAJE NRO ")
                .setTextAlignment(TextAlignment.LEFT)
                .setFixedPosition(0, 540, 100));
        document.add(new Paragraph(liquidacion.getViaje().getNumeroViaje().toString())
                .setTextAlignment(TextAlignment.LEFT)
                .setFixedPosition(75, 540, 100));

        // Agregar una tabla
        float[] columnWidths = {4, 4}; // Ajusta los anchos de las columnas
        Table table = new Table(columnWidths);

        // Encabezados de la tabla
        table.addCell(new Cell().add(new Paragraph("CONCEPTO").setTextAlignment(TextAlignment.CENTER)));
        table.addCell(new Cell().add(new Paragraph("IMPORTE").setTextAlignment(TextAlignment.CENTER)));

        double total = 0.0;
        double iva = 0.0;
        double totalConIVA = 0.0;

        // Datos de la tabla
        for (Gasto gasto : liquidacion.getGastos()) {
            table.addCell(new Cell().add(new Paragraph(gasto.getConcepto().toString()).setTextAlignment(TextAlignment.CENTER)));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(gasto.getImporte())).setTextAlignment(TextAlignment.CENTER)));

            // Sumar los totales
            total += gasto.getImporte();
        }

        iva = total * 0.21;
        totalConIVA = total + iva;

        // Fila de total
        table.addCell(new Cell(1, 2).add(new Paragraph("TOTAL").setTextAlignment(TextAlignment.CENTER).setBold()));
        table.addCell(new Cell(1, 2).add(new Paragraph(String.valueOf(total)).setTextAlignment(TextAlignment.CENTER).setBold()));

        // Fila de IVA
        table.addCell(new Cell(1, 2).add(new Paragraph("IVA 21%").setTextAlignment(TextAlignment.CENTER).setBold()));
        table.addCell(new Cell(1, 2).add(new Paragraph(String.valueOf(iva)).setTextAlignment(TextAlignment.CENTER).setBold()));

        // Fila de Total con IVA
        table.addCell(new Cell(1, 2).add(new Paragraph("TOTAL CON IVA").setTextAlignment(TextAlignment.CENTER).setBold()));
        table.addCell(new Cell(1, 2).add(new Paragraph(String.valueOf(totalConIVA)).setTextAlignment(TextAlignment.CENTER).setBold()));

        document.add(table);
        document.close();

        byte[] pdfBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "liquidacion.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdfBytes);
    }
}