require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const path = require('path');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de plantillas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, '../public'))); // Archivos estáticos (CSS, JS)
app.use(express.urlencoded({ extended: true })); // Procesar datos enviados desde formularios HTML (POST)

// Rutas principales
app.use('/contacts', contactRoutes);

// Redirección de la raíz '/' a '/contacts'
app.get('/', (req, res) => {
  res.redirect('/contacts');
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
});