import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './app/AppRouter.jsx'
import 'remixicon/fonts/remixicon.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
