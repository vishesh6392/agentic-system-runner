import React, { useContext, useEffect, useState } from "react";
import API from "../api.js";
import { AppContext } from "../ContextApi/AppContext.jsx";
import { useLocation } from "react-router-dom";
import { routeTypeMap } from "../assets/routeTypeMap";
import { subTypeMap } from "../assets/subTypeMap";


function CreateTask({ close,refresh }) {
  const { pathname } = useLocation();
  const detectedType = routeTypeMap[pathname] || "summarize";

  const [title, setTitle] = useState("");
  const [type, setType] = useState(detectedType);
  const [details, setDetails] = useState("");
  const [subType, setSubType] = useState("");
  const { user ,edittask,setEdittask} = useContext(AppContext);
  const userId = user._id;


  useEffect(()=>{
     if(edittask){
      setTitle(edittask.title);
      setType(edittask.type);
      setSubType(edittask.subType);
      setDetails(edittask.details);
     }
  },[edittask]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(subType);
      if(edittask){
        await API.put(`/task/update/${edittask._id}`,{
          title,
          type,
          subType,
          details,
        })
        alert('task updated successfully!')
        setEdittask(null)
      }
      else{
      await API.post(
        "/task/createtask",
        { userId, title, type, subType, details },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Task created successfully!");
    }
      refresh();   
      close(); 
      setTitle("");
      setDetails("");
      setSubType("");
      
      
      // close modal
    } catch (error) {
      console.log("error in axios call", error.message);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Task</h1>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

       <input
  type="text"
  value={type}
  disabled
  className="border p-2 rounded-lg bg-gray-200 text-gray-600"
/>

<select
  className="border p-2 rounded-lg bg-gray-100"
  value={subType}
  onChange={(e) => setSubType(e.target.value)}
>
  <option value="">Select sub-type</option>

  {subTypeMap[type]?.map((st) => (
    <option key={st.value} value={st.value}>
      {st.label}
    </option>
  ))}
</select>


        <textarea
          className="border p-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500"
          placeholder="Details"
          rows="4"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Create Task
        </button>

        {/* Close Button */}
        <button
          type="button"
          className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          onClick={close}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
