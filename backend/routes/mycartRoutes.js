const express = require("express");
const mycartRoutes = express.Router();
const Mycart = require("../models/mycartSchema");

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

mycartRoutes.post(
  "/addmycart",
  checkauth,
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.userData.userId;
      const productid = req.body._id;
      const prevProduct = await Mycart.findOne({
        login_id: id,
        product_id: productid,
      });
      console.log("prevproduct", prevProduct);
      if (prevProduct !== null) {
        console.log("prevQuantity", prevProduct.quantity);

        const prevItemCount = prevProduct.quantity;
        console.log("prevItemCount", prevItemCount);

        const IncCount = prevItemCount + 1;
        console.log("inccount", IncCount);

        const updatedProduct = await Mycart.updateOne(
          { product_id: productid },
          { $set: { quantity: IncCount } }
        );
        if (updatedProduct) {
          res.status(200).json({
            success: true,
            error: false,
            message: "cart updated",
            data: updatedProduct,
          });
        } else {
          res.status(400).json({
            success: false,
            error: true,
            message: "cart not updated",
          });
        }
      } else {
        const Data = {
          plantname: req.body.plantname,
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
          login_id: req.userData.userId,
          product_id: req.body._id,
        };

        const result = await Mycart(Data).save();
        if (result) {
          res.status(200).json({
            success: true,
            error: false,
            message: "Added to cart",
            data: result,
          });
        } else {
          res.status(400).json({
            success: false,
            error: true,
            message: "Data not added",
          });
        }
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

mycartRoutes.get("/view-mycart", checkauth, (req, res) => {
  Mycart.aggregate([
    {
      $match: { login_id: new mongoose.Types.ObjectId(req.userData.userId) },
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

mycartRoutes.get("/view-mycart/:id", (req, res) => {
  Mycart.findOne({
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

mycartRoutes.delete("/delete-cartitem/:id", checkauth, (req, res) => {
  Mycart.deleteOne({
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

mycartRoutes.post("/increment/:id/:UserId", async (req, res) => {
    
  try {
    console.log(req.params.id);
      const product = await Mycart.findOne({
          login_id: req.params.UserId,
          _id: req.params.id,

      })
if(product) {
  
  const quantity = product.quantity;

  const newQuantity = quantity + 1;

  const updatedInc = await Mycart.updateOne({_id:req.params.id},{ $set:{quantity:newQuantity} });
  if (updatedInc) {
      res.status(200).json({
          success:true,
          error:false,
          message:"Quantity incremented"
      })
  }

}

      
  } catch (error) {
    res.status(500).json({
      success:false,
      error:true,
      Errormessage:error.message
    })
      
  }
})



mycartRoutes.post("/decrement/:id/:UserId", async (req, res) => {
  
try {
  console.log(req.params.id);
    const product = await Mycart.findOne({
        login_id: req.params.UserId,
        _id: req.params.id,

    })
if(product) {

const quantity = product.quantity;

const newQuantity = quantity - 1;

const updatedInc = await Mycart.updateOne({_id:req.params.id},{ $set:{quantity:newQuantity} });
if (updatedInc) {
    res.status(200).json({
        success:true,
        error:false,
        message:"Quantity decremented"
    })
}

}

    
} catch (error) {
  res.status(500).json({
    success:false,
    error:true,
    Errormessage:error.message
  })
    
}
})


module.exports = mycartRoutes;
