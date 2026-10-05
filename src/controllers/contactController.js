const db = require('../config/db');

module.exports = {
  // Listar todos los contactos (Público)
  getAll: async (req, res) => {
    try {
      const [contacts] = await db.query(`
        SELECT c.id, c.nombre, c.telefono, c.email, p.nombre AS provincia 
        FROM contactos c
        INNER JOIN provincias p ON c.provincia_id = p.id
      `);
      
      res.render('contacts/index', { 
        contacts, 
        user: req.session.user || null 
      });
    } catch (error) {
      console.error('Error al listar contactos:', error);
      res.status(500).send('Error al consultar los contactos');
    }
  },

  // Formulario para crear contacto (Público)
  renderCreate: async (req, res) => {
    try {
      const [provincias] = await db.query('SELECT * FROM provincias');
      res.render('contacts/create', { provincias, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar formulario');
    }
  },

  // Guardar nuevo contacto (Público)
  create: async (req, res) => {
    try {
      const { nombre, telefono, email, provincia_id } = req.body;
      await db.query(
        'INSERT INTO contactos (nombre, telefono, email, provincia_id) VALUES (?, ?, ?, ?)',
        [nombre, telefono, email, provincia_id]
      );
      res.redirect('/contacts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el contacto');
    }
  },

  // Formulario para editar contacto (Protegido)
  renderEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const [[contact]] = await db.query('SELECT * FROM contactos WHERE id = ?', [id]);
      const [provincias] = await db.query('SELECT * FROM provincias');
      res.render('contacts/edit', { contact, provincias, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar el contacto');
    }
  },

  // Actualizar contacto (Protegido)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, telefono, email, provincia_id } = req.body;
      await db.query(
        'UPDATE contactos SET nombre = ?, telefono = ?, email = ?, provincia_id = ? WHERE id = ?',
        [nombre, telefono, email, provincia_id, id]
      );
      res.redirect('/contacts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar el contacto');
    }
  },

  // Borrar contacto (Protegido)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM contactos WHERE id = ?', [id]);
      res.redirect('/contacts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el contacto');
    }
  }
};