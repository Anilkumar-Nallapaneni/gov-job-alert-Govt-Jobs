import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import { applyColorMode } from './theme/designSystem'
import './styles/global.css'

try {
  if (localStorage.getItem('bharatnaukri-color-mode') === 'bw') applyColorMode('bw')
} catch {
  /* private mode */
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
