const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
 plantname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  login_id :{
      type: mongoose.Schema.Types.ObjectId,
      require: true
  },
  product_id :{
      type: mongoose.Schema.Types.ObjectId,
      require: true
  }

});
module.exports = mongoose.model("wishlist", wishlistSchema);
