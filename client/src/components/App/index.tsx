import React from 'react'
import { AppLayout } from './AppLayout'
import { AuthProvider } from 'context/AuthContext'
import { ThemeProvider } from 'context/ThemeContext'

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  </ThemeProvider>
)

export default App
