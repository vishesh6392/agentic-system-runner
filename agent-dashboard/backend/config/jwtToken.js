
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')

dotenv.config();


const getToken= async(userId)=>{
      try{
        //   console.log(userId);
          const token =await jwt.sign({userId},process.env.SECRET_KEY,{
            expiresIn:'7d',
          })
        //   console.log(token);
          return token;
      }
      catch(error){
         return res.status(500).send(error,"get token error")
      }
}

module.exports={getToken};