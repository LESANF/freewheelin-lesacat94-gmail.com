import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { AppProvider } from './providers'
import App from './App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <AppProvider>
    <App />
  </AppProvider>
)
