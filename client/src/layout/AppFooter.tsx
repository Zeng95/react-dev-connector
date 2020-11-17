import React from 'react'
import styled from 'styled-components'

const FooterStyled = styled.footer.attrs({
  className: 'p-6 bg-dark text-white text-center'
})``

const AppFooter: React.FC = () => {
  return <FooterStyled>© 2020 DevConnector. All Rights Reserved.</FooterStyled>
}

export { AppFooter }
