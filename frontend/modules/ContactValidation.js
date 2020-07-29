import validator from 'validator';

export default class ContactValidation {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return;
        this.events();
    }

    events() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.validate(event);
        });
    }

    validate(event) {
        const errorFlag = false;
        const el = event.target;
        const nameInput = el.querySelector('input[name="name"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telInput = el.querySelector('input[name="tel"]');
        const labelError = el.querySelector('input[name="_csrf"');

        for (const errorText of el.querySelectorAll('.error')) {
            errorText.remove();
        }

        if (!nameInput.value) {
            this.createError('Campo Nome não pode estar vazio', nameInput);
            errorFlag = true;
        }
        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            this.createError('E-mail inválido', emailInput);
            errorFlag = true;
        }
        if (!emailInput.value && !telInput.value) {
            this.createError('Insira um e-mail', emailInput);
            this.createError('Insira um telefone', telInput);
            this.createError('Deve inserir pelo menos um e-mail ou telefone', labelError);
            errorFlag = true;
        }

        if (!errorFlag) {
            console.log(1);
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