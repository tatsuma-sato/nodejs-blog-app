const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const multer = require("multer");
upload = multer({ dest: "public/images" });

router.get("/", postController.getPosts);

router.get("/create-post", (req, res, next) => {
  res.render("blog/create-post", {
    pageTitle: "Create New Post",
  });
});

router.post("/create", upload.single("image"), postController.postNewPost);

router.get("/:postId", postController.getPostById);

router.get("/:postId/edit-post", postController.getEditPost);

router.post("/:postId/edit", postController.postEditPost);

router.post("/:postId/delete", postController.postDeletePost);

router.post("/:postId/like", postController.postLikePost);
router.post("/:postId/dislike", postController.postDislikePost);

// comment handler
router.post("/:postId/comment", commentController.postComment);

router.get("/:postId/comments", commentController.getComments);

router.post("/:postId/delete-comment", commentController.deleteComment);

module.exports = router;
