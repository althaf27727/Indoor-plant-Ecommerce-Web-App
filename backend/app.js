const express = require("express");
const index = express();
const mongoose = require("mongoose");
const cors = require('cors')
const plantRoutes = require("./routes/plantRoutes");
const RegisterRouter = require("./routes/registerRoutes");
const LoginRouter = require("./routes/loginRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const mycartRoutes = require("./routes/mycartRoutes");
const port = 1010;

mongoose
  .connect(
    "mongodb+srv://althaf:277270@cluster0.dhm3b4a.mongodb.net/leaf",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((Error) => {
    console.log(Error);
  });


index.use(express.json());
index.use(express.urlencoded({ extended: true }));
index.use(cors())


index.use("/api/plant", plantRoutes);
index.use("/api/register", RegisterRouter);
index.use("/api/login", LoginRouter);
index.use("/api/wishlist", wishlistRoutes);
index.use('/api/mycart', mycartRoutes)



index.listen(port, () => {
  console.log(`server is running on port no: ${port}`);
});
