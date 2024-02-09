const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const RegisterSchema = new Schema({
  login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
  name: { type: String, required: true },
  
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  
});

var Registerdata = mongoose.model('register_tb', RegisterSchema); 
module.exports = Registerdata;