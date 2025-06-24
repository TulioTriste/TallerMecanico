# TallerMecanico

# Iniciar

- en 1 terminal ponemos "npm run dev", y luego creamos otra terminal en VSC y ponemos "cd client" y luego "npm run dev"

# Aplicativos

- MySQL Server y Workbench [https://dev.mysql.com/downloads/mysql/]

# Video Guia

https://www.youtube.com/watch?v=NmkY4JgS21A

# Informativo

- Cualquier configuración de express va en el archivo *app.js*, ya que index.js es netamente para iniciarlo
- Nodemon: Con esto nos evitamos estár abriendo y cerrando el server constantemente (Min 11:00 del Video mencionado)
    * Alias: 'dev' (Este es el Alias que usarémos en la consola), así que para ejecutar usan **"npm run dev"**
- Morgan: Este "plugin" es basicamente para ver las peticiónes hechas en el servidor en la consola
- Zod: Este Framework lo usarémos para hacer validaciónes de tipo contraseñas, correo, etc
  etc. https://zod.dev/ (https://youtu.be/NmkY4JgS21A?t=6259)
- Para que el Front obtenga información del Back se deben hacer responses donde pueda acceder a la información como
  JSON, la extension thunderclient te ayuda a ver como entrega la información para comodidad. Entonces el formato para
  el request/response e insertar información sería así
    ``` js
    export const register = (req, res) => {
        const { email, password } = req.body;

        try {
            res.json({ // Aquí en formato json le enviamos la información al Front
                id: "",
                user: "",
                email: "",
            });
        } catch (error) {
            console.log(error);
        }
    }
    ```
- Inicio de la información del Frontend (https://youtu.be/NmkY4JgS21A?t=7074)

# Extensiones

- https://faztweb.com/contenido/visual-studio-code-setup-2022
- ThunderClient: Lo usarémos solo para hacer peticiónes y comprobarlas

# Tareas por fijarnos antes de terminar

- Hacer la opción de si acepta cookies, y en el caso de que no acepte desactivar la funcionalidad del token

# Parte de la idea del Proyecto
