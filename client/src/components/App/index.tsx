import { AuthProvider } from 'context/auth/AuthProvider'
import { ProfileProvider } from 'context/profile/ProfileProvider'
import React from 'react'
import { Router } from 'router'

const App: React.FC = () => (
  <AuthProvider>
    <ProfileProvider>
      <Router />
    </ProfileProvider>
  </AuthProvider>
)

export default App
