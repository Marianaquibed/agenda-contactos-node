// Simulación temporal de datos
let contacts = [
  { id: 1, nombre: 'Mariana', telefono: '999999', email: 'mariana@gmail.com', provincia: 'Castellón' },
  { id: 2, nombre: 'Alex', telefono: '898658', email: 'alex@gmail.com', provincia: 'Valencia' },
  { id: 3, nombre: 'Yasmid', telefono: '777777', email: 'yasmid@gmail.com', provincia: 'Barcelona' }
];

module.exports = {
  // 1. READ: Listar
  getAll: (req, res) => {
    res.render('contacts/index', { contacts, user: null });
  },

  // 2. CREATE: Formulario y procesado
  renderCreateForm: (req, res) => {
    res.render('contacts/create');
  },
  create: (req, res) => {
    const { nombre, telefono, email, provincia } = req.body;
    const newContact = {
      id: Date.now(), // Genera un ID único basado en el timestamp
      nombre,
      telefono,
      email,
      provincia
    };
    contacts.push(newContact);
    res.redirect('/contacts');
  },

  // 3. UPDATE: Formulario de edición y procesado
  renderEditForm: (req, res) => {
    const contact = contacts.find(c => c.id == req.params.id);
    if (!contact) {
      return res.redirect('/contacts');
    }
    res.render('contacts/edit', { contact });
  },
  update: (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, provincia } = req.body;
    
    contacts = contacts.map(c => 
      c.id == id ? { id: Number(id), nombre, telefono, email, provincia } : c
    );
    res.redirect('/contacts');
  },

  // 4. DELETE: Eliminar contacto
  delete: (req, res) => {
    const { id } = req.params;
    contacts = contacts.filter(c => c.id != id);
    res.redirect('/contacts');
  }
};