const express = require('express');
const dotenv = require("dotenv");
const mongoConnecction = require("./config/db")
const authRoute = require("./routes/authRoute")

dotenv.config()
mongoConnecction();

const app = express();
app.use(express.json());
// for cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`)
})