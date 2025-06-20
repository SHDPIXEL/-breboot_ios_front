import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => console.log('Service Worker registered:', registration))
      .catch((error) => console.log('Service Worker registration failed:', error));
  });
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
)
