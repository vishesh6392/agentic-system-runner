import React from 'react'
import { agentTasks } from '../assets/asset.js'


function Card() {
  return (
    <div>
       
     <div className="w-full py-20 bg-gray-100 flex flex-col items-center">
    <h2 className="text-4xl font-bold mb-10">Available Tasks</h2>
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-6xl">
         {agentTasks.map((task)=>(
        
         <div 
          key={task.id}
         className="p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition border border-gray-200 cursor-pointer">
        <h3 className="text-2xl font-semibold mb-2">{task.title}</h3>
        <p className="text-gray-600">
          {task.shortDesc}
        </p>
      </div>
    ))}
    </div>
  </div>
    </div>
    
  )
}

export default Card
