// Datos simulados temporalmente
let contacts = [
  { id: 1, nombre: 'Mariana', telefono: '999999', email: 'mariana@gmail.com', provincia: 'Castellón' },
  { id: 2, nombre: 'Alex', telefono: '898658', email: 'alex@gmail.com', provincia: 'Valencia' },
  { id: 3, nombre: 'Yasmid', telefono: '777777', email: 'yasmid@gmail.com', provincia: 'Barcelona' }
];

module.exports = {
  // Mostrar lista de contactos
  getAll: (req, res) => {
    res.render('contacts/index', { contacts, user: null });
  }
};