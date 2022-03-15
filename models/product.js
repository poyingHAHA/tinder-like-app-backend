const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    }
  }
)

const Product = mongoose.model("Product" ,productSchema)
module.exports = Product 