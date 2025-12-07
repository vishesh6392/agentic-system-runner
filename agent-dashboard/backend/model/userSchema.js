const mongoose=require('mongoose');

const userModel=new mongoose.Schema({
    
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},

        lastActive:{type:Date,default:Date.now()}
    
      },
      {timestamps:true}
);

module.exports= mongoose.model('user',userModel);