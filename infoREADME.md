# WorkNest - Frontend

Este es el repositorio del frontend para la aplicación de gestión de tareas "WorkNest".

## Stack Tecnológico

- **Framework:** React (https://reactjs.org/)
- **Bundler:** Vite (https://vitejs.dev/)
- **Estilos:** TailwindCSS (https://tailwindcss.com/)
- **Routing:** Wouter (https://github.com/molefrog/wouter)
- **Peticiones API:** Axios (https://axios-http.com/)
- **Formularios:** React Hook Form (https://react-hook-form.com/) y Zod(https://zod.dev/)
- **Drag & Drop:** Dnd-Kit (https://dndkit.com/)
- **Iconos:** Lucide React (https://lucide.dev/)

---

## Configuración

Antes de instalar las dependencias, hay que configurar la variable de entorno que indica dónde se encuentra la API de backend.

1.  En la raíz del proyecto, crea un archivo llamado `.env` (puedes duplicar y renombrar `.env.example` si existe).
2.  Abre el archivo `.env` y agrega la siguiente línea:

    ```bash
    VITE_API_URL=https://localhost:7007/api
    ```

    **Importante:** Esta https://localhost:7007/api es la URL del backend

---

## Instalación

Para poner en marcha el proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el repositorio**

    ```bash
    git clone [URL-DEL-REPOSITORIO]
    cd [NOMBRE-DEL-DIRECTORIO]
    ```

2.  **Instalar dependencias**

    ```bash
    npm install
    ```

---

## Ejecutar en Modo Desarrollo

Para correr la aplicación en un servidor de desarrollo local

1.  **Iniciar el servidor Vite:**

    ```bash
    npm run dev
    ```

2.  Abre tu navegador y abre la URL que aparece en la terminal (generalmente `http://localhost:5173`).

---

## Build para Producción

Para compilar y optimizar la aplicación para producción:

1.  **Crear la build:**

    ```bash
    npm run build
    ```

2.  **Previsualizar la build (Opcional):**
    Si deseas probar la build de producción localmente antes de desplegarla:
    ```bash
    npm run preview
    ```
