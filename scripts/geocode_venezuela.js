import fs from 'fs';

const data = [
  // Aragua
  { estado: 'Aragua', ciudad: 'Maracay', municipio: 'Girardot', nombre_centro: 'A tres locales de Hypercarnes Bermúdez', direccion_exacta: 'Urbanización El Centro, calle El Hipódromo, Maracay', horarios: '9:00 am - 4:00 pm' },
  { estado: 'Aragua', ciudad: 'Cagua', municipio: 'Sucre', nombre_centro: 'Club Camarón', direccion_exacta: 'Calle La Romana, frente al liceo Josefina Crespo, Cagua', horarios: '9:00 am - 4:00 pm' },
  { estado: 'Aragua', ciudad: 'Maracay', municipio: 'Girardot', nombre_centro: 'C.C. La Capilla - Local 21', direccion_exacta: 'Avenida 19 de Abril, Centro Comercial La Capilla, Piso 1, Local 21, Maracay', horarios: '9:00 am - 4:00 pm' },

  // Anzoátegui
  { estado: 'Anzoátegui', ciudad: 'Puerto Píritu', municipio: 'Peñalver', nombre_centro: 'Plaza Bolívar', direccion_exacta: 'Plaza Bolívar, Puerto Píritu' },
  { estado: 'Anzoátegui', ciudad: 'Lechería', municipio: 'Urbaneja', nombre_centro: 'Plaza Bolívar', direccion_exacta: 'Plaza Bolívar, Lechería' },
  { estado: 'Anzoátegui', ciudad: 'Lechería', municipio: 'Urbaneja', nombre_centro: 'Frente a AIKOS', direccion_exacta: 'Avenida Principal, frente a AIKOS, Lechería' },
  { estado: 'Anzoátegui', ciudad: 'Onoto', municipio: 'Cajigal', nombre_centro: 'Al lado del Club Taquima', direccion_exacta: 'Calle Bolívar, al lado del club Taquima, Onoto', horarios: 'A partir de las 9:00 am' },
  { estado: 'Anzoátegui', ciudad: 'Pariaguán', municipio: 'Francisco de Miranda', nombre_centro: 'Sede Vente Pariaguán', direccion_exacta: 'Sede Vente Pariaguán, Pariaguán' },
  { estado: 'Anzoátegui', ciudad: 'San José de Guanipa', municipio: 'Guanipa', nombre_centro: 'Plaza Bolívar', direccion_exacta: 'Plaza Bolívar, San José de Guanipa', horarios: 'A partir de las 9:00 am' },
  { estado: 'Anzoátegui', ciudad: 'El Chaparro', municipio: 'Mac Gregor', nombre_centro: 'Sede Vente Mac Gregor', direccion_exacta: 'Sede Vente Mac Gregor, El Chaparro' },
  { estado: 'Anzoátegui', ciudad: 'San Mateo', municipio: 'Libertad', nombre_centro: 'Sede Vente Libertad', direccion_exacta: 'Sede Vente Libertad, San Mateo' },
  { estado: 'Anzoátegui', ciudad: 'San Mateo', municipio: 'Libertad', nombre_centro: 'Calle La Laguna', direccion_exacta: 'Calle La Laguna, sector La Laguna, San Mateo' },
  { estado: 'Anzoátegui', ciudad: 'Anaco', municipio: 'Anaco', nombre_centro: 'Plaza Bolívar', direccion_exacta: 'Plaza Bolívar, Avenida Mérida, Anaco' },
  { estado: 'Anzoátegui', ciudad: 'Anaco', municipio: 'Anaco', nombre_centro: 'Sede Vente Anaco (Casa María Corina Machado)', direccion_exacta: 'Calle Negro Primero, entre 24 de Julio y Primero de Mayo, Anaco', horarios: 'A partir de las 9:00 am' },
  { estado: 'Anzoátegui', ciudad: 'Anaco', municipio: 'Anaco', nombre_centro: 'Frente a la Casa Nueva Esparta', direccion_exacta: 'Avenida Miranda, frente a la Casa Nueva Esparta, Anaco' },
  { estado: 'Anzoátegui', ciudad: 'Clarines', municipio: 'Bruzual', nombre_centro: 'Farmacia Mi Farmacia', direccion_exacta: 'Avenida Fernández Padilla, Clarines' },
  { estado: 'Anzoátegui', ciudad: 'Aragua de Barcelona', municipio: 'Aragua', nombre_centro: 'Plaza Arreaza Matute', direccion_exacta: 'Plaza Arreaza Matute, Aragua de Barcelona', horarios: 'Viernes a Domingo, 8:00 am - 7:00 pm' },
  { estado: 'Anzoátegui', ciudad: 'El Tigre', municipio: 'Simón Rodríguez', nombre_centro: 'Sede Vente El Tigre', direccion_exacta: '8va Calle norte, cruce con la 2da carrera, detrás de Rika Pizza, El Tigre' },
  { estado: 'Anzoátegui', ciudad: 'Valle de Guanape', municipio: 'Carvajal', nombre_centro: 'Sede Valle Guanape', direccion_exacta: 'Sede Valle Guanape, Valle de Guanape' },
  { estado: 'Anzoátegui', ciudad: 'Santa Ana', municipio: 'Santa Ana', nombre_centro: 'Plaza Bolívar', direccion_exacta: 'Plaza Bolívar, Santa Ana', horarios: 'A partir de las 9:00 am' },
  { estado: 'Anzoátegui', ciudad: 'Puerto La Cruz', municipio: 'Sotillo', nombre_centro: 'Plaza Bolívar', direccion_exacta: 'Plaza Bolívar, Puerto La Cruz', horarios: 'A partir de las 10:00 am' },

  // Lara
  { estado: 'Lara', ciudad: 'Barquisimeto', municipio: 'Iribarren', nombre_centro: 'Al lado de Seguros Altamira', direccion_exacta: 'Avenida Venezuela, canal lento desde la Avenida Morán hasta el Sambil, Barquisimeto' },
  { estado: 'Lara', ciudad: 'Cabudare', municipio: 'Palavecino', nombre_centro: 'Los Rastrojos (Diagonal a El Cuadrito)', direccion_exacta: 'Los Rastrojos, calle 3 esquina calle Aquilino Juárez, Cabudare' },
  { estado: 'Lara', ciudad: 'Quíbor', municipio: 'Jiménez', nombre_centro: 'Avenida 5', direccion_exacta: 'Avenida 5 entre calles 13 y 14, Parroquia Juan Bautista Rodríguez, Quíbor' },
  { estado: 'Lara', ciudad: 'Duaca', municipio: 'Crespo', nombre_centro: 'Punto de acopio Duaca', direccion_exacta: 'Calle 13 entre carrera 12 y 13, Duaca' },
  { estado: 'Lara', ciudad: 'Carora', municipio: 'Torres', nombre_centro: 'Academia Cecilio Acosta', direccion_exacta: 'Avenida Dr. Pastor Oropeza entre calles 6 y 7, sector Antonio José de Sucre, Carora' },
  { estado: 'Lara', ciudad: 'El Tocuyo', municipio: 'Morán', nombre_centro: 'Fotocopiado Maigualida', direccion_exacta: 'Avenida Fraternidad, esquina calle 14, frente al parquecito, El Tocuyo' },
  { estado: 'Lara', ciudad: 'Sanare', municipio: 'Andrés Eloy Blanco', nombre_centro: 'Antiguo local de la cooperativa', direccion_exacta: 'Avenida principal Simón Bolívar, a 20 metros del Zaragoza, Sanare' },

  // Yaracuy
  { estado: 'Yaracuy', ciudad: 'San Felipe', municipio: 'Independencia', nombre_centro: 'Cerca de la Plaza Sucre', direccion_exacta: 'Calle 28 entre avenidas 3 y 4, Independencia' },
  { estado: 'Yaracuy', ciudad: 'Chivacoa', municipio: 'Bruzual', nombre_centro: 'Avenida 07', direccion_exacta: 'Avenida 07 entre calles 12 y 13, Chivacoa' },
  { estado: 'Yaracuy', ciudad: 'Guama', municipio: 'Sucre', nombre_centro: 'Cerca del Ambulatorio', direccion_exacta: 'Calle Bolívar, Sector Bucarito, Guama' },
  { estado: 'Yaracuy', ciudad: 'Sabana de Parra', municipio: 'Páez', nombre_centro: 'Carrera 4', direccion_exacta: 'Carrera 4 entre calles 7 y 8, Sabana de Parra' },
  { estado: 'Yaracuy', ciudad: 'San Pablo', municipio: 'Bastidas', nombre_centro: 'Frente al CC "El Centro"', direccion_exacta: 'Calle 8 entre avenidas 01 y 02, San Pablo' },

  // Portuguesa
  { estado: 'Portuguesa', ciudad: 'San Rafael de Onoto', municipio: 'San Rafael de Onoto', nombre_centro: 'Avenida principal', direccion_exacta: 'Avenida principal, esquina El Cacique entre calle 3 y 4, San Rafael de Onoto' },
  { estado: 'Portuguesa', ciudad: 'Agua Blanca', municipio: 'Agua Blanca', nombre_centro: 'Farmacia El Venerable', direccion_exacta: 'Avenida 4 entre calles 13 y 14, Agua Blanca' },
  { estado: 'Portuguesa', ciudad: 'Acarigua', municipio: 'Páez', nombre_centro: 'C.C. Ciudad Cristal - Local 39', direccion_exacta: 'Centro Comercial Ciudad Cristal, local número 39, Acarigua-Araure' },
  { estado: 'Portuguesa', ciudad: 'Píritu', municipio: 'Esteller', nombre_centro: 'Frente a la Farmacia San Ignacio', direccion_exacta: 'Carrera 8 entre calles 7 y 8, Píritu' },
  { estado: 'Portuguesa', ciudad: 'Villa Bruzual', municipio: 'Turén', nombre_centro: 'Avenida 4', direccion_exacta: 'Avenida 4 con calle 11, Villa Bruzual' },
  { estado: 'Portuguesa', ciudad: 'El Playón', municipio: 'Santa Rosalía', nombre_centro: 'Casa de Haide Canelón', direccion_exacta: 'Avenida Comercio, El Playón' },
  { estado: 'Portuguesa', ciudad: 'Ospino', municipio: 'Ospino', nombre_centro: 'Calle Arroyo Casa 24', direccion_exacta: 'Calle Arroyo, Casa 24, Ospino' },
  { estado: 'Portuguesa', ciudad: 'Guanare', municipio: 'Guanare', nombre_centro: 'Sede de Vente Venezuela', direccion_exacta: 'Sede de Vente Venezuela, Guanare' },
  { estado: 'Portuguesa', ciudad: 'Papelón', municipio: 'Papelón', nombre_centro: 'Sede de Vente Papelón', direccion_exacta: 'Carrera 5 entre calles 4 y 4, Papelón' },
  { estado: 'Portuguesa', ciudad: 'Guanarito', municipio: 'Guanarito', nombre_centro: 'Frente a la escuela Monseñor de Unda', direccion_exacta: 'Carrera 9 entre calles 7 y 8, Guanarito' },
  { estado: 'Portuguesa', ciudad: 'Biscucuy', municipio: 'Sucre', nombre_centro: 'Sede de Acción Democrática', direccion_exacta: 'Carrera 2 Bolívar entre calles 8 y 9, Biscucuy' },
  { estado: 'Portuguesa', ciudad: 'Boconoíto', municipio: 'San Genaro', nombre_centro: 'Frente a la iglesia católica', direccion_exacta: 'Plazoleta San Genaro, Boconoíto' },
  { estado: 'Portuguesa', ciudad: 'Chabasquén', municipio: 'Unda', nombre_centro: 'Dulces Churros', direccion_exacta: 'Avenida Sucre entre Ricaurte y Arismendi, Chabasquén' },

  // Cojedes
  { estado: 'Cojedes', ciudad: 'San Carlos', municipio: 'San Carlos', nombre_centro: 'Farmacia "Santa María"', direccion_exacta: 'Calle Manrique, frente a variedades Liberato, San Carlos' },
  { estado: 'Cojedes', ciudad: 'Tinaquillo', municipio: 'Tinaquillo', nombre_centro: 'Casa de Vente (Antigua casa familia De Lucas)', direccion_exacta: 'Avenida Principal, frente a la Plaza Bolívar, Tinaquillo' },
  { estado: 'Cojedes', ciudad: 'Las Vegas', municipio: 'Rómulo Gallegos', nombre_centro: 'Casa de Vente', direccion_exacta: 'Avenida Bolívar de Las Vegas, Sector Centro 1, Las Vegas' }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

// Fallback search maps for ambiguous addresses
const manualAddressOverrides = {
  "Urbanización El Centro, calle El Hipódromo, Maracay": "Calle El Hipódromo, Maracay, Venezuela",
  "Calle La Romana, frente al liceo Josefina Crespo, Cagua": "Calle La Romana, Cagua, Venezuela",
  "Avenida 19 de Abril, Centro Comercial La Capilla, Piso 1, Local 21, Maracay": "Avenida 19 de Abril, Maracay, Venezuela",
  "Avenida Principal, frente a AIKOS, Lechería": "Avenida Principal, Lechería, Venezuela",
  "Calle Bolívar, al lado del club Taquima, Onoto": "Calle Bolívar, Onoto, Anzoátegui, Venezuela",
  "Sede Vente Pariaguán, Pariaguán": "Pariaguán, Venezuela",
  "Sede Vente Mac Gregor, El Chaparro": "El Chaparro, Venezuela",
  "Sede Vente Libertad, San Mateo": "San Mateo, Anzoátegui, Venezuela",
  "Calle La Laguna, sector La Laguna, San Mateo": "San Mateo, Anzoátegui, Venezuela",
  "Calle Negro Primero, entre 24 de Julio y Primero de Mayo, Anaco": "Calle Negro Primero, Anaco, Venezuela",
  "Avenida Miranda, frente a la Casa Nueva Esparta, Anaco": "Avenida Miranda, Anaco, Venezuela",
  "Avenida Fernández Padilla, Clarines": "Avenida Fernández Padilla, Clarines, Venezuela",
  "8va Calle norte, cruce con la 2da carrera, detrás de Rika Pizza, El Tigre": "Calle Norte, El Tigre, Venezuela",
  "Sede Valle Guanape, Valle de Guanape": "Valle de Guanape, Venezuela",
  "Avenida Venezuela, canal lento desde la Avenida Morán hasta el Sambil, Barquisimeto": "Avenida Venezuela, Barquisimeto, Venezuela",
  "Los Rastrojos, calle 3 esquina calle Aquilino Juárez, Cabudare": "Los Rastrojos, Cabudare, Venezuela",
  "Avenida 5 entre calles 13 y 14, Parroquia Juan Bautista Rodríguez, Quíbor": "Avenida 5, Quíbor, Venezuela",
  "Calle 13 entre carrera 12 y 13, Duaca": "Calle 13, Duaca, Venezuela",
  "Avenida Dr. Pastor Oropeza entre calles 6 y 7, sector Antonio José de Sucre, Carora": "Avenida Doctor Pastor Oropeza, Carora, Venezuela",
  "Avenida Fraternidad, esquina calle 14, frente al parquecito, El Tocuyo": "Avenida Fraternidad, El Tocuyo, Venezuela",
  "Avenida principal Simón Bolívar, a 20 metros del Zaragoza, Sanare": "Avenida Principal, Sanare, Venezuela",
  "Calle 28 entre avenidas 3 y 4, Independencia": "Calle 28, Independencia, Yaracuy, Venezuela",
  "Avenida 07 entre calles 12 y 13, Chivacoa": "Avenida 7, Chivacoa, Venezuela",
  "Calle Bolívar, Sector Bucarito, Guama": "Calle Bolívar, Guama, Yaracuy, Venezuela",
  "Carrera 4 entre calles 7 y 8, Sabana de Parra": "Carrera 4, Sabana de Parra, Venezuela",
  "Calle 8 entre avenidas 01 y 02, San Pablo": "Calle 8, San Pablo, Yaracuy, Venezuela",
  "Avenida principal, esquina El Cacique entre calle 3 y 4, San Rafael de Onoto": "Avenida Principal, San Rafael de Onoto, Venezuela",
  "Avenida 4 entre calles 13 y 14, Agua Blanca": "Avenida 4, Agua Blanca, Portuguesa, Venezuela",
  "Centro Comercial Ciudad Cristal, local número 39, Acarigua-Araure": "Centro Comercial Ciudad Cristal, Acarigua, Venezuela",
  "Carrera 8 entre calles 7 y 8, Píritu": "Carrera 8, Píritu, Portuguesa, Venezuela",
  "Avenida 4 con calle 11, Villa Bruzual": "Avenida 4, Turén, Venezuela",
  "Avenida Comercio, El Playón": "Avenida Comercio, El Playón, Portuguesa, Venezuela",
  "Calle Arroyo, Casa 24, Ospino": "Calle Arroyo, Ospino, Venezuela",
  "Sede de Vente Venezuela, Guanare": "Guanare, Venezuela",
  "Carrera 5 entre calles 4 y 4, Papelón": "Carrera 5, Papelón, Venezuela",
  "Carrera 9 entre calles 7 y 8, Guanarito": "Carrera 9, Guanarito, Venezuela",
  "Carrera 2 Bolívar entre calles 8 y 9, Biscucuy": "Carrera 2, Biscucuy, Venezuela",
  "Plazoleta San Genaro, Boconoíto": "Boconoíto, Venezuela",
  "Avenida Sucre entre Ricaurte y Arismendi, Chabasquén": "Avenida Sucre, Chabasquén, Venezuela",
  "Calle Manrique, frente a variedades Liberato, San Carlos": "Calle Manrique, San Carlos, Cojedes, Venezuela",
  "Avenida Principal, frente a la Plaza Bolívar, Tinaquillo": "Avenida Principal, Tinaquillo, Venezuela",
  "Avenida Bolívar de Las Vegas, Sector Centro 1, Las Vegas": "Avenida Bolívar, Las Vegas, Cojedes, Venezuela"
};

async function geocodeAll() {
  console.log("Starting geocoding for Venezuela...");
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let query = manualAddressOverrides[item.direccion_exacta] || `${item.direccion_exacta}, ${item.ciudad}, ${item.estado}, Venezuela`;
    
    console.log(`[${i+1}/${data.length}] Geocoding: ${query}`);
    let lat = null;
    let lon = null;

    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
        headers: { 'User-Agent': 'Antigravity-VenezuelaProject-Geocoder/1.3' }
      });
      const geoData = await geoRes.json();
      
      if (geoData && geoData.length > 0) {
        lat = parseFloat(geoData[0].lat);
        lon = parseFloat(geoData[0].lon);
        console.log(` -> Found: ${lat}, ${lon}`);
      } else {
        // Fallback to City center
        const fallbackQuery = `${item.ciudad}, ${item.estado}, Venezuela`;
        console.log(` -> Not found, trying fallback: ${fallbackQuery}`);
        
        const fallbackRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fallbackQuery)}&format=json&limit=1`, {
          headers: { 'User-Agent': 'Antigravity-VenezuelaProject-Geocoder/1.3' }
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackData && fallbackData.length > 0) {
          lat = parseFloat(fallbackData[0].lat);
          lon = parseFloat(fallbackData[0].lon);
          console.log(` -> Fallback Found: ${lat}, ${lon}`);
        } else {
          // Final fallback to Estado
          const stateQuery = `${item.estado}, Venezuela`;
          console.log(` -> Fallback failed, trying State: ${stateQuery}`);
          const stateRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(stateQuery)}&format=json&limit=1`, {
            headers: { 'User-Agent': 'Antigravity-VenezuelaProject-Geocoder/1.3' }
          });
          const stateData = await stateRes.json();
          if (stateData && stateData.length > 0) {
            lat = parseFloat(stateData[0].lat);
            lon = parseFloat(stateData[0].lon);
            console.log(` -> State Found: ${lat}, ${lon}`);
          } else {
            console.log(` -> Completely failed to geocode.`);
          }
        }
      }
    } catch (e) {
      console.error(` -> Error during fetch:`, e.message);
    }

    results.push({
      ...item,
      latitud: lat,
      longitud: lon
    });

    await delay(1200); // 1.2 seconds wait to avoid Nominatim block
  }

  fs.writeFileSync('venezuela_coords.json', JSON.stringify(results, null, 2));
  console.log("Geocoding process finished. Output saved to venezuela_coords.json");
}

geocodeAll();
