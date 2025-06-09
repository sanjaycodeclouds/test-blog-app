const { Router } = require("express")

const router = Router()

const {
    createComment
} = require("../controllers/comment")

router
    .post("/add-comment/:blogId", createComment)


module.exports = router