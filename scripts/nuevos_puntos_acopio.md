# Nuevos Puntos de Acopio (Procesamiento de Imágenes)

Este documento servirá como borrador para ir recopilando, estructurando y geolocalizando la información extraída de las imágenes antes de enviarla a la base de datos.

## Estructura de Datos a Recopilar

| ID Temporal | Nombre / Responsable | Ciudad / Zona | Dirección Original | Dirección Inferida (Referencia) | Coordenadas (Lat, Lng) | Contacto | Horarios / Notas | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| | | | | | | | | Pendiente |

*El estado puede ser: `Pendiente`, `Geolocalizado`, `Aprobado`, `Insertado`.*

## Notas de Procesamiento
- **Direcciones ambiguas:** Se utilizará el contexto (centros comerciales, hospitales, plazas) para ubicar el punto lo más cerca posible.
- **Contacto:** Se priorizará extraer números de teléfono (libres de URLs si no es estrictamente necesario el link de WhatsApp) y redes sociales.
- **Validación:** Se revisará cada punto antes de generar el SQL final.
