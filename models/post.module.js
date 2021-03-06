const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageData: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  editDate: {
    type: Date,
    default: null,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  meta: {
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
});

postSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

postSchema.methods.likePost = function () {
  this.meta.likes += 1;
  return this.save();
};

postSchema.methods.dislikePost = function () {
  this.meta.dislikes += 1;
  return this.save();
};

module.exports = mongoose.model("Post", postSchema);
