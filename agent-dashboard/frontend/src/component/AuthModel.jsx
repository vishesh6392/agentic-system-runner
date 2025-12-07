import React, { useContext, useState } from 'react'
import { AppContext } from '../ContextApi/AppContext'
import Login from './login';
import SignUp from './SignUp';
import { LogIn, LogOut, User, X, Mail, Lock } from 'lucide-react';



function AuthModal() {
     const {islogin,setIsLogin,setShowModel,showModel}=useContext(AppContext);

     if(!showModel) return null;
     const onClose =()=>{
         setShowModel(false);
     }  
  return (
    <div>
       <div
      // Full screen overlay with backdrop blur
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        // Modal Content Card
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm relative 
                   transform transition-all duration-300 scale-100 ease-out"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition" 
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          {islogin ? 'Account Login' : 'Create Account'}
        </h2>
        
        {/* Form Content */}
        {islogin 
          ? <Login/> 
          : <SignUp/>
        }

        {/* Toggle Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          {islogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span 
            className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-800 transition-colors" 
            onClick={() => setIsLogin(!islogin)}
          >
            {islogin ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
    </div>
  )
}

export default AuthModal
