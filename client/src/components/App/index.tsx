import { AuthProvider } from 'context/auth/AuthProvider'
import { PostProvider } from 'context/post/PostProvider'
import { ProfileProvider } from 'context/profile/ProfileProvider'
import React from 'react'
import { Router } from 'router'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PostProvider>
          <Router />
        </PostProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
