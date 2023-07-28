const FileModel = require("../models/file");
const cloudinary=require("cloudinary").v2;

exports.localFileupload = async (req, res) => {
  try {
    // Fetch file from the request
    //file -->represent the name of the it may be different
    const uploadedFile = req.files.file;
    // console.log(uploadedFile);

    // Set the destination path
    // __dirname-->represent the parent ditctory
    //give all information what is loaction name
    let path = __dirname + "/files/" + Date.now()+`.${uploadedFile.name.split('.').pop()}`;

    console.log("Path->", uploadedFile);

    // Move the file to the destination path
    uploadedFile.mv(path, (err) => {
      console.log("hello");
      // console.log(err);
    });

    res.json({
      success: true,
      message: 'Local file uploaded successfully',
    });

  } catch (err) {
    console.log(err);
  }
};
//image upload handler

function isImageVaildation(imageType){
  const supported=["jpg","png",'jpeg',"mp4"];
return supported.includes(imageType);
}
//help to upload on cloudinary
async function uploadImage(image, folder, desiredName,quality) {
  const options = {
    //folder name which folder to upload
    folder,
    public_id: desiredName, // Set the public_id using the desired image name
    resource_type:"auto",// for detecting the file type
  };
  //decreasing the quality of image
if(quality)
options.quality=quality;
  return await cloudinary.uploader.upload(image.tempFilePath, options);
}

exports.imageUpload=async(req,res)=>{
  try{
//data fetch
const {name,tags,email}=req.body;
console.log(req.body);
//
console.log(req.files);
const image=req.files.nameOfImage;

const imageType=image.name.split('.').pop().toLowerCase();
//vaidation
if(!isImageVaildation(imageType)){
  return res.status(400).json({
    success:false,
    message:'File format not supported',
  })
}
//file upload on cloudinary
const respone=await uploadImage(image,"test","v4");

//entry on db
const imageData= await FileModel.create({
  name,
  imageUrl:respone.secure_url,
  tags,
  email,   
})
 res.status(200).json({
  success:true,
  message:"video is uploaded",
})

  }catch(err){
    return res.status(400).json({
      success:false,
      message:"Error in accessing image",
    })
  }
}


//video upload

exports.videoUpload=async(req,res)=>{
  try{
//data fetch
const {name,tags,email}=req.body;
console.log(req.body);
//
console.log(req.files);
const video=req.files.nameOfVideo;

const videoType=video.name.split('.').pop().toLowerCase();
//vaidation
if(!isImageVaildation(videoType)){
  return res.status(400).json({
    success:false,
    message:'File format not supported',
  })
}
//file upload on cloudinary
const respone=await uploadImage(video,"test","v4");

//entry on db
const imageData= await FileModel.create({
  name,
  imageUrl:respone.secure_url,
  tags,
  email,   
})
 res.status(200).json({
  success:true,
  message:"image is uploaded",
})

  }catch(err){
    return res.status(400).json({
      success:false,
      message:"Error in accessing image",
    })
  }
}


//image reduce upload
exports.imageReduceUpload=async(req,res)=>{
  try{
//data fetch
const {name,tags,email}=req.body;
console.log(req.body);
//
console.log(req.files);
const image=req.files.nameOfImage;

const imageType=image.name.split('.').pop().toLowerCase();
//vaidation
if(!isImageVaildation(imageType)){
  return res.status(400).json({
    success:false,
    message:'File format not supported',
  })
}
//file upload on cloudinary
const respone=await uploadImage(image,"test","v4",30);

//entry on db
const imageData= await FileModel.create({
  name,
  imageUrl:respone.secure_url,
  tags,
  email,   
})
 res.status(200).json({
  success:true,
  message:"video is uploaded",
})

  }catch(err){
    return res.status(400).json({
      success:false,
      message:"Error in accessing image",
    })
  }
}

