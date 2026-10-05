require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

// Middleware para procesar datos enviado por formularios POST (req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de Sesiones
app.use(session({
  secret: 'mi_clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false
}));

// Pasar la sesión del usuario a todas las plantillas EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Redirección directa de la raíz '/' al listado de contactos
app.get('/', (req, res) => {
  res.redirect('/contacts');
});

// Montar Rutas
app.use('/', authRoutes);
app.use('/contacts', contactRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución: http://localhost:${PORT}`);
});