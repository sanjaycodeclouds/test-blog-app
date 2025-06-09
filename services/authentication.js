const JWT = require("jsonwebtoken")

const JWT_SECRET = "Sanjaydev@123$#@!"



function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
    }

    const token = JWT.sign(payload, JWT_SECRET, { expiresIn: "1d" })

    return token;
}

function validateToken(token) {
    try {
        return JWT.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}


module.exports = {
    createTokenForUser,
    validateToken,
}