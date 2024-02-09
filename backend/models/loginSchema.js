const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const LoginSchema = new Schema({
  username: String,
  password: String,
  role: Number,
});

var Logindata = mongoose.model('login_tb', LoginSchema); 
module.exports = Logindata;