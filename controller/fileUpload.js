const File=require("../models/file");

const cloudinary=require("cloudinary").v2;

exports.localfileUpload=async(req,res)=>{
    try{
         //fetch file
         const file = req.files.file;
         console.log("File mil Gyi",file);

         let path=__dirname+"/files/"+Date.now()+`.${file.name.split(".")[1]}`;
         console.log("Path=>",path);

         file.mv(path,(err)=>{
            console.log(err);
         });

         res.json({
            success:true,
            message:"Local file Uploaded Successfully",
         })
    }
    catch(err){
        console.log(err);
    }
}

function isFileSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder,quality){
    const options={folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async(req,res)=>{
    try{

        //data fetch
         const {name, tags, email}=req.body;
         console.log(name,tags,email);
    
         const file = req.files.imageFile;
         console.log("File mil Gyi",file);

         //validation
         const supportedTypes = ["jpg", "jpeg", "png"];
         const fileType = file.name.split(".").pop().toLowerCase();

         if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported",
            });
         }

         //Upload to cloudinary
         const response = await uploadToCloudinary(file, "ShiShu_Proj");
         console.log("Cloudinary Response", response);

         //save file data to database
         const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
         });
         console.log("File Data", fileData);
         res.json({
            success:true,
            message:"Image Uploaded Successfully",
            data:fileData,
         });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            error:err.message,
        });
    }
}


exports.videoUpload=async(req,res)=>{
    try{
         const {name, tags, email}=req.body;
         console.log(name,tags,email);
    
         const file = req.files.videoFile;
         console.log("File mil Gyi",file);

         //validation
         const supportedTypes = ["mp4", "avi", "mov"];
         const fileType = file.name.split(".").pop().toLowerCase();

         if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported",
            });
         }

         //Upload to cloudinary
         const response = await uploadToCloudinary(file, "ShiShu_Proj");
         console.log("Cloudinary Response", response);

         //save file data to database
         const fileData=await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
         });
         console.log("File Data", fileData);
         res.json({
            success:true,
            message:"Video Uploaded Successfully",
            data:fileData,
         });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            error:err.message,
        });
    }
}


exports.imageReducerUpload=async(req,res)=>{
    try{

        //data fetch
         const {name, tags, email}=req.body;
         console.log(name,tags,email);
    
         const file = req.files.imageFile;
         console.log("File mil Gyi",file);

         //validation
         const supportedTypes = ["jpg", "jpeg", "png"];
         const fileType = file.name.split(".").pop().toLowerCase();

         if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported",
            });
         }

         //Upload to cloudinary
         const response = await uploadToCloudinary(file, "ShiShu_Proj",70);
         console.log("Cloudinary Response", response);

         //save file data to database
         const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
         });
         console.log("File Data", fileData);
         res.json({
            success:true,
            message:"Image Uploaded Successfully",
            data:fileData,
         });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            error:err.message,
        });
    }
}