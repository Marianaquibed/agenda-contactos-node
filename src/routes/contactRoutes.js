const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { requireAuth } = require('../middlewares/auth');

// Rutas PÚBLICAS: Listado y Formulario de creación
router.get('/', contactController.getAll);
router.get('/new', contactController.renderCreate);
router.post('/new', contactController.create);

// Rutas PROTEGIDAS: Solo usuarios logueados pueden editar o eliminar.
// Si un visitante no logueado pulsa el botón, requireAuth lo redirige a /security/login
router.get('/edit/:id', requireAuth, contactController.renderEdit);
router.post('/edit/:id', requireAuth, contactController.update);

router.get('/delete/:id', requireAuth, contactController.delete);

module.exports = router;