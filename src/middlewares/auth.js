module.exports = {
  requireAuth: (req, res, next) => {
    // Si existe la sesión del usuario, permite continuar al controlador
    if (req.session && req.session.user) {
      return next();
    }
    // Si no está logueado, redirige automáticamente al formulario de login
    return res.redirect('/security/login');
  }
};