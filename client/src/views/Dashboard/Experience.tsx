import {
  HeaderCellStyled,
  SectionContent,
  SectionStyled,
  SectionTitle
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { useProfileExperience } from 'hooks/useProfileExperience'
import moment from 'moment'
import React, { Fragment, useContext } from 'react'
import { Icon, IconButton, Table } from 'rsuite'

const { Column, Cell } = Table

const ExperienceSection: React.FC = () => {
  const profileState = useContext(ProfileContext).state
  const { profile } = profileState

  const experience = useProfileExperience()
  const { submitting, onDelete, navigateToEditExperience } = experience

  return (
    <SectionStyled>
      <SectionTitle>Experience Credentials</SectionTitle>

      {profile ? (
        <SectionContent>
          <Table
            data={profile.experience}
            autoHeight={true}
            headerHeight={60}
            rowHeight={70}
          >
            {/* Company */}
            <Column sortable flexGrow={1} verticalAlign="middle">
              <HeaderCellStyled>Company</HeaderCellStyled>
              <Cell dataKey="company" />
            </Column>

            {/* Title */}
            <Column sortable flexGrow={1} verticalAlign="middle">
              <HeaderCellStyled>Title</HeaderCellStyled>
              <Cell dataKey="title" />
            </Column>

            {/* Years */}
            <Column sortable flexGrow={1} verticalAlign="middle">
              <HeaderCellStyled>Years</HeaderCellStyled>
              <Cell>
                {(rowData: any) => {
                  const { from, to } = rowData

                  return (
                    <Fragment>
                      <span>{moment(from).format('YYYY.MM.DD')}</span>
                      <span className="mx-2">-</span>
                      <span>
                        {to === null ? 'Now' : moment(to).format('YYYY.MM.DD')}
                      </span>
                    </Fragment>
                  )
                }}
              </Cell>
            </Column>

            {/* Actions */}
            <Column flexGrow={1} align="center" verticalAlign="middle">
              <HeaderCellStyled>Actions</HeaderCellStyled>
              <Cell>
                {(rowData: any) => (
                  <Fragment>
                    <IconButton
                      disabled={submitting}
                      className="mr-2"
                      icon={<Icon icon="pencil" />}
                      appearance="primary"
                      size="lg"
                      title="edit"
                      onClick={() => navigateToEditExperience(rowData['_id'])}
                    />
                    <IconButton
                      loading={submitting}
                      icon={<Icon icon="trash" />}
                      color="red"
                      size="lg"
                      title="delete"
                      onClick={() => onDelete(rowData['_id'])}
                    />
                  </Fragment>
                )}
              </Cell>
            </Column>
          </Table>
        </SectionContent>
      ) : null}
    </SectionStyled>
  )
}

export { ExperienceSection }
