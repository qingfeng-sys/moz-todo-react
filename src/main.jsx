import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [
  { id: "todo-0", name: "Template-1", completed: true },
  { id: "todo-1", name: "Template-2", completed: false },
  { id: "todo-2", name: "Template-3", completed: false },
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
