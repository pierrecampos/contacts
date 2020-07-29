import validator from 'validator';

export default class LoginValidation {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if(!this.form) return;
        this.events();
    }

    events() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.validate(event);
        });
    }

    validate(event) {
        let error = false;
        const el = event.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        for(const errorText of this.form.querySelectorAll('.error')){            
            errorText.remove();
        }

        if (!validator.isEmail(emailInput.value)) {
            this.createError('E-mail inválido', emailInput);
            error = true;
        }

        if (passwordInput.value.length < 5 || passwordInput.value.length > 15) {
            this.createError('Senha inválida', passwordInput);
            error = true;
        }

        if (!error) {
            el.submit();
        }
    }


    createError(msg, local) {
        const small = document.createElement('small');
        small.innerText = msg;
        small.classList.add('text-danger', 'error');

        local.insertAdjacentElement('afterend', small);
    }
}