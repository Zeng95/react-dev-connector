import { AppHeader } from 'components/App/AppHeader'
import { AppContent } from 'components/Shared/Styles'
import { AuthContext } from 'context/AuthContext'
import React, { Fragment, useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PublicRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state } = useContext(AuthContext)
  const { isAuthenticated, token } = state
  const routeComponent = () => {
    return !isAuthenticated && !token ? (
      <Fragment>
        <AppHeader />

        <AppContent>
          <Component />
        </AppContent>
      </Fragment>
    ) : (
      <Redirect to="/dashboard" />
    )
  }

  return <Route {...rest} component={routeComponent} />
}

export { PublicRoute }
