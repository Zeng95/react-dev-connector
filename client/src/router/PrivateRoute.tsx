import { AppLayout } from 'components/App/AppLayout'
import { AuthContext } from 'context/auth/AuthContext'
import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state } = useContext(AuthContext)
  const { isAuthenticated, token } = state

  const routeComponent = () => {
    return isAuthenticated || token ? (
      <AppLayout>
        <Component />
      </AppLayout>
    ) : (
      <Redirect to="/login" />
    )
  }

  return <Route {...rest} render={routeComponent} />
}

export { PrivateRoute }
