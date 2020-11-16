import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { AppContent } from 'components/Shared/Styles'
import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div.attrs({
  className: 'flex flex-col min-h-screen'
})``

const AppLayout: React.FC = props => (
  <AppWrapper>
    <AppHeader />

    <AppContent>{props.children}</AppContent>

    <AppFooter />
  </AppWrapper>
)

export { AppLayout }
