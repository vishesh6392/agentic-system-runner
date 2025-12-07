
import React, { useContext, useState } from 'react'
import API from '../api';
import { AppContext } from '../ContextApi/AppContext';
import { LogIn, LogOut, User, X, Mail, Lock } from 'lucide-react';

function SignUp() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {setIsLogin,setUser,setShowModel}=useContext(AppContext);


    const handleSubmit=async(e)=>{
         e.preventDefault();
         try {
              const res= await API.post("/auth/signup",{name,email,password},{
                withCredentials:true,
                 headers: {
                   "Content-Type": "application/json"
                }});
              // console.log( res.data)
              if(res?.data?.user){
                 setIsLogin(true);
                 setUser(res.data.user);
                 setEmail('');
                 setName('');
                 setPassword('');
                 setShowModel(false);
        
              }
         } catch (error) {
             console.log(`signup ka catch me ja raha ${error}`)
         }

    }

  return (
    <div>
     <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field */}
      <div>
        <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <User className="w-4 h-4 mr-2 text-green-500" /> Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
        />
         <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <User className="w-4 h-4 mr-2 text-green-500" /> email
        </label>
        <input
          id="Email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
        />
         <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <User className="w-4 h-4 mr-2 text-green-500" /> Password
        </label>
        <input
          id="password"
          type="text"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent 
                   rounded-lg shadow-md text-sm font-semibold text-white 
                   bg-green-600 hover:bg-green-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-[1.01]"
      >
        Sign Up & Start
      </button>
    </form>
    </div>
  )
}

export default SignUp
