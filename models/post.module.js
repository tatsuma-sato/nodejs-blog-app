const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
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
    favs: {
      type: Number,
    },
  },
});

postSchema.virtual('url').get(function(){
  return '/posts/' + this._id
})

module.exports = mongoose.model("Post", postSchema);
