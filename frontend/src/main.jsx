//@ts-nocheck
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ActiveContext from './contexts/Context.jsx'

createRoot(document.getElementById('root')).render(
  <ActiveContext>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </ActiveContext>
   
)
