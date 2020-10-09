import React from 'react'

const ThemeContext = React.createContext('dark')

const ThemeProvider: React.FC<{ children: any }> = ({ children }) => {
  return (
    <ThemeContext.Provider value="dark-mode">{children}</ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
