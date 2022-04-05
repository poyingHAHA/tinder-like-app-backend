const mongoose = require("mongoose");
const validator = require("validator");

const {
  buyerFollowSchema,
  shopFollowSchema,
  likeItemSchema,
  tinderItemSchema,
} = require("./partial/partialSchema.js");

const buyerSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "buyer",
    },
    awardcoin: Number,
    account: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
    },
    selfIntro: {
      type: String,
    },
    likes: [likeItemSchema],
    follower: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: {
        type: Number,
        set: () => this.buyer.length + this.shop.length,
      },
    },
    following: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: {
        type: Number,
        set: () => this.buyer.length + this.shop.length,
      },
    },
    tinderLike: [tinderItemSchema],
    tinderDislike: [tinderItemSchema],
  },
  {
    timestamps: true,
  }
);

buyerSchema.virtual("sharePosts", {
  ref: "SharePost",
  localField: "_id",
  foreignField: "buyerid",
});

buyerSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "buyerid",
});

const Buyer = mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
