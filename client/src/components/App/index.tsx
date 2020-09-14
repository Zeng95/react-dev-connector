import React from 'react'
import AppNavbar from './AppNavbar'

const App = () => {
  const title = 'React'

  return (
    <div>
      <AppNavbar />
      <h1>Hello {title}</h1>
      <a href="https://www.google.com/">This is a link</a>
    </div>
  )
}

export default App
