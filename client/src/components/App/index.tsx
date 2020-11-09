import { AuthProvider } from 'context/auth/AuthProvider'
import { ProfileProvider } from 'context/profile/ProfileProvider'
import { PostProvider } from 'context/post/PostProvider'
import React from 'react'
import { Router } from 'router'

const App: React.FC = () => (
  <AuthProvider>
    <ProfileProvider>
      <PostProvider>
        <Router />
      </PostProvider>
    </ProfileProvider>
  </AuthProvider>
)

export default App
