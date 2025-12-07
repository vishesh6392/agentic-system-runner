const express=require("express");
const AuthRouter=express.Router()
const {signUp, signIn, logout,getMe}=require('../controllers/auth.controller');
const isAuth = require("../middlewars/AuthMiddleware");

AuthRouter.post("/signup",signUp);
AuthRouter.post("/login",signIn);
AuthRouter.get("/me",isAuth,getMe);
AuthRouter.get("/logout",isAuth,logout);


module.exports=AuthRouter;