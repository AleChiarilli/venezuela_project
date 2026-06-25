/// <reference types="astro/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

export function optimizarImagen(url: string | null | undefined): string {
    if (!url) return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=60';
    if (url && url.includes('supabase.co')) {
        return `${url}?width=400&quality=70&format=webp`;
    }
    return url;
}