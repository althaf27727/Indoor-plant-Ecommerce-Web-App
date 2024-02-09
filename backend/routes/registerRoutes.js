const express = require("express");
const RegisterRouter = express.Router();
const bcrypt = require("bcryptjs");
const registerDB = require("../models/registerSchema");
const loginDB = require("../models/loginSchema");



RegisterRouter.post("/user-registration", async (req, res) => {
    try {
      const oldUser = await loginDB.findOne({ username: req.body.username });
      if (oldUser) {
        return res
          .status(400)
          .json({ success: false, error: true, message: "User already exists" });
      }
  
      const oldmobile = await registerDB.findOne({ mobile: req.body.mobile });
      if (oldmobile) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Phone number already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
  
      let log = {
        username: req.body.username,
        password: hashedPassword,
        role: 2,
      };
      const result = await loginDB(log).save();
      let reg = {
        login_id: result._id,
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
      };
      const result2 = await registerDB(reg).save();
      if (result2) {
        res.status(201).json({
          success: true,
          error: false,
          message: "Registration completed",
          details: result2,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: true, message: "Something went wrong" });
      console.log(error);
    }
  });
  
  
  
  module.exports = RegisterRouter;