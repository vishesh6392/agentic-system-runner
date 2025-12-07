import react,{ useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import CreateTask from './component/CreateTask'
import TaskList from './component/TaskList'
import Home from './pages/Home'
import Task from './pages/Task'
import AppContextProvider from './ContextApi/AppContext'
import SessionLoader from './component/SessionLoader'

function App() {
  

  return (
    <>
    <BrowserRouter>
        <AppContextProvider>
          <SessionLoader/>
         <Routes>
          <Route path='/' element={<Home/>}/>
          < Route path='/create' element={<CreateTask/>}></Route>
          <Route path='/Task' element={<Task/>}/>
          <Route path='/summarization' element={<TaskList/>}/>
          <Route path='/task/email-writer' element={<TaskList/>}/>
          <Route path="/task/blog-generator" element={<TaskList />} />
          <Route path="/task/code-explainer" element={<TaskList />} />
          <Route path="/task/resume-enhancer" element={<TaskList />} />
          <Route path="/task/data-extraction" element={<TaskList />} />
         </Routes>
         </AppContextProvider>
    </BrowserRouter>
      
    </>
  )
}

export default App
