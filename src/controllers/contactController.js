const db = require('../config/db');

module.exports = {
  // Listar todos los contactos (Público)
  getAll: async (req, res) => {
    try {
      const [contacts] = await db.query(`
        SELECT 
          c.id, 
          c.nombre, 
          c.telefono, 
          c.email, 
          p.nombre AS provincia,
          pa.nombre AS pais
        FROM contactos c
        LEFT JOIN provincias p ON c.provincia_id = p.id
        LEFT JOIN pais pa ON c.pais_id = pa.id
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
      const [paises] = await db.query('SELECT * FROM pais');
      
      res.render('contacts/create', { provincias, paises, error: null });
    } catch (error) {
      console.error('Error al cargar formulario de creación:', error);
      res.status(500).send('Error al cargar formulario');
    }
  },

  // Guardar nuevo contacto (Público)
  create: async (req, res) => {
    try {
      const { nombre, telefono, email, provincia_id, pais_id } = req.body;
      await db.query(
        'INSERT INTO contactos (nombre, telefono, email, provincia_id, pais_id) VALUES (?, ?, ?, ?, ?)',
        [nombre, telefono, email, provincia_id, pais_id]
      );
      res.redirect('/contacts');
    } catch (error) {
      console.error('Error al crear el contacto:', error);
      res.status(500).send('Error al crear el contacto');
    }
  },

  // Formulario para editar contacto (Protegido)
  renderEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const [[contact]] = await db.query('SELECT * FROM contactos WHERE id = ?', [id]);
      const [provincias] = await db.query('SELECT * FROM provincias');
      const [paises] = await db.query('SELECT * FROM pais');

      if (!contact) {
        return res.status(404).send('Contacto no encontrado');
      }

      res.render('contacts/edit', { contact, provincias, paises, error: null });
    } catch (error) {
      console.error('Error al cargar el contacto para editar:', error);
      res.status(500).send('Error al cargar el contacto');
    }
  },

  // Actualizar contacto (Protegido)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, telefono, email, provincia_id, pais_id } = req.body;
      await db.query(
        'UPDATE contactos SET nombre = ?, telefono = ?, email = ?, provincia_id = ?, pais_id = ? WHERE id = ?',
        [nombre, telefono, email, provincia_id, pais_id, id]
      );
      res.redirect('/contacts');
    } catch (error) {
      console.error('Error al actualizar el contacto:', error);
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
      console.error('Error al eliminar el contacto:', error);
      res.status(500).send('Error al eliminar el contacto');
    }
  }
};