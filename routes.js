const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middlewares');
//Home Routes
routes.get('/', loginRequired, homeController.index);

//Login Routes
routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout);

//Contact Routes
routes.get('/contacts/index', loginRequired, contactController.index);
routes.post('/contacts/register', loginRequired, contactController.register);
routes.get('/contacts/index/:id', loginRequired, contactController.editIndex);
routes.post('/contacts/edit/:id', loginRequired, contactController.editContact);
routes.get('/contacts/delete/:id', loginRequired, contactController.delete);


module.exports = routes;