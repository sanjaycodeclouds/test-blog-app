const { Router } = require("express")

const router = Router()

const {
    signIn,
    signInSubmit,
    signUp,
    signUpSubmit,
    signout
} = require("../controllers/user")


// Auth Routes
router
    .route("/signin")
    .get(signIn)
    .post(signInSubmit);

router
    .route("/signup")
    .get(signUp)
    .post(signUpSubmit);

router
    .get("/signout", signout)


module.exports = router