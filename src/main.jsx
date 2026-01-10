import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles/index.css'
import App from './App.jsx'
import { ProgressProvider } from './context/ProgressContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </HelmetProvider>
  </StrictMode>,
)
