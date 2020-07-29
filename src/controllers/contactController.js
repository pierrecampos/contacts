const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contacts', { contact: {} });
};

exports.register = async (req, res) => {

    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato criado !');
        req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`));

    }
    catch (error) {
        console.log(error);
        res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');

        const contact = await Contact.searchById(req.params.id);

        if (!contact) return res.render('404');
        res.render('contacts', { contact });

    }
    catch (error) {
        console.log(error);
        res.render('404');
    }
}

exports.editContact = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato editado !');
        req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`));

    }
    catch (error) {
        console.log(error);
        res.render('404');
    }
}

exports.delete = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');

        const contact = await Contact.delete(req.params.id);
        if (!contact) return res.render('404');

        req.flash('success', 'Contato Deletado !');
        req.session.save(() => res.redirect(`back`));
        return;

    }
    catch (error) {
        console.log(error);
        res.redirect('404');
    }
}