import { User } from '@styled-icons/fa-solid'
import { DashboardActions } from 'components/Dashboard/Actions'
import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Loader, Table } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const { Column, HeaderCell, Cell } = Table

const Container = styled.section.attrs({
  className: 'mx-auto px-8'
})`
  max-width: 1100px;
`
const Title = styled.h1.attrs({
  className: 'mb-4 text-primary'
})`
  font-size: 3rem;
  line-height: 1.2;
`
const Description = styled.p.attrs({
  className: 'flex items-center mb-4 text-2xl'
})`
  span {
    ${tw`ml-2`}
  }
`
const ExperienceSection = styled.section``
const SectionTitle = styled.h2.attrs({
  className: 'my-8 text-2xl font-bold'
})``
const EducationSection = styled.section``

const Dashboard: React.FC = () => {
  const authState = useContext(AuthContext).state
  const { user, loading } = authState

  const profileState = useContext(ProfileContext).state
  const { profile } = profileState

  const data = [
    {
      id: 1,
      avartar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg',
      city: 'New Amieshire',
      email: 'Leora13@yahoo.com',
      firstName:
        'Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe',
      lastName: 'Schuppe',
      street: 'Ratke Port',
      zipCode: '17026-3154',
      date: '2016-09-23T07:57:40.195Z',
      bs: 'global drive functionalities',
      catchPhrase: 'Intuitive impactful software',
      companyName: 'Lebsack - Nicolas',
      words: 'saepe et omnis',
      sentence: 'Quos aut sunt id nihil qui.',
      stars: 820,
      followers: 70
    },
    {
      id: 2,
      avartar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg',
      city: 'New Gust',
      email: 'Mose_Gerhold51@yahoo.com',
      firstName: 'Janis',
      lastName: 'Vandervort',
      street: 'Dickinson Keys',
      zipCode: '43767',
      date: '2017-03-06T09:59:12.551Z',
      bs: 'e-business maximize bandwidth',
      catchPhrase: 'De-engineered discrete secured line',
      companyName: 'Glover - Hermiston',
      words: 'deleniti dolor nihil',
      sentence: 'Illo quidem libero corporis laborum.',
      stars: 1200,
      followers: 170
    },
    {
      id: 3,
      avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg',
      city: 'Lefflerstad',
      email: 'Frieda.Sauer61@gmail.com',
      firstName: 'Makenzie',
      lastName: 'Bode',
      street: 'Legros Divide',
      zipCode: '54812',
      date: '2016-12-08T13:44:26.557Z',
      bs: 'plug-and-play e-enable content',
      catchPhrase: 'Ergonomic 6th generation challenge',
      companyName: 'Williamson - Kassulke',
      words: 'quidem earum magnam',
      sentence: 'Nam qui perferendis ut rem vitae saepe.',
      stars: 610,
      followers: 170
    },
    {
      id: 4,
      avartar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/brajeshwar/128.jpg',
      city: 'East Catalina',
      email: 'Eloisa.OHara@hotmail.com',
      firstName: 'Ciara',
      lastName: 'Towne',
      street: 'Schimmel Ramp',
      zipCode: '76315-2246',
      date: '2016-07-19T12:54:30.994Z',
      bs: 'extensible innovate e-business',
      catchPhrase: 'Upgradable local model',
      companyName: 'Hilpert, Eichmann and Brown',
      words: 'exercitationem rerum sit',
      sentence: 'Qui rerum ipsa atque qui.',
      stars: 5322,
      followers: 170
    }
  ]

  return loading ? (
    <Loader center size="lg" content="Loading..." vertical />
  ) : (
    <Container>
      <Title>Dashboard</Title>

      <Description>
        <User size="24" title="User" />
        <span>Welcome {user && user.username}</span>
      </Description>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ExperienceSection>
            <SectionTitle>Experience Credentials</SectionTitle>
            <Table height={400} data={data}>
              <Column>
                <HeaderCell>Company</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column>
                <HeaderCell>Title</HeaderCell>
                <Cell dataKey="companyName" />
              </Column>

              <Column>
                <HeaderCell>Years</HeaderCell>
                <Cell dataKey="email" />
              </Column>

              <Column>
                <HeaderCell>Action</HeaderCell>

                <Cell>
                  {(rowData: any) => {
                    function handleAction() {
                      alert(`id:${rowData.id}`)
                    }
                    return (
                      <span>
                        <a onClick={handleAction}> Edit </a> |{' '}
                        <a onClick={handleAction}> Remove </a>
                      </span>
                    )
                  }}
                </Cell>
              </Column>
            </Table>
          </ExperienceSection>
          <EducationSection>
            <SectionTitle>Education Credentials</SectionTitle>
          </EducationSection>
        </Fragment>
      ) : (
        <div>
          <p>You have not set up a profile yet, please add some info</p>
          <Link to="create-profile" className="inline-block mt-4">
            <Button appearance="primary">Create profile</Button>
          </Link>
        </div>
      )}
    </Container>
  )
}

export { Dashboard }
