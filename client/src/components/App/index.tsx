import React from 'react'
import { AppLayout } from './AppLayout'
import { AuthContextProvider } from 'context/AuthContext'

const App: React.FC = () => (
  <AuthContextProvider>
    <AppLayout />
  </AuthContextProvider>
)

export default App
