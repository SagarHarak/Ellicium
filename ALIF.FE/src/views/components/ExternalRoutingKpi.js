import React from 'react'
import { CCol, CWidgetStatsA, CWidgetStatsB, CRow } from '@coreui/react-pro'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import SkeletonLoading from 'src/components/SkeltonLoading'

const Kpis = () => {
  const { externalRoutingKpiLoader, externalRoutingKpiData } = useSelector((state) => state.externalRoutingKpi)

  return (
    <>
      <CRow>
        <CCol md={4} style={{ padding: 0, paddingLeft: '10px' }}>
          {externalRoutingKpiLoader ? (
            <SkeletonLoading width="100%" height="121px" radius="0px" />
          ) : (
            <CWidgetStatsA
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.86)',
                fontWeight: '400',
                height: '100%',
              }}
              className="mb-12 kpi1 text-white "
              value={
                <span>
                  {(externalRoutingKpiData[0] != undefined && externalRoutingKpiData[0] != null) ?
                    externalRoutingKpiData[0].components_required : 0}
                  {/* <span className="fs-6 fw-normal">(+12.3%)</span> */}
                </span>
              }
              title="Total COGs"
              chart={
                <CChartBar
                  // className="mt-3 mx-3"
                  style={{ height: '30px' }}
                  data={{
                    labels: Label,
                    datasets: Datasets,
                  }}
                  options={Options}
                />
              }
            />
          )}
        </CCol>
        <CCol md={4} style={{ padding: 0, paddingLeft: '10px' }}>
          {externalRoutingKpiLoader ? (
            <SkeletonLoading width="100%" height="121px" radius="0px" />
          ) : (
            <CWidgetStatsA
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.86)',
                fontWeight: '400',
                height: '100%',
              }}
              className="mb-12 kpi2 "
              color="danger"
              value={
                <span>
                  {(externalRoutingKpiData[0] != undefined && externalRoutingKpiData[0] != null) ?
                    externalRoutingKpiData[0].avg_risk_score : 0}%
                  {/* <span className="fs-6 fw-normal">(+5.3%)</span> */}
                </span>
              }
              title="Overall Exposure"
              chart={
                <CChartLine
                  // className="mt-3 mx-3"
                  style={{ height: '30px' }}
                  data={{
                    labels: Label,
                    datasets: Datasets,
                  }}
                  options={Options}
                />
              }
            />
          )}
        </CCol>
        <CCol md={4} style={{ padding: 0, paddingLeft: '10px' }}>
          {externalRoutingKpiLoader ? (
            <SkeletonLoading width="100%" height="121px" radius="0px" />
          ) : (
            <CWidgetStatsA
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.86)',
                fontWeight: '400',
                height: '100%',
              }}
              className="mb-12 kpi3 "
              color="danger"
              // value={
              //   <>
              //     { (externalRoutingKpiData[0] != undefined && externalRoutingKpiData[0] != null) ? 
              //         '$' + externalRoutingKpiData[0].invoice_amount + 'M' : '$0M' }
              //     {/* <span className="fs-6 fw-normal">(-6)</span> */}
              //   </>
              // }
              value={`$ ${(externalRoutingKpiData[0]?.invoice_amount / 1000000).toFixed(2) || 0} M`}

              title="Revenue at Risk"
              chart={
                <CChartBar
                  // className="mt-3 mx-3"
                  style={{ height: '30px' }}
                  data={{
                    labels: Label,
                    datasets: Datasets,
                  }}
                  options={Options}
                />
              }
            />
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Kpis

const Label = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawTicks: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        display: false,
      },
    },
  },
}

const Datasets = [
  {
    label: 'Dataset',
    backgroundColor: 'rgba(255,255,255,.22)',
    borderColor: 'rgba(255,255,255,.22)',
    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
    barPercentage: 0.6,
  },
]

Kpis.propTypes = {
  data: PropTypes.object,
}
