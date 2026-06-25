// src/lib/clientStorage.ts

/**
 * Compresses an image on the client side using HTML5 Canvas and uploads it directly to Supabase Storage via REST API.
 * This avoids loading the heavy Supabase JS SDK on the client side.
 * 
 * @param file The file selected by the user
 * @param supabaseUrl The Supabase URL
 * @param supabaseAnonKey The Supabase Anon Key
 * @param bucketName The name of the storage bucket (e.g. 'imagenes_emergencia')
 * @returns The public URL of the uploaded image
 */
export async function compressAndUploadImage(
  file: File,
  supabaseUrl: string,
  supabaseAnonKey: string,
  bucketName: string = 'imagenes_emergencia'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Target dimensions (max 800px)
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto 2D del Canvas'));
          return;
        }

        // Draw image with new dimensions
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP blob with 0.6 quality (compromise between quality and size)
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error('Fallo al convertir la imagen a Blob'));
              return;
            }

            try {
              // Generate unique file name
              const extension = 'webp';
              const rand = Math.random().toString(36).substring(2, 8);
              const fileName = `${Date.now()}-${rand}.${extension}`;

              // Direct REST upload to Supabase Storage
              const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${fileName}`;
              const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                  'apikey': supabaseAnonKey,
                  'Authorization': `Bearer ${supabaseAnonKey}`,
                  'Content-Type': 'image/webp'
                },
                body: blob
              });

              if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Error en la subida a Supabase Storage: ${errText}`);
              }

              // Return the public URL
              const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${fileName}`;
              resolve(publicUrl);
            } catch (err) {
              reject(err);
            }
          },
          'image/webp',
          0.6
        );
      };
      img.onerror = () => reject(new Error('Fallo al cargar la imagen en memoria'));
    };
    reader.onerror = () => reject(new Error('Fallo al leer el archivo de la imagen'));
  });
}
