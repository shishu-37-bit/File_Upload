const mongoose = require("mongoose");

require("dotenv").config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log("Database connection failed");
        console.log(err);
        process.exit(1);
    });
}