const User = require("../models/user")


// Start:: Sign in
async function signIn(req, res) {
    try {
        res.render("user/signin")
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).render("user/login", {
            error: "Something went wrong. Please try again.",
        });
    }
}

async function signInSubmit(req, res) {
    const { email, password } = req.body
    try {
        if (!email || !password)
            return res.render("user/signin", {error: "Add fields are required"})

        const token = await User.matchPasswordAndGenerateToken(email, password);

        if (!token)
            return res.render("user/signin", { error: "Invalid email or password." });

        res.cookie("_token", token).redirect("/account/dashboard");
        
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).render("user/signin", {error: "Invalid email or password."});
    }
}
// End:: Sign in


// Start:: Sign up
async function signUp(req, res) {
    res.render("user/signup")
}

async function signUpSubmit(req, res) {
    try {
        const { fullName, email, password } = req.body

        console.log(req.body);
        

        if (!fullName || !email || !password)
            return res.render("user/signup", {error: "Add fields are required"})

        const user = await User.create({
            fullName,
            email,
            password
        })

        res.redirect("/user/signin")
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).render("user/signup", {
            error: "Something went wrong. Please try again.",
        });
    }
}
// End:: Sign up


// Start:: Signout
async function signout(req, res) {
    res.clearCookie("_token").redirect("/user/signin")
}
// End:: Signout



module.exports = {
    signIn,
    signInSubmit,
    signUp,
    signUpSubmit,
    signout
}