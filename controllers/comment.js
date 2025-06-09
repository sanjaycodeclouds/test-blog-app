const Comment = require("../models/comment")

async function createComment(req, res) {
    const blogId = req.params.blogId
    const body = req.body

    await Comment.create({
        content: body.content,
        blogId: blogId,
        createdBy: req.user._id,
    })


    res.redirect(`/blog/details/${blogId}`)
}


module.exports = {
    createComment,
}