import React from "react";
import { useContext } from "react";
import { AppContext } from "../ContextApi/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import CircularBtn from "./CircularBtn";
import AuthModal from "./AuthModel";

function Header() {
  const { headerData, islogin, user,setShowModel } = useContext(AppContext);
  const location = useLocation();
  //  console.log(islogin,user)

  const isHome = location.pathname === "/";
  const nav = useNavigate();
  const handleButton=()=>{
        if(!islogin){
           setShowModel(true);
        }
        else{
           nav('/task');
        }
  }
  return (
    <div>
      {/* Beautiful Hero Header */}
      <div className="w-full relative overflow-hidden">
        <div className="absolute top-4 right-4 z-40">
          <CircularBtn />
        </div>

        {/* Animated Gradient Background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 
                  animate-[gradientMove_8s_ease_infinite] bg-[length:200%_200%]"
        ></div>

        {/* Glow Orbs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/40 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-0 w-52 h-52 bg-blue-400/30 rounded-full blur-3xl"></div>

        {/* Header Content */}
        <div className="relative py-24 px-6 text-center text-white">
          {/* 3D Text */}
          <h1
            className="text-6xl font-extrabold tracking-wide 
                   drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                   [text-shadow:4px_4px_0px_rgba(255,255,255,0.25),8px_8px_0px_rgba(0,0,0,0.2)]
                   select-none"
          >
            {headerData.title}
          </h1>

          <p
            className="mt-8 max-w-2xl mx-auto text-xl text-white/90 font-medium
             bg-white/10 backdrop-blur-2xl px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)]
             animate-[float_4s_ease-in-out_infinite] border border-white/20"
          >
            {headerData.subtitle}
          </p>

          {isHome && (
            <button
              onClick={() => {handleButton()}}
              className="mt-8 px-8 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-xl 
                               hover:bg-indigo-100 hover:shadow-2xl transition text-lg"
            >
              Explore Tasks
            </button>
          )}

          <style>
            {`
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`}
          </style>
        </div>
      </div>

      {/* Tailwind animation keyframes */}
      <style>
        {`
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}
      </style>

      <AuthModal />
    </div>
  );
}

export default Header;
