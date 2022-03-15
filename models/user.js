const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      require: true,
      trim: true
    },
    email:{
      type: String,
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is invalid")
        }
      }
    },
    age: {
      type: Number
    },
    account:{
      type: String
    },
    password: {
      type: String
    },
    profilePic:{
      type: String
    },
    selfIntro:{
      type: String
    },
    followers:[ // 直接放user
      {
        follower: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    followings:[ // 直接放user
      {
        following: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    role: {
      type: String,
      enum: ['seller', 'buyer', 'admin'],
      require: true
    },
    sharedPosts:[
      {
        sharedPost: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      }
    ],
    likes:[
      {
        productID: { // Product
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        stayTime: {
          type: Number
        },
        score: {
          type: Number
        },
        swipeDate:{
          type: Date
        }
      }
    ],
    dislikes:[
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        stayTime: {
          type: Number
        },
        score: {
          type: Number
        },
        swipeDate:{
          type: Date
        }
      }
    ],
    history:[
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ],
    recommendPool:[
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        totalScore: {
          type: Number
        }
      }
    ]
  },{
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)
module.exports = User