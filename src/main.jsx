import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TokenContextProvider } from './context/tokenContext.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';




const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </QueryClientProvider>
  </StrictMode>
)




