import passport from 'passport';

function tokenMiddleware(req, res, next) {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!user) {
            return res.status(401).json(info);
        } else {
            return next();
        }
    })(req, res, next);
}

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

export { tokenMiddleware, isLoggedIn };