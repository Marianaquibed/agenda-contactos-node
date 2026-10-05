const db = require('../config/db');

module.exports = {
  // 1. READ: Listar contactos uniendo la tabla provincias (INNER JOIN)
  getAll: async (req, res) => {
    try {
      const [contacts] = await db.query(`
        SELECT c.id, c.nombre, c.telefono, c.email, p.nombre AS provincia 
        FROM contactos c
        INNER JOIN provincias p ON c.provincia_id = p.id
      `);
      res.render('contacts/index', { contacts, user: null });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al consultar los contactos');
    }
  },

  // 2. CREATE: Cargar provincias en el select y guardar contacto
  renderCreateForm: async (req, res) => {
    try {
      const [provincias] = await db.query('SELECT * FROM provincias');
      res.render('contacts/create', { provincias });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar provincias');
    }
  },

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
      res.status(500).send('Error al guardar contacto');
    }
  },

  // 3. UPDATE: Cargar contacto y lista de provincias
  renderEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const [[contact]] = await db.query('SELECT * FROM contactos WHERE id = ?', [id]);
      const [provincias] = await db.query('SELECT * FROM provincias');

      if (!contact) return res.redirect('/contacts');

      res.render('contacts/edit', { contact, provincias });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar el formulario de edición');
    }
  },

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

  // 4. DELETE: Eliminar contacto por ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM contactos WHERE id = ?', [id]);
      res.redirect('/contacts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar contacto');
    }
  }
};