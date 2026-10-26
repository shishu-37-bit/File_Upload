const express=require("express");
const router=express.Router();

// const{imageUpload,videoUpload,imageReducerUpload,localfileUpload}=require("../controller/fileUpload");
const{localfileUpload,imageUpload,videoUpload,imageReducerUpload}=require("../controller/fileUpload");

router.post("/localFileUpload",localfileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageReducerUpload",imageReducerUpload);

module.exports=router;