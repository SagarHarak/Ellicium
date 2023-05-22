import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeOpen } from '@coreui/icons'

const AppHeaderDropdownMssg = () => {
  const itemsCount = 4
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <span className="d-inline-block my-1 mx-2 position-relative">
          <CIcon icon={cilEnvelopeOpen} size="lg" />
          <CBadge color="danger" position="top-end" shape="rounded-circle" className="p-1">
            <span className="visually-hidden">{itemsCount} new alerts</span>
          </CBadge>
        </span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10">
          <strong>You have {itemsCount} messages</strong>
        </CDropdownHeader>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
            </div>
            <div>
              <small className="text-medium-emphasis">John Doe</small>
              <small className="text-medium-emphasis float-end mt-1">Just now</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important message
            </div>
            <div className="small text-medium-emphasis text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
            </div>
            <div>
              <small className="text-medium-emphasis">Jane Dovve</small>
              <small className="text-medium-emphasis float-end mt-1">5 minutes ago</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-medium-emphasis text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
            </div>
            <div>
              <small className="text-medium-emphasis">Janet Doe</small>
              <small className="text-medium-emphasis float-end mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-medium-emphasis text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 me-3 float-start">
            </div>
            <div>
              <small className="text-medium-emphasis">Joe Doe</small>
              <small className="text-medium-emphasis float-end mt-1">4:03 AM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-medium-emphasis text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#" className="text-center border-top">
          <strong>View all messages</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownMssg