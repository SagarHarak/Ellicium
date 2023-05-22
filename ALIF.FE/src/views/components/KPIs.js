import React from 'react'
import { CCol, CRow, CWidgetStatsA, CWidgetStatsB } from '@coreui/react-pro'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import SkeletonLoading from 'src/components/SkeltonLoading'

const Kpis = () => {
  const { VCNKPILoader, VCNKPI, VCNKPI_trends } = useSelector((state) => state.kpivcn)
  return (
    <CRow className="mt-3  m-0 p-0 w-100"
    >
<CCol className="vcnfilters p-0 ">

      <CCol
        // sm={2}
        // style={{paddingRight:0,paddingLeft:0}}
         className="vcnfilterscolumn p-0"
         >
        {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="121px" radius="0px" className="skeletonvcnkpi" />
        ) : (
          <CWidgetStatsA
            className="kpi1 text-white"
            value={`$ ${(VCNKPI?.total_revenue / 1000000).toFixed(2) || 0} M`}
            title="Total Revenue"
            chart={
              <CChartBar
              data={{
                  labels: VCNKPI_trends?.total_revenue_chart?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.total_revenue_chart?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
              />
            }
          />
        )}
      </CCol>
      <CCol
      // sm={2}
      // style={{paddingRight:0,paddingLeft:'10px'}}
         className="vcnfilterscolumn p-0"
                  
                  >

        {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="121px" radius="0px" className="skeletonvcnkpi" />
          ) : (
          <CWidgetStatsA
            className="kpi5 text-white "
            value={`$ ${(VCNKPI?.total_spend / 1000000).toFixed(2) || 0} M`}
            title="Total Spend"
            chart={
              <CChartBar
              data={{
                labels: VCNKPI_trends?.total_spend_chart?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.total_spend_chart?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
                />
            }
          />
        )}
          </CCol>
          <CCol
      // sm={2}
      // style={{paddingRight:0,paddingLeft:'10px'}}

        //  style={{paddingRight:'0px',width:'14.28%'}}

         className="vcnfilterscolumn p-0"
        >

        {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="121px" radius="0px" className="skeletonvcnkpi" />
          ) : (
            <CWidgetStatsA
            className="kpi4 text-white "
            value={`$ ${(VCNKPI?.total_margin / 1000000).toFixed(2) || 0} M`}
            title="Total Margin"
            chart={
              <CChartBar
              data={{
                  labels: VCNKPI_trends?.total_margin_chart?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.total_margin_chart?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
              />
            }
            />
            )}
            </CCol>
            <CCol
      // sm={2}
      // style={{paddingRight:0,paddingLeft:'10px'}}

      // style={{paddingRight:'0px',width:'14.28%'}}

         className="vcnfilterscolumn p-0"
         >

        {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="121px" radius="0px" className="skeletonvcnkpi" />
          ) : (
            <CWidgetStatsA
            className="kpi2 "
            color="danger"
            value={`$ ${(VCNKPI?.revenue_at_risk / 1000000).toFixed(2) || 0} M`}
            title="Revenue at risk"
            chart={
              <CChartLine
                data={{
                  labels: VCNKPI_trends?.revenue_at_risk_chart?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.revenue_at_risk_chart?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
                />
              }
            />
            )}
          </CCol>
          <CCol
      // sm={2}
      // style={{paddingRight:0,paddingLeft:'10px'}}

      //  style={{paddingRight:'0px',width:'14.28%'}}

         className="vcnfilterscolumn p-0"
         >

        {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="121px" radius="0px" className="skeletonvcnkpi" />
        ) : (
          <CWidgetStatsA
          className="kpi3 "
          color="danger"
          value={<span style={{ fontSize: '24px' }}> {VCNKPI?.supplier_at_risk || 0}</span>}
          title="Suppliers at risk"
          chart={
            <CChartBar
            data={{
              labels: VCNKPI_trends?.supplier_at_risk?.label,
              datasets: [
                {
                  // label: 'Spend',
                  backgroundColor: 'rgba(255,255,255,.22)',
                  borderColor: 'rgba(255,255,255,.22)',
                  data: VCNKPI_trends?.supplier_at_risk?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
              />
            }
            />
            )}
          </CCol>
          <CCol
      //     sm={2}
      // style={{paddingRight:0,paddingLeft:'10px'}}

      
        
       className="vcnfilterscolumn p-0 m-0"
         >

        {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="121px" radius="0px" className="skeletonvcnkpi" />
          ) : (
            <CWidgetStatsA
            className="kpi4 text-white"
          value={`${VCNKPI?.components_at_risk || 0}`}
          title="Components at Risk"
          chart={
            <CChartBar
            data={{
              labels: VCNKPI_trends?.component_at_risk?.label,
              datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.component_at_risk?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
                />
              }
              />
            )}
            </CCol>
        {/* VCNKPILoader ? (
          <SkeletonLoading width="100%" height="130px" radius="0px" className="skeletonvcnkpi" />
        ) : (
          <CWidgetStatsA
          className="kpi4 vcnanalysiskpi"
          color="danger"
          value={` ${VCNKPI?.product_at_risk || 0}`}
            title="Products at Risk"
            chart={
              <CChartBar
              data={{
                labels: VCNKPI_trends?.product_at_risk?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.product_at_risk?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
              />
            }
          />
          ) */}
        {/* {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="130px" radius="0px" className="skeletonvcnkpi" />
          ) : (
            <CWidgetStatsA
            className="kpi5 vcnanalysiskpi"
            color="danger"
            value={` ${VCNKPI?.key_event || 0}`}
            title="The key events"
            chart={
              <CChartLine
              data={{
                  labels: VCNKPI_trends?.key_events_chart?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.key_events_chart?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
                />
            }
            />
          )} */}
        {/* {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="130px" radius="0px" className="skeletonvcnkpi" />
          ) : (
          <CWidgetStatsA
          className="kpi2 vcnanalysiskpi m-0"
          color="danger"
          value={` ${VCNKPI?.key_locations || 0}`}
            title="Key Locations"
            chart={
              <CChartLine
              data={{
                  labels: VCNKPI_trends?.key_location_chart?.label,
                  datasets: [
                    {
                      // label: 'Spend',
                      backgroundColor: 'rgba(255,255,255,.22)',
                      borderColor: 'rgba(255,255,255,.22)',
                      data: VCNKPI_trends?.key_location_chart?.value,
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={Options}
                style={{ height: '40px' }}
              />
            }
            />
          )} */}
        {/* {VCNKPILoader ? (
          <SkeletonLoading width="100%" height="130px" radius="0px" />
        ) : (
          <CWidgetStatsB
          className="kpi6 vcnanalysiskpi m-0"
          inverse
            progress={{ color: 'rgba(42, 32, 151, 1)', value: 100 }}
            text=""
            title="Key Locations"
            value={`${VCNKPI?.key_locations || 0}`}
            />
          )} */}
          </CCol>
    </CRow>
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
