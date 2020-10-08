import React from 'react'
import { AppLayout } from './AppLayout'
import { AuthProvider } from 'context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </AuthProvider>
)

export default App
