import React, { useContext } from 'react'
import { AppContext } from '../ContextApi/AppContext';
import { LogIn, LogOut, User, X, Mail, Lock } from 'lucide-react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function CircularBtn() {
     const {islogin,user,setShowModel,setIsLogin,setUser,authLoading}=useContext(AppContext);
     const navigate=useNavigate();
      //  console.log(user,islogin)
  const userName = user?.name || '';
  const textAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=40&background=4f46e5&color=ffffff&bold=true`;
     const onLogout=async(e)=>{
          e.preventDefault();
          try {
              const data= await API.get('/auth/logout',{ withCredentials: true });
            //   console.log(data)
            setIsLogin(false); 
             setUser(null);
               localStorage.removeItem("USER");
               navigate('/');
          } catch (error) {
             console.log(`logout me error ${error}`);
          }
          
     }

    const  onOpenModel=() => setShowModel(true);

  if (authLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" aria-hidden />
    );
  }

  return (

    <div>
      <div 
      className="relative group flex items-center h-10" 
    >
      {islogin && user ? (
        <>
          <div 
            className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center 
                       overflow-hidden cursor-pointer shadow-lg ring-2 ring-indigo-500/50 
                       transition duration-200 transform group-hover:scale-[1.05]"
            title={`Logged in as ${user.name}`}
          >
            <img 
              src={textAvatarUrl} 
              alt="Profile" 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/4f46e5/ffffff?text=U" }}
            />
          </div>
          <button 
            onClick={onLogout}
            // POSITIONING: Absolute, right of the container
            className="absolute top-1/2 right-12 transform -translate-y-1/2
                       px-3 py-1 mr-2 
                       bg-white text-red-600 text-sm font-medium
                       rounded-full shadow-xl border border-red-300
                       opacity-0 group-hover:opacity-100 
                       group-hover:translate-x-0 -translate-x-4
                       transition duration-300 ease-in-out
                       z-10 whitespace-nowrap hover:bg-red-50"
          >
            <LogOut className="inline w-4 h-4 mr-1" /> Logout
          </button>
        </>
      ) : (
        // === Not Logged In View: Clickable Login/Signup Icon ===
        <div 
          onClick={onOpenModel}

          className="w-10 h-10 rounded-full bg-indigo-600 text-white 
                     flex items-center justify-center cursor-pointer 
                     hover:bg-indigo-700 transition duration-200 shadow-xl 
                     ring-2 ring-transparent hover:ring-indigo-300/50"
          title="Login / Sign Up"
        >
          <LogIn size={20} />
        </div>
      )}
    </div>
    </div>
  )
}

export default CircularBtn
