const Post = require("../models/post.module");
const Comment = require("../models/comment.model");
const fs = require("fs");
const path = require("path");

const getById = (postId) => {
  return Post.findById(postId, (err, data) => {
    if (err) console.log(err);
    return data;
  }).clone();
};

exports.getPosts = (req, res, next) => {
  Post.find((err, data) => {
    if (err) console.log(err);

    res.render("blog/home", {
      pageTitle: "Blog Posts",
      posts: data,
    });
  });
};

exports.getPostById = async (req, res, next) => {
  const {
    params: { postId },
  } = req;

  const post = await getById(postId);

  res.render("blog/single-post", {
    pageTitle: post.title,
    post: post,
  });
};

exports.postNewPost = async (req, res, next) => {

  const { title, content, postId, } = req.body;
  const imageData = {
    data: fs.readFileSync(
      path.join(__dirname,"../public",'images',req.file.filename)
    ),
    contentType: "image/jpeg",
  };
  // const image = new Image(imageData)
  // await image.save()
  // console.log(image);
  // console.log(req.body);
  // console.log(req.file);
  const post = new Post({ title, imageData, content });

  try {
    await post.save();
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
  }
};

exports.getEditPost = async (req, res, next) => {
  const {
    params: { postId },
  } = req;

  const post = await getById(postId);
  res.render("blog/edit-post", {
    pageTitle: post.title,
    post: post,
  });
};

exports.postEditPost = async (req, res, next) => {
  const { title, imageUrl, content, postId } = req.body;

  const post = await getById(postId);

  post.title = title;
  post.imageUrl = imageUrl;
  post.content = content;

  await post.save();
  res.redirect("/posts");
};

exports.postDeletePost = async (req, res, next) => {
  const { postId } = req.body;

  await Comment.deleteMany({ post: postId });

  await Post.deleteOne({ _id: postId })
    .then(() => {
      res.redirect("/posts");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLikePost = async (req, res, next) => {
  const {
    params: { postId },
  } = req;

  const post = await getById(postId);

  await post.likePost();

  res.redirect(`/posts/${postId}`);
};

exports.postDislikePost = async (req, res, next) => {
  const {
    params: { postId },
  } = req;

  const post = await getById(postId);

  await post.dislikePost();

  res.redirect(`/posts/${postId}`);
};
