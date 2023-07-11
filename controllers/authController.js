const userModel = require("../models/userModel");
const helper = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const {hashPassword, comparePassword} = helper


const resisterController = async (req, res) => {
  try {

    const{name,email,password,phone,address, role} = req.body;
    if(!name){
        return res.status(400).send({error:'name is required'})
    }
    if(!email){
       return res.status(400).send({ error: "email is required" });
    }
    if(!password){
       return res.status(400).send({ error: "password is required" });
    }
    if(!phone){
       return res.status(400).send({ error: "phone is required" });
    }
    if(!address){
       return res.status(400).send({ error: "address is required" });
    }

    const userAlredyExixt = await userModel.findOne({email:email})
    if(userAlredyExixt){
        return res.status(400).send({ message: "already registered please login" });
    }
    const phoneAlreadyExist = await userModel.findOne({phone})
    if(phoneAlreadyExist){
      return res.status(400).send({ message: "phone number already in use" });
    }
    else{
        const hashedPassword = await hashPassword(password);
        const user =  await userModel.create({ name, email,phone, address, role, password:hashedPassword })
        res.status(200).json({message:'user creacted',user})
    }

  } catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        message:'error in registration',
        error
    })
  }
};

const loginController = async (req, res) => {
  try {
    const {  email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: "email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "password is required" });
    }

    const userAlredyExixt = await userModel.findOne({ email: email });
    if (!userAlredyExixt) {
      return res.status(400).send({ message: "user not found" });
    }
    
    const isPasswordCorrect = await comparePassword(
      password,
      userAlredyExixt.password
    );
    if (!isPasswordCorrect) {
     return res.status(400).send({ message: "incorrect password" });
    } 

    const tocken = jwt.sign(
      { _id: userAlredyExixt._id },
      process.env.JWT_SECRET
    );

    res.status(200).send({
      success: true,
      user: {
        name: userAlredyExixt.name,
        email: userAlredyExixt.email,
        role: userAlredyExixt.role,
        address: userAlredyExixt.address,
        phone:userAlredyExixt.phone,
        _id: userAlredyExixt._id,
      },
      message: "logined successfully",
      tocken,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

const testController =  async(req,res)=>{
   try{
     res.send('protected route')
   }
   catch(error){
    res.status(400).send({error})
   }
}



module.exports = { resisterController, loginController, testController };
