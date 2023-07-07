const mongoose = require("mongoose");

const connectionDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb ${conn.connection.host}`)
    }
    catch(error){
        console.log(`error in mongodb ${error}`)
    }
}

module.exports = connectionDB;