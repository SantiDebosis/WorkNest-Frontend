# WorkNest - Frontend

Este es el repositorio del frontend para la aplicación de gestión de tareas "WorkNest".
Es una aplicación web desarrollada para la gestión de tareas y proyectos, la cual implementa el modelo Kanban. El objetivo de WorkNest es permitir una organización visual del trabajo. La aplicación le permite a los usuarios:

- **Crear Tableros, que representan los proyectos.**
- **Definir Columnas dentro de esos tableros, que representan las etapas del flujo (por ejemplo: "Pendiente", "En Proceso", "Hecho").**
- **Y añadir Tarjetas, que son las tareas individuales.**

La funcionalidad clave es que estas tarjetas se pueden arrastrar y soltar (drag and drop) entre las columnas. Esto permite que un usuario o un equipo pueda ver, de un solo vistazo, el estado exacto de cada tarea. En resumen, WorkNest es una herramienta para centralizar y visualizar el progreso de un proyecto de forma clara y sencilla.

## Tecnologias Utilizadas

### Frontend

- **REACT(JSX,JS)**
- **TailwindCSS**
- **Axios**
- **Wouter**
- **Zod**
- **Ract-Hook-Form**
- **Dnd-Kit (drag and drop)**
- **Lucide React (iconos**)

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

El back espera la URL http://localhost:4173/
