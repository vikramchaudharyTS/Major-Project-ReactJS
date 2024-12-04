<<<<<<< HEAD

=======
//@ts-nocheck
>>>>>>> c926153dda1e39373ff5a8080aced0043432b4ec
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter> 
      <App />
    </BrowserRouter>
)
