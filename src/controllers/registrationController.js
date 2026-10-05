const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
  renderRegister: (req, res) => {
    res.render('registration/register', { error: null });
  },

  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validar datos de entrada
      if (!email || !password) {
        return res.render('registration/register', { error: 'Todos los campos son obligatorios.' });
      }

      // Comprobar si el usuario ya existe
      const [[existingUser]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser) {
        return res.render('registration/register', { error: 'El correo electrónico ya está registrado.' });
      }

      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar nuevo usuario en MySQL
      await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

      // Redirigir al formulario de login
      res.redirect('/security/login');
    } catch (error) {
      console.error('Error detallado en registro:', error);
      res.render('registration/register', { error: 'Ocurrió un error al registrar la cuenta.' });
    }
  }
};