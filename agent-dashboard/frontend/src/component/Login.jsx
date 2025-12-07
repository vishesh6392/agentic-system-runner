import React, { useContext, useState } from 'react'
import { AppContext } from '../ContextApi/AppContext';
import { LogIn, LogOut, User, X, Mail, Lock } from 'lucide-react';
 import API from '../api';
function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {setIsLogin,setUser,setShowModel}=useContext(AppContext);

    const handleSubmit= async(e)=>{
            e.preventDefault();
            // console.log({email,password})
            try{
               const data=await API.post("/auth/login",{email,password},
                { withCredentials:true,
                  headers: {
                   "Content-Type": "application/json"
                }
                });
              //  console.log({data});
                if(data.data){
                     setIsLogin(true);
                     setUser(data.data);
                     setEmail('');
                     setPassword('');
                     setShowModel(false);
                    localStorage.setItem("USER", JSON.stringify(data.data));
                }
            }
            catch(err){
              console.log("Login error:", err.response?.data || err.message || err);
            }
    }

  return (
    <div>
     <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <Mail className="w-4 h-4 mr-2 text-indigo-500" /> Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="user@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <Lock className="w-4 h-4 mr-2 text-indigo-500" /> Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="password123"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent 
                   rounded-lg shadow-md text-sm font-semibold text-white 
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:scale-[1.01]"
      >
        <LogIn className="w-5 h-5 mr-2" /> Sign In
      </button>
    </form>
    </div>
  )
}

export default Login
