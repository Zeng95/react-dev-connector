import React from 'react'
import { Modal, Icon, Button } from 'rsuite'

const DeleteConfirm: React.FC = () => {
  return (
    <Modal backdrop="static" size="xs">
      <Modal.Body>
        <Icon icon="remind" style={{ color: '#ffb300', fontSize: 24 }} />
        {'  '}
        Once a project is disabled, there will be no update on project report,
        and project members can access history data only. Are you sure you want
        to proceed?
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary">Ok</Button>
        <Button appearance="subtle">Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export { DeleteConfirm }
