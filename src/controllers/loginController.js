const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login');
}

exports.register = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Usuário criado com sucesso !');
        req.session.save(function () {
            return res.redirect('back');
        });
    }
    catch (error) {
        console.log(error);
        res.render('404');
    }

}

exports.login = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Logado !');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/');
        });
    }
    catch (error) {
        console.log(error);
        res.render('404');
    }
};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login/index');
};
