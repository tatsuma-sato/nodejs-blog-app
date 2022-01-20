const Post = require("../models/post.module");

const getById = (postId) => {
  return Post.findById(postId, (err, data) => {
    if (err) console.log(err);
    return data
  }).clone()
  // .populate('comments').exec((err,data)=>{
  //   if (err) console.log(err);
  //   return data
  // });
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
  const { title, imageUrl, content } = req.body;

  const post = new Post({ title, imageUrl, content });

  try {
    await post.save();
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
  }
};
