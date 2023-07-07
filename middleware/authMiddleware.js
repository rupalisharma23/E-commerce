const jwt = require("jsonwebtoken");
const User = require("../models/userModel")


// signiByTocken
const requireSignIn = async(req,res,next)=>{
    try{
     const decode =  jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
     req.user = decode
     next()
    }
    catch(error){
        console.log(error)
        res.status(400).send({error})
    }
}

// AdminAccess

const AminAccress = async (req,res, next)=>{
 try{
      const user = await User.findOne({ _id: req.user._id });
      if(user.role!==1){
      return  res.status(400).send({
            message:"unauthorized"
        })
      }
      else{
        next()
      }
 }
 catch(error){
    console.log(error);
    res.status(400).send({error})
 }
}

module.exports = { requireSignIn, AminAccress };