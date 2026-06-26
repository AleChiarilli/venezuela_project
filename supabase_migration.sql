-- MIGRACIÓN 2: Tokens de edición para Suministros y Refugios
-- Ejecuta esto en el Editor SQL de Supabase

-- Suministros: añadir token de edición
ALTER TABLE public.suministros_ayuda 
ADD COLUMN IF NOT EXISTS token_edicion TEXT;

CREATE INDEX IF NOT EXISTS idx_suministros_token ON public.suministros_ayuda(token_edicion);

-- Refugios: añadir token de edición
ALTER TABLE public.refugios_temporales 
ADD COLUMN IF NOT EXISTS token_edicion TEXT;

CREATE INDEX IF NOT EXISTS idx_refugios_token ON public.refugios_temporales(token_edicion);

-- MIGRACIÓN 3: Centros de Acopio
CREATE TABLE IF NOT EXISTS public.centros_acopio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creado_el TIMESTAMPTZ DEFAULT NOW(),
    nombre_centro TEXT NOT NULL,
    pais TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    direccion_exacta TEXT NOT NULL,
    que_reciben TEXT NOT NULL,
    contacto TEXT NOT NULL,
    horarios TEXT,
    latitud NUMERIC,
    longitud NUMERIC,
    imagen_url TEXT,
    activo BOOLEAN DEFAULT TRUE,
    token_edicion TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_centros_acopio_pais ON public.centros_acopio(pais);
CREATE INDEX IF NOT EXISTS idx_centros_acopio_ciudad ON public.centros_acopio(ciudad);
CREATE INDEX IF NOT EXISTS idx_centros_acopio_token ON public.centros_acopio(token_edicion);

-- RLS (Security Policies)
ALTER TABLE public.centros_acopio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura a todos los centros de acopio"
ON public.centros_acopio
FOR SELECT
TO public
USING (true);

CREATE POLICY "Permitir inserción a cualquier usuario centros de acopio"
ON public.centros_acopio
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir actualización con token centros de acopio"
ON public.centros_acopio
FOR UPDATE
TO public
USING (token_edicion IS NOT NULL);

-- MIGRACIÓN 4: Números de Emergencia Locales
CREATE TABLE IF NOT EXISTS public.numeros_emergencia (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creado_el TIMESTAMPTZ DEFAULT NOW(),
    numero TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    estado TEXT NOT NULL,
    ciudad_municipio TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    token_edicion TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_numeros_estado ON public.numeros_emergencia(estado);
CREATE INDEX IF NOT EXISTS idx_numeros_ciudad ON public.numeros_emergencia(ciudad_municipio);
CREATE INDEX IF NOT EXISTS idx_numeros_token ON public.numeros_emergencia(token_edicion);

-- RLS
ALTER TABLE public.numeros_emergencia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura a todos numeros"
ON public.numeros_emergencia FOR SELECT TO public USING (true);

CREATE POLICY "Permitir inserción numeros"
ON public.numeros_emergencia FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Permitir actualización con token numeros"
ON public.numeros_emergencia FOR UPDATE TO public USING (token_edicion IS NOT NULL);

-- =========================================================================
-- MIGRACIÓN PARA BÚSQUEDA INSENSIBLE A ACENTOS (ACCENT-INSENSITIVE)
-- Ejecuta este script en tu Editor SQL de Supabase
-- =========================================================================

-- 1. Habilitar la extensión oficial de PostgreSQL para quitar acentos
CREATE EXTENSION IF NOT EXISTS unaccent;

-- 2. Crear una función INMUTABLE que quite los acentos y pase a minúsculas.
-- Tiene que ser inmutable para poder usarla en columnas generadas.
CREATE OR REPLACE FUNCTION normalizar_busqueda(texto text)
RETURNS text
LANGUAGE sql
IMMUTABLE PARALLEL SAFE STRICT
AS $$
  -- Utilizamos public.unaccent explícitamente para asegurar compatibilidad
  SELECT lower(public.unaccent('public.unaccent', COALESCE(texto, '')));
$$;

-- =========================================================================
-- 3. Añadir columnas generadas a las tablas
-- Estas columnas mantendrán la data sin acentos automáticamente.
-- =========================================================================

-- A. CENTROS DE ACOPIO
ALTER TABLE public.centros_acopio 
ADD COLUMN IF NOT EXISTS busqueda_ubicacion text 
GENERATED ALWAYS AS (normalizar_busqueda(pais || ' ' || ciudad || ' ' || direccion_exacta)) STORED;

ALTER TABLE public.centros_acopio 
ADD COLUMN IF NOT EXISTS busqueda_general text 
GENERATED ALWAYS AS (normalizar_busqueda(nombre_centro || ' ' || que_reciben)) STORED;

CREATE INDEX IF NOT EXISTS idx_centros_busqueda_ub on public.centros_acopio(busqueda_ubicacion);
CREATE INDEX IF NOT EXISTS idx_centros_busqueda_gen on public.centros_acopio(busqueda_general);

-- B. SUMINISTROS DE AYUDA
ALTER TABLE public.suministros_ayuda 
ADD COLUMN IF NOT EXISTS busqueda_ubicacion text 
GENERATED ALWAYS AS (normalizar_busqueda(estado || ' ' || ciudad_municipio || ' ' || direccion_referencia)) STORED;

ALTER TABLE public.suministros_ayuda 
ADD COLUMN IF NOT EXISTS busqueda_general text 
GENERATED ALWAYS AS (normalizar_busqueda(titulo_item || ' ' || COALESCE(descripcion, ''))) STORED;

-- C. REFUGIOS TEMPORALES
ALTER TABLE public.refugios_temporales 
ADD COLUMN IF NOT EXISTS busqueda_ubicacion text 
GENERATED ALWAYS AS (normalizar_busqueda(estado || ' ' || ciudad_municipio || ' ' || direccion_referencia)) STORED;

ALTER TABLE public.refugios_temporales 
ADD COLUMN IF NOT EXISTS busqueda_general text 
GENERATED ALWAYS AS (normalizar_busqueda(descripcion)) STORED;

-- D. PERSONAS BUSCADAS
ALTER TABLE public.personas_busquedas 
ADD COLUMN IF NOT EXISTS busqueda_ubicacion text 
GENERATED ALWAYS AS (normalizar_busqueda(estado || ' ' || ciudad_municipio || ' ' || direccion_referencia)) STORED;

ALTER TABLE public.personas_busquedas 
ADD COLUMN IF NOT EXISTS busqueda_general text 
GENERATED ALWAYS AS (normalizar_busqueda(nombre_completo || ' ' || COALESCE(vestimenta_rasgos, ''))) STORED;

-- E. NÚMEROS DE EMERGENCIA
ALTER TABLE public.numeros_emergencia 
ADD COLUMN IF NOT EXISTS busqueda_ubicacion text 
GENERATED ALWAYS AS (normalizar_busqueda(estado || ' ' || ciudad_municipio)) STORED;

ALTER TABLE public.numeros_emergencia 
ADD COLUMN IF NOT EXISTS busqueda_general text 
GENERATED ALWAYS AS (normalizar_busqueda(descripcion || ' ' || numero)) STORED;

-- =========================================================================
-- FIN DE LA MIGRACIÓN
-- =========================================================================
