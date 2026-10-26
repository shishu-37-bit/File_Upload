const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        
    },
    videoUrl:{
        type:String,
    },
    tags:{
        type:String,
    
    },
    email:{
        type:String,
        required:true,
    }
});


//post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);

        //transporter
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from:`ShiShu`,
            to:doc.email,
            subject:"new file Uploaded",
            html:`<p>A new file has been uploaded.</p> View here:<a href="${doc.imageUrl}">${doc.imageUrl}</>`
        })

        console.log("INFO",info);

    }
    catch(err){
       console.log("Error in sending mail",err);
    }
});

const File=mongoose.model("File",fileSchema);

module.exports=File;