require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");


//express app
const app = express();

//midlewares
app.use(express.json());

//routes
app.use("/api/todos", todoRoutes);
app.use('/api/user', userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening for request on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

