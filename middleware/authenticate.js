// Check if user is authenticated or not
function authenticate(req, res, next) {
    //console.log(req.path);
    // omit login, register, static files, and session API routes
    if (req.path === '/api/accounts/login/' || req.path === '/api/accounts/' || req.path === '/api/sessions/destroy'
    || req.path === '/api/accounts/login' || req.path === '/api/accounts' || req.path === '/' || req.path === '/login' || req.path === '/register' || req.path === '/about'
       || req.path.substring(0,7) === '/static' || req.path === '/manifest.json' || req.path === '/favicon.ico' || req.path === '/logo192.png') {
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
