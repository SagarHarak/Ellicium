import { CCloseButton, CImage, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import React from 'react'
import PropTypes from 'prop-types'

const CustomModal = ({ size, visible, children, setVisible }) => {
  return (
    <CModal classname="rounded-0 " size={size} visible={visible} onClose={() => setVisible(false)}>
      {/* <CModalHeader
        style={{
          backgroundColor: '#161a1e',
          border: "none"
        }}
      ></CModalHeader> */}
      <CModalBody
      className='custom-modal-background'
        style={{
          border: "none"
        }}
      >
        <CCloseButton className='close-button' onClick={() => setVisible(false)}/>
        {children}
      </CModalBody>
    </CModal>
  )
}

export default CustomModal

CustomModal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any,
  setVisible: PropTypes.func,
  size: PropTypes.string
}
