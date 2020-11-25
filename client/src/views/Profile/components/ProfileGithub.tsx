import {
  IconStyledWrapper,
  ProfileSectionTitle
} from 'components/Shared/Styles'
import { Star, Eye } from '@styled-icons/fa-regular'
import { CodeBranch } from '@styled-icons/fa-solid'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useContext } from 'react'
import { Icon } from 'rsuite'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

interface RepoMetaItemProps {
  name: string
}

const ProfileGithubStyled = styled.section.attrs({
  className: 'mt-4'
})``
const Title = styled(ProfileSectionTitle)`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`
const RepoList = styled.ul``
const RepoItem = styled.li.attrs({
  className: 'flex justify-between mb-4 p-4'
})`
  border: #ccc solid 1px;
`

const RepoInfo = styled.div`
  width: 80%;
`
const RepoName = styled.h3.attrs({
  className: 'text-primary'
})``
const RepoDesc = styled.p``

const RepoMetaList = styled(RepoList)`
  width: 16%;
`
const RepoMetaItem = styled.li.attrs({
  className: 'flex items-center m-1 py-1 px-1'
})<RepoMetaItemProps>`
  > span {
    &:not(:first-child) {
      font-size: 0.9rem;
    }

    &:first-child {
      margin-right: 0.5rem;
    }

    &:last-child {
      ${tw`truncate`}

      margin-left: 0.5rem;
    }

    &:nth-child(2) {
      flex: 1;
    }
  }

  ${props =>
    props.name === 'stars' &&
    css`
      color: white;
      background-color: #17a2b8;
    `}

  ${props =>
    props.name === 'watchers' &&
    css`
      color: white;
      background-color: #343a40;
    `}

  ${props =>
    props.name === 'forks' &&
    css`
      border: #ccc solid 1px;
      background-color: #f4f4f4;
    `}
`

const ProfileGithub: React.FC = () => {
  const profile = useContext(ProfileContext)
  const { repos } = profile.state

  return repos.length > 0 ? (
    <ProfileGithubStyled>
      <Title>
        <IconStyledWrapper>
          <Icon icon="github" size="2x" />
        </IconStyledWrapper>
        <span>Github Repos</span>
      </Title>
      <RepoList>
        {repos.map(repo => {
          return (
            <RepoItem key={repo.id}>
              <RepoInfo>
                <RepoName>
                  <a
                    href={repo['html_url']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </RepoName>
                {repo.description && <RepoDesc>{repo.description}</RepoDesc>}
              </RepoInfo>

              <RepoMetaList>
                <RepoMetaItem name="stars">
                  <IconStyledWrapper>
                    <Star size="14" />
                  </IconStyledWrapper>
                  <span>Stars: </span>
                  <span>{repo.stargazers_count}</span>
                </RepoMetaItem>

                <RepoMetaItem name="watchers">
                  <IconStyledWrapper>
                    <Eye size="14" />
                  </IconStyledWrapper>
                  <span>Watchers: </span>
                  <span>{repo.watchers_count}</span>
                </RepoMetaItem>

                <RepoMetaItem name="forks">
                  <IconStyledWrapper>
                    <CodeBranch size="14" />
                  </IconStyledWrapper>
                  <span>Forks: </span>
                  <span>{repo.forks_count}</span>
                </RepoMetaItem>
              </RepoMetaList>
            </RepoItem>
          )
        })}
      </RepoList>
    </ProfileGithubStyled>
  ) : null
}

export { ProfileGithub }
