const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieToken) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieToken]

        if (!tokenCookieValue) res.redirect("/user/signin");

        const userData = validateToken(tokenCookieValue)

        if (!userData) res.redirect("/user/signin");

        req.user = userData;
        
        res.locals.user = userData;

        next();
    }
}


module.exports = {
    checkForAuthenticationCookie,
}