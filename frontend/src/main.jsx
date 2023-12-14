import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ActiveUserProvider } from "./context/ActiveUserContext.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActiveUserProvider>
      <App />
    </ActiveUserProvider>
  </React.StrictMode>,
)
