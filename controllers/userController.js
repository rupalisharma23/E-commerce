const userModel = require("../models/userModel");

const userController = async( req,res) =>{
    try{
        const id = req.params.id;
        const {name,email,address,phone} = req.body
        const userAlreadyExist = await userModel.findOne({email, _id: { $ne: id }})
        if(userAlreadyExist){
           return res.status(400).send({message:'email is already in use'})
        }       
        const phoneAlreadyExist = await userModel.findOne({ phone, _id: { $ne: id } });
        if (phoneAlreadyExist) {
          return res.status(400).send({ message: "phone is already in use" });
        }
        const user = await userModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})
        res.status(200).send({
          message: "user details updated",
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
            phone: user.phone,
            _id: user._id,
          },
        });

    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error})
    }
}

module.exports = userController;