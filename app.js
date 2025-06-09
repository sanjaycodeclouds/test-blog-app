require('dotenv').config()

const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 3000


// Start:: View Engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
// End:: View Engine


// Start:: Connect to MongoDB
const { connectToMongoDB } = require("./connection")

connectToMongoDB(process.env.MONGODB_URL)
    .then( () => {
        console.log("Database connection established")
    } )
    .catch( (err) => {
        console.log("Error in database connection", err.message)
    } )
// End:: Connect to MongoDB


// Start:: Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/uploads", express.static(path.resolve("./uploads")));


const { checkForAuthenticationCookie } = require("./middlewares/authentication")
// End:: Middlewares


// Start:: route
app.get("/", (req, res) => {
    res.render("home")
})

const userRoutes = require("./routes/user")
app.use("/user", userRoutes)

const accountRoutes = require("./routes/account")
app.use("/account", checkForAuthenticationCookie("_token"), accountRoutes)

const blogRoutes = require("./routes/blog")
app.use("/blog", checkForAuthenticationCookie("_token"), blogRoutes)

const commentRoutes = require("./routes/comment")
app.use("/comment", checkForAuthenticationCookie("_token"), commentRoutes)
// End:: route


app.listen(PORT, () => { console.log(`Server started at port:${PORT}`) })