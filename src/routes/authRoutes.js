const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const securityController = require('../controllers/securityController');

// Rutas de Registro (RegistrationController)
router.get('/register', registrationController.renderRegister);
router.post('/register', registrationController.register);

// Rutas de Seguridad / Login - Logout (SecurityController)
router.get('/security/login', securityController.renderLogin);
router.post('/security/login', securityController.login);
router.get('/security/logout', securityController.logout);

module.exports = router;