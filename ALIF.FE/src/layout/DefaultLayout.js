import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const location = useLocation()
  const { pathname } = location

  // useEffect(() => {
  //   if (window.innerWidth > 1024) {
  //     if (pathname === '/dashboard') {
  //       document.querySelector('body').classList.add('overflow-hidden')
  //     } else {
  //       document.querySelector('body').classList.remove('overflow-hidden')
  //     }
  //   }
  // }, [pathname])

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 background-color">
        <AppHeader />
        <div className="body flex-grow-1 px-3 background-color" >
          <AppContent />
        </div>
        <br/>
        { /* <AppFooter /> */ }
      </div>
      <AppAside />
    </>
  )
}

export default DefaultLayout
