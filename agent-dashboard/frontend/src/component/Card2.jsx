import React from "react";
import { taskCardData } from "../assets/asset";
import { useNavigate } from "react-router-dom";
function Card2() {
    const nav=useNavigate();
  return (
    <div>
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6 flex flex-col items-center">
        {/* Task List Container */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {taskCardData.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200 
                      hover:shadow-2xl hover:-translate-y-1 transition transform cursor-pointer"
            >
              <h3 className="text-2xl font-semibold">
                {item.icon}
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>

              <button
                 onClick={()=>nav(item.route)}
                className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-xl shadow 
                          hover:bg-indigo-700 hover:shadow-xl transition font-semibold"
              >
                {item.button}
              </button>
            </div>
          ))}
          ;
        </div>
      </div>
    </div>
  );
}

export default Card2;
