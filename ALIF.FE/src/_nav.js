import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBarChart, cilHome, cilSettings, cilStream } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react-pro'

const _nav = [
  // {
  //   component: CNavGroup,
  //   name: 'HOME',
  //   // to: '/dashboard',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Summary Dashboard',
  //       to: '/dashboard',
  //     }
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'ANALYTICS',
  //   icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'VCN and Exposure',
  //       to: '/vcn-exposure',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Supplier Scorecard',
  //       to: '/scorecard',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Supplier Outreach',
  //       to: '/analytics/supplier-outreach',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Digital Twin',
  //       to: '/analytics/digital-twin',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Sales Analytics',
  //       to: '/analytics/sales-analytics',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'COGs Analytics',
  //       to: '/theme/typography',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Competitor Analysis',
  //       to: '/analytics/competitor-analytics',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'SCENARIO MANAGEMENT',
  //   icon: <CIcon icon={cilStream} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'What If Analysis',
  //       to: '/analytics/what-if-analysis',
  //     },
  //   ],
  // },

  ////////////////////////////////////////////////////////////////////////
  {
    component: CNavGroup,
    name: 'ICE',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Management Reports',
        to: '/ice/management-reports',
      },
      {
        component: CNavItem,
        name: 'Margin Management',
        to: '/ice/margin-management',
      },
      {
        component: CNavItem,
        name: 'Simulation & Scenario Planning',
        to: '/ice/simulation-scenario-planning',
      },
      {
        component: CNavItem,
        name: 'Analytics',
        to: '/ice/analytics',
      },
    ],
  },
  ///////////////////////////////////////////////////////////////////////////
  {
    component: CNavItem,
    name: 'CONFIG',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    to: '/config/datamanagement',
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Data Management',
    //     to: '/config/datamanagement',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Risk Selection',
    //     to: '/config/riskselection',
    //     //icon: <CIcon icon={cilMinus} customClassName="nav-icon" />,
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Top Selection',
    //     to: '/config/topselection',
    //   },
    // ],
  },
]

export default _nav
