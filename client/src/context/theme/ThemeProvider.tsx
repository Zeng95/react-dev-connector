import React from 'react'
import { ThemeContext } from './ThemeContext'

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeContext.Provider value="dark-mode">{children}</ThemeContext.Provider>
  )
}

export { ThemeProvider }
