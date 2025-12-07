const mongoose=require('mongoose');

const TaskSchema= new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
     },
     title:{type:String ,required:true},
     type:{type:String,required:true},
     subType: { type: String },  
     details:{type:String},

     
     options: { type: mongoose.Schema.Types.Mixed }, 

     status:{
        type:String,
      //   enum:['pending','completed','failed'],
        default:'pending'
     },
       result: String,
      scheduledFor: Date,
     createdAt: {
      type: Date,
       default: Date.now
     }


})

module.exports=mongoose.model("Task",TaskSchema);