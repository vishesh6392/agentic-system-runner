const jwt =require('jsonwebtoken');
const dotenv=require("dotenv")
dotenv.config();



const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        // console.log(token);
        if(!token) return res.status(400).json({message:"not authenticated"});

        let verifyToken= await jwt.verify(token,process.env.SECRET_KEY);
        // console.log(verifyToken);
        req.userId=verifyToken.userId;
        // console.log(req.userId);
        next();
    } catch (error) {
        return res.status(500).json({message:"auth error in middleware"});
    }
}
module.exports=isAuth;