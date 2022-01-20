const Post = require("../models/post.module");
const Comment = require("../models/comment.model");

exports.postComment = async (req, res, next) => {
  const { name, comment } = req.body;

  const postId = req.params.postId;

  const newComment = new Comment({
    name: name,
    comment: comment,
    post: postId,
  });

  await newComment.save();

  const updatedPost = await Post.findById(postId);

  updatedPost.comments.push(newComment);

  await updatedPost.save((err, data) => {
    if (err) console.log(err);

    res.redirect("/");
    // res.render(`single-post/${postId}`, {
    //   pageTitle: updatedPost.title,
    //   post: data,
    //   commnets: data.commnets,
    // });
  });
};

exports.getComments = (req, res, next) => {
  const postId = req.params.postId;

  Comment.find((err, data) => {
    if (err) console.log(err);

    res.render("blog/comments", {
      pageTitle: "All comments",
      comments: data,
      postId,
    });
  });
};

exports.deleteComment = (req, res, next) => {
  const { commentId, postId } = req.body;

  Comment.deleteOne({ id: commentId })
    .then(() => {
      res.redirect(`/posts/${postId}/comments`);
    })
    .catch((err) => {
      console.log(err);
    });
};
