import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'

import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CImage
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import {
  AppHeaderDropdown,
} from './header/index'

import logo from 'src/assets/brand/Logo-Login-Page.png'

const AppHeader = () => {
  const dispatch = useDispatch()

  const { theme } = useSelector((state) => state.template)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const { sidebarShow } = useSelector((state) => state.template)

  return (
    <CHeader position="sticky" className="header m-0 p-0" >
      <CContainer fluid>
        <CHeaderToggler
          className={classNames('px-md-0 me-md-3 d-lg-none', {
            'prevent-hide': !sidebarShow,
          })}
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CImage src={logo} style={{height: '40px'}} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <CIcon icon={cilMenu} size="lg" />
          
        </CHeaderToggler>
        <CHeaderToggler
          className={classNames('px-md-0 me-md-3 d-lg-none', {
            'prevent-hide': sidebarShow,
          })}
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          
          
        </CHeaderToggler>
        
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
