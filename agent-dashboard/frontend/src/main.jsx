import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './ContextApi/AppContext.jsx'
import SessionLoader from './component/SessionLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      {/* <SessionLoader/> */}
       <App />
    </AppContextProvider>
    
  </StrictMode>,
)
