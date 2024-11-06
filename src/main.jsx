import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './output.css'
import Provider from './providers/Provider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider>
    <App />
  </Provider>
  // </StrictMode>,
)
