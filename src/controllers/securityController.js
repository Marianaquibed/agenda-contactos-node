const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
  renderLogin: (req, res) => {
    res.render('security/login', { error: null });
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (!user) {
        return res.render('security/login', { error: 'Credenciales inválidas.' });
      }

      // Comparar la contraseña ingresada con el hash cifrado
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.render('security/login', { error: 'Credenciales inválidas.' });
      }

      // Guardar en la sesión de Express
      req.session.user = {
        id: user.id,
        email: user.email
      };

      res.redirect('/contacts');
    } catch (error) {
      console.error(error);
      res.render('security/login', { error: 'Ocurrió un error al iniciar sesión.' });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/security/login');
    });
  }
};