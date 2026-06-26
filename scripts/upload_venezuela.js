import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = "https://gqtdjsybyzedjvuksdxy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jS3kj8mO5-QOT8zJordgJA_bbM8Oq8I";

const dataPath = path.join(__dirname, 'venezuela_coords.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const DEFAULT_PAIS = 'Venezuela';
const DEFAULT_QUE_RECIBEN = 'Ayuda general (NO medicamentos abiertos o vencidos)';
const DEFAULT_TOKEN = 'import_venezuela_2026';

let sqlQuery = `-- Inserción masiva de Puntos de Acopio Venezuela\n\n`;
sqlQuery += `INSERT INTO public.centros_acopio (nombre_centro, pais, ciudad, direccion_exacta, que_reciben, contacto, horarios, latitud, longitud, token_edicion, activo) VALUES\n`;

// Helper to sanitize quotes for SQL
const esc = (str) => {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
};

const values = data.map((d, index) => {
  const isLast = index === data.length - 1;
  const nombre = esc(d.nombre_centro);
  const pais = esc(DEFAULT_PAIS);
  const ciudad = esc(`${d.ciudad} (${d.estado})`);
  const direccion = esc(d.direccion_exacta);
  const que_reciben = esc(DEFAULT_QUE_RECIBEN);
  const contacto = esc(d.contacto || 'No especificado');
  const horarios = esc(d.horarios || 'No especificado');
  const latitud = d.latitud ? d.latitud : 'NULL';
  const longitud = d.longitud ? d.longitud : 'NULL';
  const token = esc(DEFAULT_TOKEN);
  return `(${nombre}, ${pais}, ${ciudad}, ${direccion}, ${que_reciben}, ${contacto}, ${horarios}, ${latitud}, ${longitud}, ${token}, TRUE)${isLast ? ';' : ','}`;
});

sqlQuery += values.join('\n') + '\n';

fs.writeFileSync(path.join(__dirname, 'insert_centros_vzla.sql'), sqlQuery);
console.log('SQL File created at insert_centros_vzla.sql');

// Upload to Supabase via REST API
const uploadToSupabase = async () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase credentials');
    return;
  }

  const payload = data.map(d => ({
    nombre_centro: d.nombre_centro,
    pais: DEFAULT_PAIS,
    ciudad: `${d.ciudad} (${d.estado})`,
    direccion_exacta: d.direccion_exacta,
    que_reciben: DEFAULT_QUE_RECIBEN,
    contacto: d.contacto || 'No especificado',
    horarios: d.horarios || 'No especificado',
    latitud: d.latitud || null,
    longitud: d.longitud || null,
    token_edicion: DEFAULT_TOKEN,
    activo: true
  }));

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/centros_acopio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Failed to upload data to Supabase:', errText);
    } else {
      console.log('Successfully uploaded all Venezuela data to Supabase in mass!');
    }
  } catch (err) {
    console.error('Error during upload:', err.message);
  }
};

uploadToSupabase();
