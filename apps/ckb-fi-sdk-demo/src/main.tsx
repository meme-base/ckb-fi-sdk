import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'virtual:windi.css'
import 'react-toastify/dist/ReactToastify.css'
import './assets/style/global.scss'

const toastRoot = document.createElement('div')
toastRoot.id = 'toast-root'
toastRoot.style.zIndex = '2000'
document.body.appendChild(toastRoot)

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
