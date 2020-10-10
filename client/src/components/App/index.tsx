import { AuthProvider } from 'contexts/auth/AuthProvider'
import { ProfileProvider } from 'contexts/profile/ProfileProvider'
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
