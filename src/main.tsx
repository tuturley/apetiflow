import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { warmupSpeechVoices } from '@/services/speechService'
import './index.css'

warmupSpeechVoices()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
