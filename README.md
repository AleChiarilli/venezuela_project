# ApoyoVzla 🇻🇪

**ApoyoVzla** es una plataforma web 100% gratuita, cívica y colaborativa diseñada para centralizar información crítica en tiempo real durante situaciones de emergencia en Venezuela. 

Nace con el objetivo de resolver el problema de la información efímera y desorganizada que abunda en redes sociales (Instagram, X, WhatsApp), ofreciendo un espacio estructurado, extremadamente ligero y accesible incluso con conexiones inestables (2G/3G) o dispositivos antiguos.

🌐 **Website:** [apoyovzla.com](https://apoyovzla.com)

---

## 🎯 Características Principales y Optimización Extrema (EDGE/GPRS)

- **Arquitectura Zero-JS:** Astro envía por defecto **0 bytes de JavaScript** al navegador. El cliente solo descarga HTML puro, ahorrando cientos de kilobytes y logrando renderizado instantáneo.
- **Fuentes Nativas (System Fonts):** Evitamos cargar fuentes externas (como Google Fonts). Se utilizan las tipografías nativas del dispositivo (`system-ui`), ahorrando la descarga de pesados archivos tipográficos.
- **Server-Side Rendering (SSR) Eficiente:** Las consultas a la base de datos (Supabase) ocurren en el servidor. El teléfono del usuario no realiza llamadas a APIs externas en el cliente (que fallarían en redes con alta latencia y pérdida de paquetes).
- **Ahorro de Datos en Imágenes:** Las imágenes subidas por los usuarios se comprimen de forma agresiva directamente en el dispositivo antes de subirse (~100KB). Además, por defecto están ocultas tras un botón interactivo para que no consuman datos móviles a menos que el usuario lo desee.
- **PWA (Progressive Web App):** Implementación de Service Workers para caché agresivo. Tras la primera carga, la estructura de la aplicación y recursos estáticos se almacenan offline, permitiendo la carga ultrarrápida (y funcionamiento básico sin conexión) en visitas posteriores.
- **Filtros Exactos:** Selectores predefinidos de los 335 municipios para asegurar consistencia de datos sin necesidad de búsquedas complejas en tiempo real.
- **Mapas Ligeros:** Se usa Leaflet/OpenStreetMap cargado asíncronamente solo cuando es necesario, evitando cuotas de API y sobrecarga en el renderizado inicial.

### 📌 Categorías Clave:
- 🫂 Búsqueda de Personas
- 🍞 Donaciones y Suministros
- 🏠 Refugios y Techos Seguros

---

## 🛠️ Stack Tecnológico

- **Frontend:** [Astro](https://astro.build/) (HTML estático y Server-Side Rendering) + Vanilla CSS.
- **Mapas:** [Leaflet.js](https://leafletjs.com/) (Open-source, sin cuotas de API de Google).
- **Backend & Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL + Storage para imágenes).
- **Despliegue:** [Cloudflare Pages](https://pages.cloudflare.com/) (Ejecutándose en el borde/edge de Suramérica para la mínima latencia en Venezuela).

---

## 🚀 Cómo correr el proyecto localmente

Si eres desarrollador y quieres probar el proyecto o contribuir:

### 1. Clona el repositorio
```bash
git clone https://github.com/AleChiarilli/venezuela_project.git
cd venezuela_project
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Supabase:
```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

*(Si necesitas acceso a una base de datos de desarrollo, ponte en contacto escribiendo a hola@theeclatmethod.com o crea un proyecto gratuito en Supabase con las siguientes tablas: `personas_desaparecidas`, `ayuda_suministros`, `refugios_temporales`).*

### 4. Corre el servidor de desarrollo
```bash
npm run dev
```
La plataforma estará disponible en `http://localhost:4321`.

---

## 🤝 Cómo Contribuir

¡Toda ayuda es bienvenida! Si tienes ideas para mejorar el código, la UX/UI o quieres añadir nuevas funcionalidades:
1. Haz un **Fork** de este repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-idea`).
3. Haz un commit de tus cambios (`git commit -m "Añadir nueva idea"`).
4. Sube los cambios a tu rama (`git push origin feature/nueva-idea`).
5. Abre un **Pull Request**.

Si no sabes programar pero tienes ideas, por favor abre un **Issue** en la pestaña de "Issues" describiendo qué te gustaría mejorar.

---

## ⚖️ Aviso de Responsabilidad

ApoyoVzla es una herramienta cívica desarrollada para sumar y ayudar. La información aquí publicada es reportada por la comunidad y no podemos verificar independientemente cada caso. Recomendamos a los usuarios aplicar sentido común, precaución y corroborar la información siempre que sea posible.

---

**Hecho con el ❤️ para Venezuela.**