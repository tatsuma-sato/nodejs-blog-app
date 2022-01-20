const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");

router.get("/", postController.getPosts);

router.get("/create-post", (req, res, next) => {
  res.render("blog/create-post", {
    pageTitle: "Create New Post",
  });
});
router.post("/create", postController.postNewPost);

router.get("/:postId", postController.getPostById);

router.post("/:postId/comment", commentController.postComment);

router.get("/:postId/comments", commentController.getComments);

router.post("/:postId/delete-comment",commentController.deleteComment)

module.exports = router;
