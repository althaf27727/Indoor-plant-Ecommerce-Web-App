const express = require("express");
const wishlistRoutes = express.Router();
const WishlistDB = require("../models/wishlistSchema");
const multer = require("multer");
const checkauth = require("../middleware/checkauth");
const { default: mongoose } = require("mongoose");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../myapp/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

wishlistRoutes.post("/add-wishlist", checkauth, async (req, res) => {
  console.log(req.body);
  try {
    console.log("id=", req.body._id);
    var id = req.body._id;

    const exProduct = await WishlistDB.findOne({ product_id: id });
    console.log("product", exProduct);
    if (!exProduct) {
      const Data = {
        plantname: req.body.plantname,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        login_id: req.userData.userId,
        product_id: id,
      };

      const result = await WishlistDB(Data).save();
      if (result) {
        console.log("Data added");
        res.status(200).json({
          success: true,
          error: false,
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          error: true,
          message: "Data not added",
        });
      }
    } else {
      console.log("Product already exists");
      res.status(200).json({
        success: true,
        error: false,
        message: "Product already exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      Errormessage: error.message,
    });
  }
});

wishlistRoutes.get("/view-wishlist", checkauth, (req, res) => {
  WishlistDB.aggregate([
    {
      $match: { login_id:new mongoose.Types.ObjectId(req.userData.userId) },
    },
  ])
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error: true,
        Errormessage: error.message,
      });
    });
});

wishlistRoutes.get("/view-wishlist/:id", checkauth, (req, res) => {
  WishlistDB.findOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error: true,
        Errormessage: error.message,
      });
    });
});

wishlistRoutes.delete("/delete-wishlist/:id", (req, res) => {
  WishlistDB.deleteOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error: true,
        Errormessage: error.message,
      });
    });
});

module.exports = wishlistRoutes;
