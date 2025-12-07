const mongoose=require('mongoose');
const user=require('../model/Task1.js');
const { RunTask } = require('../agent/runner.js');

 
const createTask=async(req,res)=>{
         try {
              console.log(req.body);
              const {title,type,subType,details}=req.body;
                // console.log(req.userId);
              const newTask= await user.create({
                   user: req.userId,
                   title,
                   type,
                   subType:subType || "default",
                   details
              });
              return res.status(202).json(newTask);
            
         } catch (err) {
              res.status(500).json({message:err.message})
         }
}

const getTask=async(req,res)=>{
    try {
        const userId=req.userId;
        const {type}=req.query;
        let filter={user:userId};
        if(type) filter.type=type;
        const createdTask= await user.find(filter).sort({'createdAt':-1});
        if(!createdTask) return res.status(404).json({message:"No task found"});
        return res.status(202).json(createdTask);
    } catch (err) {
        return res.status(500).json({message:err.message});
    }
}

const runTaskController= async(req,res)=>{
      try {
          const taskId=req.params.id;
        //   console.log(req.params.id)
          const updatedTask= await RunTask(taskId);
        //   console.log(updatedTask);
          res.status(202).json(updatedTask);
      } catch (err) {
          res.status(500).json({message:err.message});
      }
}


 const deleteTask=async(req,res)=>{
      try {
          const taskId=req.params.id;
          const userId=req.userId;
          
          const task = await user.findById(taskId);
        //    console.log(task);
          if(!task) return res.status(404).json({message:"task not find"});
        //   console.log(task.user.toString())
          if(task.user.toString()!=userId) return res.status(403).json({message:'you are not allowed to delete LOL'})

          await task.deleteOne();
          return res.status(202).json({message:"successful"});
      } catch (err) {
          res.status(500).json({message:err.message});
      }
 }

 const updateTask=async(req,res)=>{
     try {
          const {id}=req.params;
          const {title,type,subType,details}=req.body;
          const updatedTask=await user.findByIdAndUpdate(
               id,
              {
               title,type,subType,details,status:"pending"
              },
              {new:true}
          )
          if(!updatedTask) return res.status(404).json({success:false,message:"task not found"})
           return res.status(202).json({
              success:true,
              message:"task updated",
              task:updatedTask
        })
     } catch (err) {
        console.log("update task error",err);
        res.status(500).json({success:false,message:"server error"})
     }
 }

module.exports={createTask,getTask,runTaskController,deleteTask,updateTask};