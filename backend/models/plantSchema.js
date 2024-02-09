const mongoose = require("mongoose");
const plantSchema = new mongoose.Schema({
  plantname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("plant", plantSchema);
