const Blog = require("../models/blog")
const Comment = require("../models/comment")
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: 'uploads/' })

async function createBlog(req, res) {
    res.render("blog/add-blog")
}


async function addBlogSubmit(req, res) {
    try {
        const body = req.body
        
        const coverImageUrl = req.file;

        const user = req.user;

        console.log(body);

        if (!body.title || !body.body || !coverImageUrl) {
            return res.render("blog/add-blog", {error: "Add fields are required"})
        }

        // Example: Saving to DB
        await Blog.create({
        title: body.title,
        body: body.body,
        coverImageUrl: coverImageUrl.path,
        createdBy: user._id,
        });

        res.redirect("/blog/");
    } catch (err) {
        console.error("Add blog error:", err);
        res.status(500).render("blog/add-blog", {
            error: "Something went wrong. Please try again.",
        });
    }
}


async function getAll(req, res) {
    const allBlogs = await Blog.find({})

    console.log(allBlogs)

    res.render("blog/home", {
        user: req.user,
        blogs: allBlogs
    })
}


async function viewDetails(req, res) {
    const id = req.params.id
    const blogDetails = await Blog.findById(id).populate("createdBy")

    // console.log(blogDetails)


    const allComment = await Comment.find({blogId: id}).populate("createdBy")

    // console.log(allComment)

    res.render("blog/details", {
        user: req.user,
        blogDetails: blogDetails,
        allComment: allComment
    })
}


module.exports = {
    createBlog,
    addBlogSubmit,
    getAll,
    viewDetails,
}