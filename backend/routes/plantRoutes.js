const express = require("express");
const plantRoutes = express.Router();
const Plant = require("../models/plantSchema");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../myapp/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

plantRoutes.post("/add-plant", upload.single("image"), async (req, res) => {
  console.log("hi", req.filename);

  try {
    const Data = {
      plantname: req.body.plantname,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
    };

    const result = await Plant(Data).save();
    if (result) {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      Errormessage: error.message,
    });
  }
});

plantRoutes.get("/view-plant", (req, res) => {
  Plant.find()
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

plantRoutes.get("/view-plant/:id", (req, res) => {
  Plant.findOne({
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

plantRoutes.delete("/delete-plant/:id", (req, res) => {
  Plant.deleteOne({
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



plantRoutes.post(
  "/update-plant/:id",
  upload.single("image"),
  async (req, res) => {
    try {
    //   console.log(req.file);
      const oldPlant = await Plant.findOne({
        _id: req.params.id,
      });
      console.log(oldPlant)

      const Data = {
        plantname: req.body.plantname ? req.body.plantname : oldPlant.plantname,
        description: req.body.description
          ? req.body.description
          : oldPlant.description,
        price: req.body.price ? req.body.price : oldPlant.price,
        image: req.file ? req.file.filename : oldPlant.image,
      };

      const updatePlant = await Plant.updateOne(
        { _id: req.params.id },
        { $set: Data }
      );
      if (updatePlant) {
        res.status(200).json({
          success: true,
          error: false,
          data: updatePlant,
        });
      } else {
        res.status(400).json({
          success: false,
          error: true,
          message: "Data not updated",
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
  }
);

module.exports = plantRoutes;
