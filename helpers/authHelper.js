const bcrypt = require("bcrypt");

const hashPassword = async (password) =>{
    try{
         const salt = 10;
         const hashedPassword = await bcrypt.hash(password, salt);
         return hashedPassword
    }
    catch(error){
        console.log(`error in authHelper ${error}`)
    }
}

 const comparePassword = async (password, hashedPassword) =>{
    try{
    const isCompared = await bcrypt.compare(password, hashedPassword)
    return isCompared
    }
    catch(error){
        console.log(`error in authHelper ${error}`);
    }
}

module.exports = {hashPassword, comparePassword} 