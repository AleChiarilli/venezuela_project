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
