import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   
      <BrowserRouter>
        <App />
      </BrowserRouter>
  // </StrictMode>
)
