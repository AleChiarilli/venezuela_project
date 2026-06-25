-- supabase/migrations/20260625000000_init.sql

CREATE TABLE public.personas_busquedas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- 'BUSCO' o 'ENCONTRADO'
  tipo_reporte TEXT NOT NULL CHECK (tipo_reporte IN ('BUSCO', 'ENCONTRADO')),
  
  nombre_completo TEXT NOT NULL,
  estado TEXT NOT NULL,
  ciudad_municipio TEXT NOT NULL,
  direccion_referencia TEXT NOT NULL,
  
  -- Opcionales
  latitud NUMERIC,
  longitud NUMERIC,
  vestimenta_rasgos TEXT,
  imagen_url TEXT,
  
  estatus_actual TEXT DEFAULT 'ACTIVO' CHECK (estatus_actual IN ('ACTIVO', 'RESUELTO')),
  contacto_reportante TEXT
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.personas_busquedas ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (RLS)
-- Permitir lectura a todo el mundo (anónimo)
CREATE POLICY "Permitir lectura publica" 
ON public.personas_busquedas 
FOR SELECT 
USING (true);

-- Permitir inserción a todo el mundo (anónimo)
CREATE POLICY "Permitir insercion anonima" 
ON public.personas_busquedas 
FOR INSERT 
WITH CHECK (true);
