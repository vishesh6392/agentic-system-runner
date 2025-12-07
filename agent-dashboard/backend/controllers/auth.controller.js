const user=require('../model/userSchema.js');
const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt")
const {getToken}=require('../config/jwtToken.js');


const  signUp=async (req,res)=>{
      try {
        const {name,email,password}=req.body;

        const User = await user.findOne({email});

        if(User) return res.status(400).json({message:"user already exist"});
        if(password.length<6) return res.status(400).json({message:"passward to weak"});

        const hashPassword=await bcrypt.hash(password,10,)

        const userModel= await user.create({
               name,
               email,
               password:hashPassword,
        })
        // console.log(userModel);
        // console.log(String(userModel._id))
        let id=userModel._id;
        id=id.toString();
        const token =await getToken(id);
        // console.log(token)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:false,
        })
         return res.status(201).json({userModel});
      } catch (error) {
        res.status(500).json({error:"error in signup"})
      }
}

const signIn = async(req,res)=>{
    try {
         const {email,password}=req.body;
         console.log(email);
         const User=await user.findOne({email});
         if(!User) return res.status(404).json({message:" User not exist"});
         const isMatch=await bcrypt.compare(password,User.password);
         if(!isMatch) return res.status(400).json({message:"somthing went wrong"})

         const token= await getToken(User._id);
         res.cookie("token",token,{
             httpOnly:true,
             maxAge:7*24*60*60*1000,
             sameSite:"lax",
             secure:false

         })
         return res.status(201).json(User);
    } catch (error) {
        res.send("login error",error.message)
    }
}


const logout=async(req,res)=>{
       try {
           res.clearCookie("token",{
             sameSite:"lax",
             secure:false
           })
           res.status(200).json({message:"logout success"});
        
       } catch (error) {
         res.send('error in logout controller',error.message);
       }
}

const getMe = async(req,res)=>{
       try {
           const u= await user.findById(req.userId).select('-password');
           if(!u) return res.status(404).json({message:"user not found"});
           return res.status(202).json({"user":u});
       } catch (err) {
           console.error(err);
          res.status(500).json({message:"getme error"})
       }
}

module.exports={signUp,signIn,logout,getMe};



