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
