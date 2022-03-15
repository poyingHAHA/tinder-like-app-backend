const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    likes:{
      type: Number
    }
  },{
    timestamps: true
  }
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post