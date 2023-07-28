const express=require("express");
const router=express.Router();

const {localFileupload,imageUpload,videoUpload,imageReduceUpload}=require("../controllers/fileUpload");

// imageUpload,videoUpload,imageReduceUpload,
//api route
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageReduceUpload",imageReduceUpload);
router.post("/localFileUpload",localFileupload);

//exporting the router
module.exports=router;