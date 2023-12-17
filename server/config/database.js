const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
exports.connect =()=>{ mongoose.connect(process.env.MONGO_DB_URL).then(
        console.log("DB connection successful")
    ).catch((err)=>{
        console.error(err);
        process.exit(1);
    })
}