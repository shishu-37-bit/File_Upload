//app creatte
const express=require("express");

const app=express();

//finding port
require("dotenv").config();

const PORT=process.env.PORT || 4000;

//middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

//database connection
const dbconnect=require("./config/database");
dbconnect.connect();

//cloudinary connection

const cloudinaryConnect=require("./config/cloudinary");
cloudinaryConnect.cloudinaryConnect();

//Mount api Routes
const upload=require("./routes/FileUpload");
app.use("/api/v1/upload",upload);

//Activate server
app.listen(PORT,()=>{
    console.log(`Server Connected in ${PORT}`);
})

