// Check if user is authenticated or not
function authenticate(req, res, next) {
    console.log(req.path);
    // omit login and register and session API routes
    if (req.path === '/api/accounts/login/' || req.path === '/api/accounts/' || req.path === '/api/sessions/destroy'
    || req.path === '/api/accounts/login' || req.path === '/api/accounts') {
        return next();
    }
    if (!req.session || !req.session.user) {
        const err = new Error("You shall not pass");
        console.log("End Error--------------\n");
        console.log("Session: "+req.session);
        console.log("\nUser: "+req.session.user);
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = authenticate;