import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import { readByEmail } from '../procedures/users.proc';

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {

    }));

    app.use(passport.initialize());
}

export { configurePassport };