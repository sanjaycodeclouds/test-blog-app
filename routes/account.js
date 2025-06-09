const { Router } = require("express")

const router = Router()

router
    .get("/dashboard", async (req, res) => {
        res.render("account/dashboard")
    })


module.exports = router