const express = require('express');
const dotenv = require("dotenv");
const mongoConnecction = require("./config/db")
const authRoute = require("./routes/authRoute")
const categoryRoute = require("./routes/categoryRoute")
const productRoute = require("./routes/productRoutes")
const cors = require("cors");
// const formidableMiddleware = require("express-formidable");

dotenv.config()
mongoConnecction();

const app = express();
app.use(express.json());
// app.use(formidableMiddleware());
// for cors
const allowedOrigins = [ "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers","authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/api/auth', authRoute)
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`)
})