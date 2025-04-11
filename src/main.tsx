import { InfoCircledIcon } from '@radix-ui/react-icons'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './globals.css'
import { Router } from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
    <Toaster
      richColors
      theme='dark'
      icons={{
        info: (
          <div className="rounded-full bg-[var(--info-border)] p-1">
            <InfoCircledIcon className="h-4 w-4 text-[var(--info-text)]" />
          </div>
        ),
      }} />
  </StrictMode>,
)
