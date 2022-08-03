const passport = require('passport');

const postRegister = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        const error = new Error('Email or password is missing');
        error.status = 400;
        return next(error);
    }

    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json(user);
        });
    };
    passport.authenticate('register', done)(req);
};

const postLogin = (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json(user);
        });
    };
    passport.authenticate('login', done)(req);
};

const postLogout = async (req, res, next) => {
    if (req.user) {
        await req.logout(() => {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                return res.status(200).json('¡Goodbye!');
            });
        });
    } else {
        return res.sendStatus(304);
    }
};

const getCheckSession = async(req, res, nex) => {
    if(req.user) {
        let userRegister = req.user;
        userRegister.password = null;

        return res.status(200).json(userRegister);
    } else {
        return res.status(400).json({message: 'No user found'});
    }
}

module.exports = {
    postRegister,
    postLogin,
    postLogout,
    getCheckSession,
};