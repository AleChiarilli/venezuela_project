# Configuración y Esquema de Supabase - Apoyo Vzla

Este documento contiene la estructura completa de la base de datos y la configuración de almacenamiento (Storage) de Supabase utilizada en el proyecto. Puedes copiar y pegar estos scripts directamente en el **SQL Editor** de Supabase si necesitas reconstruir las tablas, cambiar políticas o configurar un nuevo entorno.

---

## 1. Tablas y Políticas de Seguridad (RLS)

### Tabla `personas_busquedas` (Pestaña "Personas")
Esta tabla registra a personas desaparecidas o reportadas a salvo.

```sql
CREATE TABLE public.personas_busquedas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- 'BUSCO' o 'ENCONTRADO'
  tipo_reporte TEXT NOT NULL CHECK (tipo_reporte IN ('BUSCO', 'ENCONTRADO')),
  
  nombre_completo TEXT NOT NULL,
  estado TEXT NOT NULL,
  ciudad_municipio TEXT NOT NULL,
  direccion_referencia TEXT NOT NULL,
  
  -- Rasgos, contacto y ubicación
  vestimenta_rasgos TEXT,
  contacto_reportante TEXT NOT NULL,
  estado_vital TEXT NOT NULL DEFAULT 'DESAPARECIDO' CHECK (estado_vital IN ('DESAPARECIDO', 'A SALVO', 'HOSPITALIZADO')),
  latitud NUMERIC,
  longitud NUMERIC,
  imagen_url TEXT,
  
  -- Control interno del reporte
  estatus_actual TEXT DEFAULT 'ACTIVO' CHECK (estatus_actual IN ('ACTIVO', 'RESUELTO'))
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.personas_busquedas ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública (Anónima)
CREATE POLICY "Permitir lectura publica personas" 
ON public.personas_busquedas 
FOR SELECT 
USING (true);

-- Política: Permitir inserción pública (Anónima)
CREATE POLICY "Permitir insercion anonima personas" 
ON public.personas_busquedas 
FOR INSERT 
WITH CHECK (true);
```

---

### Tabla `suministros_ayuda` (Pestaña "Ayuda y Comida")
Registra donaciones u ofertas de insumos, herramientas, servicios y peticiones de ayuda.

```sql
CREATE TABLE public.suministros_ayuda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creado_el TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- 'TENGO' u 'NECESITO'
  tipo_anuncio TEXT NOT NULL CHECK (tipo_anuncio IN ('TENGO', 'NECESITO')),
  
  -- Categorías unificadas
  categoria TEXT NOT NULL CHECK (categoria IN (
    'ALIMENTOS', 'MEDICINAS', 'AGUA', 'HIGIENE', 'TRANSPORTE', 'SALUD', 'VOLUNTARIADO', 'OTROS'
  )),
  
  titulo_item TEXT NOT NULL,
  descripcion TEXT,
  cantidad_existencias INTEGER NOT NULL DEFAULT 1,
  unidad_medida TEXT NOT NULL DEFAULT 'unidades',
  
  estado TEXT NOT NULL,
  ciudad_municipio TEXT NOT NULL,
  direccion_referencia TEXT NOT NULL,
  contacto TEXT NOT NULL,
  
  latitud NUMERIC,
  longitud NUMERIC,
  imagen_url TEXT,
  
  resuelto BOOLEAN NOT NULL DEFAULT false
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.suministros_ayuda ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Permitir lectura publica suministros" 
ON public.suministros_ayuda 
FOR SELECT 
USING (true);

-- Política: Permitir inserción pública
CREATE POLICY "Permitir insercion anonima suministros" 
ON public.suministros_ayuda 
FOR INSERT 
WITH CHECK (true);
```

---

### Tabla `refugios_temporales` (Pestaña "Refugios")
Registra espacios seguros ofrecidos o solicitados para dormir o refugiarse.

```sql
CREATE TABLE public.refugios_temporales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creado_el TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- 'OFREZCO_TECHO' o 'BUSCO_TECHO'
  tipo_anuncio TEXT NOT NULL CHECK (tipo_anuncio IN ('OFREZCO_TECHO', 'BUSCO_TECHO')),
  
  capacidad_personas INTEGER NOT NULL DEFAULT 1,
  descripcion TEXT NOT NULL,
  
  estado TEXT NOT NULL,
  ciudad_municipio TEXT NOT NULL,
  direccion_referencia TEXT NOT NULL,
  contacto TEXT NOT NULL,
  
  latitud NUMERIC,
  longitud NUMERIC,
  imagen_url TEXT,
  
  resuelto BOOLEAN NOT NULL DEFAULT false
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.refugios_temporales ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Permitir lectura publica refugios" 
ON public.refugios_temporales 
FOR SELECT 
USING (true);

-- Política: Permitir inserción pública
CREATE POLICY "Permitir insercion anonima refugios" 
ON public.refugios_temporales 
FOR INSERT 
WITH CHECK (true);
```

---

## 2. Configuración de Almacenamiento (Supabase Storage)

El proyecto utiliza un bucket de almacenamiento para guardar las imágenes subidas por los usuarios. Las imágenes se comprimen en el cliente antes de ser enviadas.

### Nombre del Bucket: `imagenes_emergencia`
Asegúrate de que este bucket esté configurado como **público (Public)** en la pestaña Storage del panel de Supabase.

### Políticas de Acceso para el Bucket (Storage)
Para que los usuarios puedan subir fotos de manera anónima y verlas públicamente, ejecuta las siguientes políticas en la tabla `storage.objects` o desde el panel visual de políticas de Supabase Storage:

```sql
-- 1. Permitir que cualquiera pueda ver/descargar imágenes públicamente
CREATE POLICY "Acceso publico de lectura"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'imagenes_emergencia');

-- 2. Permitir que cualquier usuario anónimo suba fotos
CREATE POLICY "Subida libre anonima"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'imagenes_emergencia');
```

---

## 3. Consultas Útiles (SQL Editor)

Si necesitas realizar limpieza o mantenimiento de registros antiguos, puedes usar las siguientes sentencias:

### Limpiar registros marcados como resueltos
```sql
-- Eliminar reportes de personas encontradas
DELETE FROM public.personas_busquedas WHERE estatus_actual = 'RESUELTO';

-- Eliminar insumos ya entregados/resueltos
DELETE FROM public.suministros_ayuda WHERE resuelto = true;

-- Eliminar refugios resueltos
DELETE FROM public.refugios_temporales WHERE resuelto = true;
```

### Eliminar registros de más de 30 días de antigüedad
```sql
DELETE FROM public.personas_busquedas WHERE created_at < NOW() - INTERVAL '30 days';
DELETE FROM public.suministros_ayuda WHERE creado_el < NOW() - INTERVAL '30 days';
DELETE FROM public.refugios_temporales WHERE creado_el < NOW() - INTERVAL '30 days';
```
