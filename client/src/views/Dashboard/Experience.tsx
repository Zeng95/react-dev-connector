import { ProfileContext } from 'context/profile/ProfileContext'
import moment from 'moment'
import React, { Fragment, useContext } from 'react'
import { Icon, IconButton, Table } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const { Column, HeaderCell, Cell } = Table

const SectionStyled = styled.section``
const SectionTitle = styled.h2.attrs({
  className: 'flex items-center my-8 text-2xl font-bold'
})`
  span {
    ${tw`ml-2`}
  }
`
const SectionContent = styled.div``
const HeaderCellStyled = styled(HeaderCell)`
  .rs-table-cell {
    background-color: #f4f4f4 !important;
    color: #333;
    border-right: 2px solid white;
  }

  .rs-table-cell-content {
    line-height: 40px;
    ${tw`text-base`}
  }

  &:last-of-type {
    .rs-table-cell {
      border: none;
    }
  }
`

const ExperienceSection: React.FC = () => {
  const profileState = useContext(ProfileContext).state
  const { profile } = profileState

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
                <IconButton
                  className="mr-2"
                  icon={<Icon icon="pencil" />}
                  appearance="primary"
                  size="lg"
                  title="edit"
                />
                <IconButton
                  icon={<Icon icon="trash" />}
                  color="red"
                  size="lg"
                  title="delete"
                />
              </Cell>
            </Column>
          </Table>
        </SectionContent>
      ) : null}
    </SectionStyled>
  )
}

export { ExperienceSection }
