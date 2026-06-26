/**
 * Función para normalizar un string y eliminar acentos o caracteres diacríticos.
 * Ideal para hacer búsquedas escalables insensibles a acentos.
 * @param str - La cadena de texto a normalizar
 * @returns La cadena de texto en minúsculas y sin acentos
 */
export function normalizarBusqueda(str: string | null | undefined): string {
    if (!str) return '';
    // Pasa a minúsculas, descompone caracteres diacríticos y los elimina
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}
