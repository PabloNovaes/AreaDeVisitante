import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import { Router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
