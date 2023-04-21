import React from 'react'

const VCN = React.lazy(() => import('./views/pages/analytics/vcn/index'))
const SC = React.lazy(() => import('./views/pages/analytics/vcn/ScoreCard'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DigitalTwin = React.lazy(() => import('./views/DigitalTwin'))
const SupplierOutreach = React.lazy(() => import('./views/SupplierOutreach'))
const SalesAnalytics = React.lazy(() => import('./views/SalesAnalytics'))
const WhatIfAnalysis = React.lazy(() => import('./views/WhatIfAnalysis'))
const CompetitorAnalysis = React.lazy(() => import('./views/pages/DataAnalysisDashboard/CompetitorAnalysis'))
const RiskSelection = React.lazy(() => import('./views/pages/Config/RiskSelection/RiskSelection'))
const DataManagement1 = React.lazy(() => import('./views/pages/Config/DataManagement/DataManagement1'))
const TopSelection = React.lazy(() => import('./views/pages/Config/TopSelection'))
///////////////////////////////////////////////////////////////////////////////////////
const managementReports = React.lazy(() => import('./views/pages/ice/managementReports'))
const marginManagement = React.lazy(() => import('./views/pages/ice/marginManagement'))
const simulationScenarioPlanning = React.lazy(() => import('./views/pages/ice/simulation&ScenarioPlanning'))
const iceAnalytics = React.lazy(() => import('./views/pages/ice/Analytics'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Ice Analytics', element: iceAnalytics },
  { path: '/vcn-exposure', name: 'VCN - Exposure', element: VCN },
  { path: '/scorecard', name: 'Supplier Scorecard', element: SC },
  { path: '/analytics/digital-twin', name: 'Digital Twin', element: DigitalTwin },
  { path: '/analytics/supplier-outreach', name: 'Supplier Outreach', element: SupplierOutreach },
  // { path: '/analytics/sales-analytics', name: 'What If Analysis', element: SalesAnalytics },
  { path: '/analytics/what-if-analysis', name: 'What If Analysis', element: WhatIfAnalysis },
  { path: '/analytics/competitor-analytics', name: 'Competitor Analysis', element: CompetitorAnalysis },
  { path: '/config/riskselection', name: 'Risk Selection', element: RiskSelection },
  { path: '/config/datamanagement', name: 'Data Management', element: DataManagement1 },
  { path: '/config/topselection', name: 'Top Selection', element: TopSelection },
  ///////////////////////////////////////////////////////////////////////////////////////////
  { path: 'ice/management-reports', name: 'Management Reports', element: managementReports },
  { path: 'ice/margin-management', name: 'Margin Management', element: marginManagement },
  { path: 'ice/simulation-scenario-planning', name: 'Simulation Scenario Planning', element: simulationScenarioPlanning },
  { path: 'ice/analytics', name: 'Ice Analytics', element: iceAnalytics },
]


export default routes
