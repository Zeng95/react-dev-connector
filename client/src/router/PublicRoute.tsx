import { AppLayout } from 'layout'
import { AuthContext } from 'context/auth/AuthContext'
import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PublicRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
  restricted: boolean
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  restricted,
  ...rest
}) => {
  const { state } = useContext(AuthContext)
  const { isAuthenticated, token } = state

  const routeComponent = () => {
    return restricted && (isAuthenticated || token) ? (
      <Redirect to="/dashboard" />
    ) : (
      <AppLayout>
        <Component />
      </AppLayout>
    )
  }

  return <Route {...rest} render={routeComponent} />
}

export { PublicRoute }
