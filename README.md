📦 CRUD SPA de Productos (Versión Estudiante)
Este proyecto es una aplicación web de una sola página (SPA) construida con JavaScript Vanilla y Bootstrap, que permite a los usuarios registrarse, iniciar sesión y gestionar sus productos personales (crear, listar, editar y eliminar).

🚀 Tecnologías utilizadas
HTML5

JavaScript (ES6)

Bootstrap 5.3

JSON Server (para simular una API REST)

📁 Estructura del proyecto
bash
Copiar
Editar
crud-spa-alumno/
├── index.html
├── db.json
└── assets/
    └── js/
        ├── routes.js       # Manejo de rutas SPA
        ├── auth.js         # Registro, login, sesión
        ├── products.js     # CRUD de productos
        └── main.js         # Inicialización
⚙️ Cómo ejecutar el proyecto
1. Instalar JSON Server
Si no lo tienes:

bash
Copiar
Editar
npm install -g json-server
2. Iniciar el servidor
bash
Copiar
Editar
json-server --watch db.json
Esto iniciará la API falsa en http://localhost:3000.

3. Abrir la aplicación
Abre el archivo index.html directamente en el navegador.

🧩 Funcionalidades
✅ Registro de nuevos usuarios.

✅ Inicio de sesión.

✅ Cada usuario puede:

Crear productos.

Editar sus productos.

Eliminar sus productos.

Ver solo sus propios productos.

❌ No incluye roles ni historial.

🧠 Lógica SPA
El enrutamiento se maneja usando location.hash (#login, #register, #app) y un archivo routes.js que renderiza las vistas dinámicamente en la misma página.

📌 Notas
El proyecto está hecho para fines educativos.

Código limpio y estructurado en módulos simples.

Todos los estilos están hechos con Bootstrap, sin CSS personalizado.

