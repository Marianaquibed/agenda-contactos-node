const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// READ: Listado
router.get('/', contactController.getAll);

// CREATE: Mostrar formulario y recibir datos del envío
router.get('/new', contactController.renderCreateForm);
router.post('/new', contactController.create);

// UPDATE: Mostrar formulario de edición y recibir actualización
router.get('/edit/:id', contactController.renderEditForm);
router.post('/edit/:id', contactController.update);

// DELETE: Procesar borrado
router.post('/delete/:id', contactController.delete);

module.exports = router;