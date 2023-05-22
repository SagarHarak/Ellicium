import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CButton, CNavItem } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/brand/Logo-Login-Page.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { doLogout } from 'src/API/Actions'
// sidebar nav config
import navigation from '../_nav'
import { cilAccountLogout } from '@coreui/icons'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sidebarUnfoldable } = useSelector((state) => state.template)
  const { sidebarShow } = useSelector((state) => state.template)
  let username = localStorage.getItem("uname");

  const LogoutUser = async (e) => {
    e.preventDefault();
    let bodyParam = JSON.stringify({ username });
    const response = await doLogout(bodyParam);
    if (response.status === 200) {
      localStorage.clear()
      navigate('/');
      // alert('You Logged Out Successfully');
    } else {
      alert("Something went wrong while logging out!");
    }
  };

  return (
    <CSidebar
    className="background-color-sidebar"
      colorScheme="light"
      position="fixed"
      unfoldable={false}
      narrow={ sidebarUnfoldable }
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex"  to="/">
        { !sidebarUnfoldable ? <CImage src={logo} height={ 35 }/> : <CImage src={logo} height={ 35 } style={{marginLeft: '100px'}} /> }
        { /* <CIcon className="sidebar-brand-narrow" icon={logo1} height={25} /> */ }
      </CSidebarBrand>
      <CSidebarNav className="background-color-sidebar">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
          <CNavItem onClick={LogoutUser} href="#">
          <CIcon  customClassName="nav-icon" icon={cilAccountLogout} />
          LOGOUT
        </CNavItem>
        </SimpleBar>
      </CSidebarNav>
      {/* <CButton onClick={LogoutUser}>Log Out</CButton> */}
      <CSidebarToggler
        className="d-none d-lg-flex background-color-sidebar"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !sidebarUnfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
