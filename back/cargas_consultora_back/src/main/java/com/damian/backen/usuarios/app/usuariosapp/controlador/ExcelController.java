package com.damian.backen.usuarios.app.usuariosapp.controlador;

import com.damian.backen.usuarios.app.usuariosapp.endidad.Gasto;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Item;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Liquidacion;
import com.damian.backen.usuarios.app.usuariosapp.endidad.Viaje;
import com.damian.backen.usuarios.app.usuariosapp.service.LiquidacionService;
import com.damian.backen.usuarios.app.usuariosapp.service.ViajeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
@RequestMapping("/excel")
public class ExcelController {

    @Autowired
    private ViajeService viajeService;
    @Autowired
    private LiquidacionService liquidacionService;

    @GetMapping("/viajes/{id}")
    public ResponseEntity<byte[]> generateExcel(@PathVariable Long id) throws IOException {
        Optional<Viaje> viajeOptional = viajeService.findById(id);
        Viaje viaje = viajeOptional.orElseThrow(() -> new RuntimeException("Viaje no encontrado"));

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Detalle del Viaje");

        int rowNum = 0;

        // Agregar imagen en la parte superior
        ClassPathResource resource = new ClassPathResource("logo.png");
        InputStream inputStream = resource.getInputStream();
        byte[] imageBytes = IOUtils.toByteArray(inputStream);
        int pictureIdx = workbook.addPicture(imageBytes, Workbook.PICTURE_TYPE_PNG);
        inputStream.close();

        Drawing<?> drawing = sheet.createDrawingPatriarch();
        ClientAnchor anchor = workbook.getCreationHelper().createClientAnchor();
        anchor.setCol1(0);
        anchor.setRow1(0);
        Picture picture = drawing.createPicture(anchor, pictureIdx);
        picture.resize(2, 2);

        rowNum += 5;

        // Titulo del viaje
        Row titleRow = sheet.createRow(rowNum++);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("DETALLE DEL VIAJE");
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 16);
        titleStyle.setFont(titleFont);
        titleCell.setCellStyle(titleStyle);

        // Numero del viaje
        Row numeroViajeRow = sheet.createRow(rowNum++);
        numeroViajeRow.createCell(0).setCellValue("VIAJE NRO ");
        numeroViajeRow.createCell(1).setCellValue(viaje.getNumeroViaje().toString());

        rowNum++;

        // Encabezados de la tabla
        Row headerRow = sheet.createRow(rowNum++);
        String[] headers = {"CLIENTE", "BULTOS", "KILOS"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            cell.setCellStyle(headerStyle);
        }

        int totalBultos = 0;
        double totalKilos = 0.0;

        // Datos de la tabla
        for (Item item : viaje.getItems()) {
            Row dataRow = sheet.createRow(rowNum++);
            dataRow.createCell(0).setCellValue(item.getCliente().getNumeroCliente().toString());
            dataRow.createCell(1).setCellValue(item.getBultos());
            dataRow.createCell(2).setCellValue(item.getKilos());

            // Sumar los totales
            totalBultos += item.getBultos();
            totalKilos += item.getKilos();
        }

        // Fila de totales
        Row totalRow = sheet.createRow(rowNum++);
        totalRow.createCell(0).setCellValue("TOTAL");
        totalRow.createCell(1).setCellValue(totalBultos);
        totalRow.createCell(2).setCellValue(totalKilos);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        workbook.write(byteArrayOutputStream);
        workbook.close();

        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headersResponse = new HttpHeaders();
        headersResponse.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headersResponse.setContentDispositionFormData("attachment", "viaje.xlsx");

        return ResponseEntity
                .ok()
                .headers(headersResponse)
                .body(excelBytes);
    }
    @GetMapping("/liquidaciones/{id}")
    public ResponseEntity<byte[]> generateExcelLiquidacion(@PathVariable Long id) throws IOException {
        Optional<Liquidacion> liquidacionOptional = liquidacionService.finbyId(id);
        Liquidacion liquidacion = liquidacionOptional.get();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Liquidacion");

        // Agregar imagen en la parte superior
       // ClassPathResource resource = new ClassPathResource("logo.png"); // Asegúrate de tener la imagen en src/main/resources/static/
    //  InputStream inputStream = resource.getInputStream();
       // byte[] imageBytes = inputStream.readAllBytes();
       // int pictureIdx = workbook.addPicture(imageBytes, Workbook.PICTURE_TYPE_PNG);
     //   inputStream.close();
    //    Drawing<?> drawing = sheet.createDrawingPatriarch();
      // ClientAnchor anchor = workbook.getCreationHelper().createClientAnchor();
     //   anchor.setCol1(0);
      //  anchor.setRow1(0);
      //  Picture pict = drawing.createPicture(anchor, pictureIdx);
     //   pict.resize();

        // Encabezados de la tabla
        Row headerRow = sheet.createRow(6);
        Cell headerCell1 = headerRow.createCell(0);
        headerCell1.setCellValue("CONCEPTO");
        Cell headerCell2 = headerRow.createCell(1);
        headerCell2.setCellValue("IMPORTE");

        double total = 0.0;
        double iva = 0.0;
        double totalConIva = 0.0;

        // Datos de la tabla
        int rowNum = 7;
        for (Gasto gasto : liquidacion.getGastos()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(gasto.getConcepto().toString());
            row.createCell(1).setCellValue(gasto.getImporte());
            total += gasto.getImporte();
        }
        iva = total * 0.21;
        totalConIva = total + iva;

        // Fila de totales
        Row totalRow = sheet.createRow(rowNum++);
        totalRow.createCell(0).setCellValue("TOTAL");
        totalRow.createCell(1).setCellValue(total);

        Row ivaRow = sheet.createRow(rowNum++);
        ivaRow.createCell(0).setCellValue("IVA 21%");
        ivaRow.createCell(1).setCellValue(iva);

        Row totalConIvaRow = sheet.createRow(rowNum++);
        totalConIvaRow.createCell(0).setCellValue("TOTAL CON IVA");
        totalConIvaRow.createCell(1).setCellValue(totalConIva);

        // Ajustar el tamaño de las columnas
        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        workbook.write(byteArrayOutputStream);
        workbook.close();

        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "liquidacion.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(excelBytes);
    }
}