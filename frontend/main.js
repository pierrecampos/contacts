import 'core-js/stable';
import 'regenerator-runtime/runtime';

import LoginValidation from './modules/LoginValidation';
import ContactValidation from './modules/ContactValidation';

//Login Validation
const login = new LoginValidation('.form-login');
const register = new LoginValidation('.form-register');
login.init();
register.init();

//New Contact / Edit Contact Validation
const contact = new ContactValidation('.form-contact');
contact.init();
