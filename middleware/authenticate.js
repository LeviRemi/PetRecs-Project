// Check if user is authenticated or not
function authenticate(req, res, next) {
    console.log(req.path);
    // omit login and register and session API routes
    if (req.path === '/api/accounts/login/' || req.path === '/api/accounts/' || req.path === '/api/sessions/destroy') {
        return next();
    }
    if (!req.session || !req.session.user) {
        const err = new Error("You shall not pass");
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = authenticate;