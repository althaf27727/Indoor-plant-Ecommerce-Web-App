const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkauth = require("../middleware/checkauth");
const { default: mongoose } = require("mongoose");
const Registerdata = require("../models/registerSchema");
const Logindata = require("../models/loginSchema");
const LoginRouter = express.Router();


LoginRouter.post("/user-login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    if (username && password) {
      const oldUser = await Logindata.findOne({ username:username });
      console.log(oldUser)
      if (!oldUser)
        return res
          .status(404)
          .json({ success: false, error: true, message: "User doesn't Exist" });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ success: false, error: true, message: "Incorrect password" });

      const token = jwt.sign(
        {
          userId: oldUser._id,
          userRole: oldUser.role,
          userName: oldUser.username,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      console.log("token", token);
      return res.status(200).json({
        success: true,
        error: false,
        token: token,
        expiresIn: 3600,
        loginId: oldUser._id,
        userRole: oldUser.role,
        userName: oldUser.username,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

LoginRouter.get("/profile", checkauth, (req, res) => {
  Registerdata.aggregate([
    {
      $lookup: {
        from: 'login_tbs', 
        localField: 'login_id', 
        foreignField: '_id', 
        as: 'result'
      }
    }, {
      $unwind: {
        path: '$result'
      }
    }, 
    {
      $match: { login_id: new mongoose.Types.ObjectId(req.userData.userId) },
    },{
      $group: {
        _id: '$_id', 
        name: {
          $first: '$name'
        }, 
        mobile: {
          $first: '$mobile'
        }, 
        email: {
          $first: '$email'
        }, 
        username: {
          $first: '$result.username'
        }, 
        password: {
          $first: '$result.password'
        }
      }
    }
  ])
    
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        err: err.message,
      });
    });
});


module.exports = LoginRouter;