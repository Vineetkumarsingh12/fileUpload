const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();
//  
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        // required:true,
    },
    tags:{
type:String,
required:true,
    },
    email:{
        type:String,
        required:true,

    },
})


//post middleware
fileSchema.post("save", async function(doc){
    try{
console.log("Doc-->",doc);

//creating transporter
let transporter=nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD,
    },
});
let info=await transporter.sendMail({
    from:"vineet",
    to:doc.email,
    subject:"new file uploaded",
    html:`<h1>hello mail is sended</h1><a href=${doc.imageUrl}>${doc.imageUrl}</a>`,
});
console.log(info);


    }catch(error){
console.log(error);
    }
});
   
//exporting the model
const file=mongoose.model("file",fileSchema);
module.exports=file;