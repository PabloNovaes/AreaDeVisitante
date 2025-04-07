import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './globals.css'
import { Router } from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
    <Toaster richColors theme='dark' />
  </StrictMode>,
)
