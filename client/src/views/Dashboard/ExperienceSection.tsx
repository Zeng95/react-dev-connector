import {
  DashboardSection,
  DashboardSectionContent as SectionContent,
  DashboardSectionTitle as SectionTitle,
  HeaderCellStyled
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { useProfileExperience } from 'hooks/useProfileExperience'
import moment from 'moment'
import React, { Fragment, useContext } from 'react'
import { Icon, IconButton, Table } from 'rsuite'

const { Column, Cell } = Table

const ExperienceSection: React.FC = () => {
  const profile = useContext(ProfileContext)
  const { profile: singleProfile } = profile.state

  const experience = useProfileExperience()
  const { tableLoading, handleDelete, navigateToEditExperience } = experience

  return (
    <DashboardSection>
      <SectionTitle>Experience Credentials</SectionTitle>

      {singleProfile ? (
        <SectionContent>
          <Table
            loading={tableLoading}
            data={singleProfile.experience}
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
                      className="mr-2"
                      icon={<Icon icon="pencil" />}
                      appearance="primary"
                      size="lg"
                      title="Edit"
                      onClick={() => navigateToEditExperience(rowData['_id'])}
                    />
                    <IconButton
                      icon={<Icon icon="trash" />}
                      color="red"
                      size="lg"
                      title="Delete"
                      onClick={() => handleDelete(rowData['_id'])}
                    />
                  </Fragment>
                )}
              </Cell>
            </Column>
          </Table>
        </SectionContent>
      ) : null}
    </DashboardSection>
  )
}

export { ExperienceSection }
