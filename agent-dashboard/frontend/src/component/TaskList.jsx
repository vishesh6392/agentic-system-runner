
import React, { useContext, useEffect, useState } from "react";
import API from "../api";
import Header from "./Header";
import { AppContext } from "../ContextApi/AppContext";
import { HElement } from "../assets/asset";
import CreateTask from "./CreateTask";
import { useLocation } from "react-router-dom";
import { routeTypeMap } from "../assets/routeTypeMap.js";

function TaskList() {
  const [task, setTast] = useState([]);
  const { setHeaderData,setEdittask} = useContext(AppContext);
  const [copiedId, setCopiedId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const { pathname } = useLocation();
   const filterType = routeTypeMap[pathname] || "";


  const loadtask = async (forcedType) => {
    try {
      const typeToUse=forcedType?? filterType;
      const url=typeToUse? `/task/gettask?type=${typeToUse}`:"/task/gettask";
      const t = await API.get(url,{withCredentials:true});
      setTast(t.data);
    } catch (error) {
      console.log("get req failed axios", error.message);
    }
  };

  const runTask = async (id) => {
    try {
      await API.post(`/task/${id}/run`,{withCredentials:true});
    } catch (error) {
      console.log("post req of axios error", error.message);
    }
    loadtask();
  };
   

    const handleDelete= async(id)=>{
       try {
         await API.get(`/task/${id}`,{withCredentials:true});
       } catch (err) {
         console.log("deletion error ",err.message);
       }
       loadtask();
    }


  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text || "");
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500); // reset after 1.5 sec
    toast("Result copied!");
  };

  const user = JSON.parse(localStorage.getItem("USER"));

  useEffect(() => {
    loadtask(filterType);
    setHeaderData({
      title:HElement.user.replace("{name}", user?.name || "Vishesh"),
      subtitle: HElement.GreedUser,
    });
  }, [filterType]);

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center mt-10 px-10 mb-6">
        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Create Task
        </button>
      </div>
        {showCreate && (
  <>
    {/* Background Blur */}
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>

    {/* Modal */}
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <CreateTask close={() => setShowCreate(false)}
        refresh={loadtask}
      />
    </div>
  </>
)}

      <div className="w-full min-h-screen bg-gray-100 py-10">
        {/* Responsive Grid (Left aligned, padding 20-30px) */}
        <div
          className="
       w-full 
       px-4 sm:px-6 md:px-10 
      flex flex-col gap-8
    "
        >
          {task.map((t, index) => (
            <div
              key={t._id}
              className="
          bg-white shadow-xl rounded-2xl p-6 border border-gray-200
          transform transition-all duration-300 
          hover:-translate-y-2 hover:shadow-2xl 
          animate-fade-in
        "
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    🧩 {t.title}
                  </h3>
                  <span className="text-sm text-gray-500 capitalize">
                    {t.type}
                  </span>
                </div>
                
                <span
                  className={`
                  px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    t.status === "DONE"
                      ? "bg-green-100 text-green-700"
                      : t.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                >
                  {t.subType}
                </span>
                {/* Status badge */}
                <span
                  className={`
                  px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    t.status === "DONE"
                      ? "bg-green-100 text-green-700"
                      : t.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                >
                  {t.status}
                </span>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-gray-200"></div>

              {/* Copy Button */}
              {t.result && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => handleCopy(t._id, t.result)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                  >
                    {copiedId === t._id ? (
                      <>
                        <span>✔️</span> Copied
                      </>
                    ) : (
                      <>
                        <span>📋</span> Copy
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Chat bubble */}
              {t.result ? (
                <div className="bg-gray-700 border border-gray-200 px-4 py-3 rounded-lg shadow-sm text-white whitespace-pre-line">
                  {t.result}
                </div>
              ) : (
                <p className="text-gray-500 italic">No result yet…</p>
              )}

              {/* Buttons Row */}
              <div className="mt-5 flex justify-between gap-5">
                <button
                  className="
                 w-1/8 py-2 bg-indigo-600 text-white rounded-lg shadow 
                hover:bg-indigo-700 hover:shadow-xl transition font-semibold text-sm

                "
                  onClick={() => runTask(t._id)}
                >
                  Run
                </button>
                <button
                  className="
                 w-1/8 py-2 bg-indigo-600 text-white rounded-lg shadow 
                hover:bg-indigo-700 hover:shadow-xl transition font-semibold text-sm

                "
                  onClick={() =>{
                     setEdittask(t),
                     setShowCreate(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="
                  w-1/8 py-2 bg-red-600 text-white rounded-lg shadow 
                hover:bg-red-700 hover:shadow-xl transition font-semibold text-sm

                "
                  onClick={() => handleDelete(t._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Animations */}
        <style>
          {`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease forwards; }

        @keyframes toast-in {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toast-out {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(10px) scale(0.95); }
        }
        .animate-toast-in { animation: toast-in 0.3s ease forwards; }
        .animate-toast-out { animation: toast-out 0.3s ease forwards; }
      `}
        </style>
      </div>
    </div>
  );
}

export default TaskList;
