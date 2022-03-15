const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
    content: {
      type: string
    },
    pics: [
      {
        type: string
      }
    ],
    likes: {
      type: Number
    },
    replies: [ //commentID
      {

      }
    ]
  },{
    timestamps: true
  }
)

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment