const { Router } = require("express")
const upload = require("../middlewares/fileUpload")

const router = Router()

const {
    createBlog,
    addBlogSubmit,
    getAll,
    viewDetails,
} = require("../controllers/blog")

router
    .get("/", getAll)
    .get("/details/:id", viewDetails)

router.route("/add-blog")
    .get(createBlog)
    .post(upload.single("coverImageUrl"), addBlogSubmit)


module.exports = router