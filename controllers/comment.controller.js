const Post = require("../models/post.module");
const Comment = require("../models/comment.model");
const mongoose = require("mongoose");

exports.postComment = async (req, res, next) => {
  let { name, comment } = req.body;
  const postId = req.params.postId;

  if (!name) {
    name = "unknown";
  }

  const updatedPost = await Post.findById(postId);

  const newComment = new Comment({
    name: name,
    comment: comment,
    post: postId,
  });

  await newComment.save();

  updatedPost.comments.push(newComment);

  await updatedPost.save((err, data) => {
    if (err) console.log(err);
    res.redirect(`/posts/${postId}`);
  });
};

exports.getComments = (req, res, next) => {
  const postId = mongoose.Types.ObjectId(req.params.postId);

  Comment.find({ post: postId }, (err, data) => {
    if (err) console.log(err);

    res.render("blog/comments", {
      pageTitle: "All comments",
      comments: data,
      postId,
    });
  });
};

// exports.deleteComment = async (req, res, next) => {
//   const { commentId, postId } = req.body;

//   Comment.deleteOne({ id: commentId })
//     .then(async () => {
//       const doc = await Post.findById(postId);
//       await doc.comments.pull({ _id: commentId });
//       await doc.save();

//       res.redirect(`/posts/${postId}/comments`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.deleteComment = async (req, res, next) => {
  const { commentId, postId } = req.body;
  //changed to filter the _id property instead of id
  Comment.deleteOne({ _id: commentId })
    .then(async () => {
      //refactored to using update than going through find --> pull --> save
      await Post.updateOne({ _id: postId }, { $pull: { comments: commentId } });

      res.redirect(`/posts/${postId}/comments`);
    })
    .catch((err) => {
      console.log(err);
    });
};
