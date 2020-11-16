import 'assets/styles/index.css'
import { AuthProvider } from 'context/auth/AuthProvider'
import { PostProvider } from 'context/post/PostProvider'
import { ProfileProvider } from 'context/profile/ProfileProvider'
import { default as React } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'router'
import 'rsuite/lib/styles/index.less'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <PostProvider>
          <Router />
        </PostProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
