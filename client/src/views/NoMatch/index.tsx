import React from 'react'
import { useLocation } from 'react-router-dom'

const NoMatch: React.FC = () => {
  let location = useLocation()

  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  )
}

export { NoMatch }
