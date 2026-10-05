const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Ruta GET /contacts -> Muestra la lista
router.get('/', contactController.getAll);

module.exports = router;