-- =========================================================================
-- MIGRACIÓN: POLÍTICAS DE ACTUALIZACIÓN CON TOKEN Y COLUMNA token_edicion
-- Ejecuta esto en el Editor SQL de Supabase para arreglar el problema de que
-- los registros no se actualizan al marcarlos como "Localizados" o "Resueltos".
-- =========================================================================

-- 1. Asegurar que la columna token_edicion exista en personas_busquedas
ALTER TABLE public.personas_busquedas ADD COLUMN IF NOT EXISTS token_edicion TEXT;
CREATE INDEX IF NOT EXISTS idx_personas_token ON public.personas_busquedas(token_edicion);

-- 2. Crear las políticas de UPDATE para las 3 tablas que lo necesitan

-- A. Personas Búsquedas
DROP POLICY IF EXISTS "Permitir actualizacion con token personas" ON public.personas_busquedas;
CREATE POLICY "Permitir actualizacion con token personas"
ON public.personas_busquedas
FOR UPDATE
TO public
USING (token_edicion IS NOT NULL);

-- B. Suministros Ayuda
DROP POLICY IF EXISTS "Permitir actualizacion con token suministros" ON public.suministros_ayuda;
CREATE POLICY "Permitir actualizacion con token suministros"
ON public.suministros_ayuda
FOR UPDATE
TO public
USING (token_edicion IS NOT NULL);

-- C. Refugios Temporales
DROP POLICY IF EXISTS "Permitir actualizacion con token refugios" ON public.refugios_temporales;
CREATE POLICY "Permitir actualizacion con token refugios"
ON public.refugios_temporales
FOR UPDATE
TO public
USING (token_edicion IS NOT NULL);

-- Nota: Estas políticas permiten que la consulta .update().eq('token_edicion', token)
-- encuentre el registro y lo pueda actualizar. Sin esta política de UPDATE, Supabase
-- bloquea la actualización silenciosamente (retornando 0 filas afectadas).
