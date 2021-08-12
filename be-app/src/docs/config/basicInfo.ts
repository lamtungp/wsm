export default {
  openapi: '3.0.3', // present supported openapi version
  info: {
    title: 'Library API',
    description: 'A simple Express library API',
    version: '1.0.0', // version number
    contact: {
      name: 'Lam Tung',
      email: 'lampt2404@gmail.com',
    },
  },
  security: [{ bearerAuth: [] }],
};
