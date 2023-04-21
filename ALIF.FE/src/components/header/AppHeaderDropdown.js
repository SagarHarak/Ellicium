import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImage
} from '@coreui/react-pro'
import {
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import logo from 'src/assets/brand/Logo.svg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CImage style={{ filter: 'invert(10)' }} src={logo} height={ 25 } />
      { /* <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilUser} className="me-2" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
  </CDropdownMenu> */ }
    </CDropdown>
  )
}

export default AppHeaderDropdown
