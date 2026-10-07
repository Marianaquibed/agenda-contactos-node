# Agenda de Contactos Node.js

Aplicación web para la gestión eficiente de una agenda de contactos.

---

## 1. Descripción del Proyecto

**Agenda de Contactos Node.js:** Permite a los usuarios gestionar un directorio de contactos de forma sencilla e intuitiva. 

El proyecto resuelve la necesidad de almacenar información de contacto asociando a cada persona con su respectiva provincia y país. Además, implementa un sistema de seguridad que distingue entre visitantes públicos (que solo pueden visualizar el catálogo) y usuarios registrados (capaces de añadir, editar y eliminar registros).

---

## 2. Introducción a Node.js y Express.js para Principiantes

Si nunca has trabajado con **Express.js**, piénsalo como el "motor" que permite a **Node.js** funcionar como un servidor web. Node.js nos permite ejecutar JavaScript fuera del navegador, y Express facilita la recepción de peticiones HTTP (cuando alguien entra a la web) y el envío de respuestas (páginas HTML o datos).

### Conceptos clave y filosofía:

* **Arquitectura MVC (Modelo-Vista-Controlador):** Organiza la aplicación en tres capas principales para separar responsabilidades:
  * **Modelo (Model):** Representa los datos y se comunica con la base de datos (MySQL).
  * **Vista (View):** Las pantallas HTML dinámicas que ve el usuario (usando el motor de plantillas EJS).
  * **Controlador (Controller):** La lógica de negocio que une el modelo con la vista.
* **Renderizado en el Servidor (SSR):** El servidor procesa las plantillas EJS, consulta la base de datos y genera el HTML final que se envía directamente al navegador del usuario.
* **Middlewares:** Funciones intermedias que se ejecutan antes de que una petición llegue a su destino. En este proyecto se usan middlewares para verificar si el usuario tiene una sesión activa antes de permitirle editar o borrar un contacto.

---

## 3. Estructura y Organización del Proyecto

```text
agenda-contactos-node/
├── public/
│   └── css/
│       └── estilos.css
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── contactController.js
│   │   ├── registrationController.js
│   │   └── securityController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── contactRoutes.js
│   ├── views/
│   │   ├── contacts/
│   │   │   ├── create.ejs
│   │   │   ├── edit.ejs
│   │   │   └── index.ejs
│   │   ├── registration/
│   │   │   └── register.ejs
│   │   └── security/
│   │       └── login.ejs
│   └── app.js
├── .env
├── package.json
└── README.md
```
---

## 4. Guía de Instalación y Configuración

**Requisitos previos:**

* Node.js: Versión 18.x o superior.

* npm: Gestor de paquetes de Node (incluido con Node.js).

* MySQL / MariaDB: Servidor de base de datos en ejecución (o DBeaver / PHPMyAdmin para gestión).

**Paso 1:** Clonar el repositorio
git clone https://github.com/tu-usuario/agenda-contactos-node.git
cd agenda-contactos-node

**Paso 2:** Instalar dependencias
```text
npm install
```

**Paso 3:** Configurar variables de entorno

* Crea un archivo .env en la raíz del proyecto basándote en la siguiente estructura:

```text
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=agenda_db
SESSION_SECRET=clave_secreta_para_sesiones
```

**Paso 4:** Preparar la Base de Datos
* Ejecuta el siguiente script en tu cliente MySQL (DBeaver, MySQL Workbench, etc.):

```text
CREATE DATABASE IF NOT EXISTS agenda_db;
USE agenda_db;

CREATE TABLE IF NOT EXISTS provincias (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS paises (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS contactos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
telefono VARCHAR(20),
email VARCHAR(100),
provincia_id INT,
pais_id INT,
FOREIGN KEY (provincia_id) REFERENCES provincias(id),
FOREIGN KEY (pais_id) REFERENCES paises(id)
);

CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(180) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Cómo Ejecutar el Proyecto**

* Modo Desarrollo (con recarga automática mediante Nodemon):

```text
npm run dev
```

* Modo Producción:
```text
npm start
```