import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCol, CContainer, CRow } from '@coreui/react'
import PageHeader from 'src/components/PageHeader'
import StackedHorizontal from 'src/components/charts/StackedHorizontal/StackedHorizontal'
import PropTypes from 'prop-types'
import StackedHorizontalBar from 'src/components/charts/StackedHorizontal/StackedHorizontalBar'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react-pro'
import plusicon from '../../assets/plusicon.png'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import pinicon from '../../assets/pinicon.png'
import threedot from '../../assets/threedot.png'
import SkeletonLoading from '../../components/SkeltonLoading'
import { useDispatch, useSelector } from 'react-redux'
import { getImportAsync, getInventoryAsync, getProductCategory } from 'src/redux/async'
import Exposure from '../components/Exposure'

const Dashboard = () => {
  const token = `${localStorage.getItem('accesstoken')}`
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { InventoryLoader, Inventory } = useSelector((state) => state.inventoryanalysis)
  const { ImportLoader, Import } = useSelector((state) => state.importanalysis)

  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    dispatch(getInventoryAsync())
    dispatch(getImportAsync())
    dispatch(getProductCategory())

  }, [])
  const data = [
    {
      risk_type: 'ZUTL',
      score: 89.5,
    },
    {
      risk_type: 'ZTRG',
      score: 43.2,
    },
    {
      risk_type: 'ZFIN',
      score: 20.3,
    },
    {
      risk_type: 'ZROH',
      score: 89.9,
    },
    {
      risk_type: 'ZEMI',
      score: 45.7,
    },
    {
      risk_type: 'ZPAK',
      score: 20.4,
    },
  ]
  const data1 = [
    {
      risk_type: 'ZUTL',
      score: 12,
    },
    {
      risk_type: 'ZTRG',
      score: 34,
    },
    {
      risk_type: 'ZFIN',
      score: 23,
    },
    {
      risk_type: 'ZROH',
      score: 54,
    },
    {
      risk_type: 'ZEMI',
      score: 10,
    },
    {
      risk_type: 'ZPAK',
      score: 89,
    },
  ]
  const { productByCategoryLoader, productByCategoryError, productByCategory_state } = useSelector(
    (state) => state.productByCategory,
  )
  
    const convertData = (data) => {
      if (data) {
        let newdata = []
        for (let index = 0; index < data?.length; index++) {
          newdata.push({ risk_type:data[index]?.product_category, score: Number(data[index]?.avg_score) })
        }
        return newdata
      }
    }
  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <PageHeader name="Summary Dashboard" />
        <div
          style={{
            backgroundColor: '#5AAD46',
            height: '40px',
            width: '152px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'Roboto',
            cursor: 'pointer',
          }}
          className="d-flex justify-content-center align-items-center"
        >
          Add Charts
          <img
            src={plusicon}
            alt="plus"
            width="15px"
            style={{
              marginLeft: '30px',
            }}
          />
        </div>
      </div>

      <CContainer fluid className="h-100 w-100 p-0 m-0">
        <CRow>
          <CCol md={6}>
            <CCard>
              <CCardHeader
                style={{
                  padding: '13px',
                }}
              >
                <CCol className="d-flex justify-content-between">
                  <div className="cardtitle">Inventory Analysis</div>
                  <div>
                    <img
                      src={pinicon}
                      alt="pinicon"
                      width="14px"
                      style={{
                        margin: '0 10px 0 0',
                        cursor: 'pointer',
                      }}
                    />
                    <DropDownCustom unique="inventory">
                      <img
                        src={threedot}
                        alt="threedot"
                        width="25px"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </DropDownCustom>
                  </div>
                </CCol>
              </CCardHeader>
              <CCardBody className="default-Card">
                <CRow>
                  <CCol md={4} className='px-1'>
                    {InventoryLoader ? (
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
                            {Inventory[0]?.Inventory_Turnover_Rate}
                            {/* <span className="fs-6 fw-normal">(+12.3%)</span> */}
                          </span>
                        }
                        title="Inventory Turnover Ratio"
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
                  <CCol md={4} className='px-1'>
                    {InventoryLoader ? (
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
                            {Inventory[0]?.Inventory_Rate_Of_Return}%
                            {/* <span className="fs-6 fw-normal">(+5.3%)</span> */}
                          </span>
                        }
                        title="Rate of Return"
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
                  <CCol md={4} className='px-1'>
                    {InventoryLoader ? (
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
                        value={
                          <>
                            {FprmatNumber(Inventory[0]?.Inventory_Write_Off_Reserves)}
                            {/* <span className="fs-6 fw-normal">(-6)</span> */}
                          </>
                        }
                        title="Write Off Reserves"
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
                <h2 className="hrline">
                  <span>Overall</span>
                </h2>
                {InventoryLoader ? (
                  <SkeletonLoading width="100%" height="39px" radius="0px" className="my-3" />
                ) : (
                  <h3
                    className="fs-5 text-center fw-semibold m-0 p-0"
                    style={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: '800',
                      fontSize: '16px',
                      lineHeight: '19px',
                    }}
                  >
                    $ {(Inventory[0]?.Overall / 1000000).toFixed(2) + 'M' || 0}
                  </h3>
                )}

                {InventoryLoader ? (
                  <SkeletonLoading width="100%" height="39px" radius="0px" className="my-3" />
                ) : (
                  <StackedHorizontal
                    chartID="inventory"
                    width="105%"
                    height="65px"
                    data={[
                      {
                        year: '2022',
                        overall: Math.ceil(Number(Inventory[0]?.Overall)),
                        risk: Math.ceil(Number(Inventory[0]?.Overall_Risk)),
                        mitigation: Math.ceil(Inventory[0]?.Mitigation),
                      },
                    ]}
                    overallvalue={Number(Inventory[0]?.Overall)}
                  />
                )}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={6}>
            <CCard>
              <CCardHeader
                style={{
                  padding: '13px',
                }}
              >
                <CCol className="d-flex justify-content-between">
                  <div className="cardtitle">Import Analysis</div>
                  <div>
                    <img
                      src={pinicon}
                      alt="pinicon"
                      width="14px"
                      style={{
                        margin: '0 10px 0 0',
                        cursor: 'pointer',
                      }}
                    />
                    <DropDownCustom unique="inventory">
                      <img
                        src={threedot}
                        alt="threedot"
                        width="25px"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </DropDownCustom>
                  </div>
                </CCol>
              </CCardHeader>
              <CCardBody className="default-Card">
                <CRow>
                  <CCol md={4} className='px-1'>
                    {ImportLoader ? (
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
                            {FprmatNumber(Import[0]?.No_Of_Suppliers)}
                            {/* <span className="fs-6 fw-normal">(+12.3%)</span> */}
                          </span>
                        }
                        title="Number of Suppliers"
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
                  <CCol md={4} className='px-1'>
                    {ImportLoader ? (
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
                            $ {FprmatNumber(Import[0]?.Average_Revenue_Of_Suppliers)}
                            {/* <span className="fs-6 fw-normal">(+5.3%)</span> */}
                          </span>
                        }
                        title="Avg Revenue of Suppliers"
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
                  <CCol md={4} className='px-1'>
                    {ImportLoader ? (
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
                        value={
                          <>
                            {Import[0]?.Average_Credit_Health}
                            {/* <span className="fs-6 fw-normal">(-6)</span> */}
                          </>
                        }
                        title="Avg Credit Health"
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
                <h2 className="hrline default-Card">
                  <span className="default-Card">Overall</span>
                </h2>
                {InventoryLoader ? (
                  <SkeletonLoading width="100%" height="39px" radius="0px" className="my-3" />
                ) : (
                  <h3
                    className="fs-5 text-center fw-semibold m-0 p-0"
                    style={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: '800',
                      fontSize: '16px',
                      lineHeight: '19px',
                    }}
                  >
                    $ {(Import[0]?.Overall / 1000000).toFixed(2) + 'M'}
                  </h3>
                )}

                {ImportLoader ? (
                  <SkeletonLoading width="100%" height="39px" radius="0px" className="my-3" />
                ) : (
                  <StackedHorizontal
                    chartID="import"
                    width="105%"
                    height="65px"
                    data={[
                      {
                        year: '2022',
                        overall: Math.ceil(Number(Import[0]?.Overall)),
                        risk: Math.ceil(Number(Import[0]?.Overall_Risk)),
                        mitigation: Math.ceil(Import[0]?.Mitigation),
                      },
                    ]}
                  />
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* <CRow className="mt-3">
          <CCol md={12} className="py-4">
            <CCard>
              <CCardHeader
                style={{
                  padding: '13px',
                }}
              >
                <CCol className="d-flex justify-content-between">
                  <div>Sales Analysis</div>
                  <div>
                    <img
                      src={pinicon}
                      alt="pinicon"
                      width="14px"
                      style={{
                        margin: '0 10px 0 0',
                        cursor: 'pointer',
                      }}
                    />
                    <DropDownCustom unique="inventory">
                      <img
                        src={threedot}
                        alt="threedot"
                        width="25px"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </DropDownCustom>
                  </div>
                </CCol>
              </CCardHeader>
              <CCardBody className="py-4">
                <CRow>
                  <CCol md={2}>
                    {loading ? (
                      <SkeletonLoading width="190px" height="121px" radius="0px" />
                    ) : (
                      <CWidgetStatsA
                        className="mb-12 kpi1 text-white "
                        value={
                          <span>
                            $14.3M
                            <span className="fs-6 fw-normal">(+12.3%)</span>
                          </span>
                        }
                        title="Total Spend"
                        chart={
                          <CChartBar
                            className="mt-3 mx-3 "
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

                    {loading ? (
                      <SkeletonLoading width="190px" height="121px" radius="0px" className="my-3" />
                    ) : (
                      <CWidgetStatsA
                        className="kpi2  my-3"
                        color="danger"
                        value={
                          <span>
                            $2.8M
                            <span className="fs-6 fw-normal">(+5.3%)</span>
                          </span>
                        }
                        title="Revenue at risk"
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
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

                    {loading ? (
                      <SkeletonLoading width="190px" height="121px" radius="0px" />
                    ) : (
                      <CWidgetStatsA
                        className="mb-12 kpi3 "
                        color="danger"
                        value={
                          <>
                            $812M
                            <span className="fs-6 fw-normal">(-6)</span>
                          </>
                        }
                        title="Suppliers at risk."
                        chart={
                          <CChartBar
                            className="mt-3 mx-3"
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
                  <CCol md={10} className="d-flex align-items-end">
                    <StackedHorizontalBar
                      chartID="salesanalysis"
                      width="100%"
                      height="350px"
                      data={StackedHorizontalDataBar}
                    />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow> */}
        <CRow
          style={{
            margin: '0 2px',
          }}
        ></CRow>
      </CContainer>
      <br />
      <CContainer fluid className="h-100 w-100 p-0 m-0">
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader
                style={{
                  padding: '13px',
                }}
              >
                <CCol className="d-flex justify-content-between">
                  <div className="cardtitle">Risk by Category</div>
                  <div>
                    <img
                      src={pinicon}
                      alt="pinicon"
                      width="14px"
                      style={{
                        margin: '0 10px 0 0',
                        cursor: 'pointer',
                      }}
                    />
                    <DropDownCustom unique="inventory">
                      <img
                        src={threedot}
                        alt="threedot"
                        width="25px"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </DropDownCustom>
                  </div>
                </CCol>
              </CCardHeader>
              <CCardBody className="default-Card" style={{ height: '425px' }}>
                <CRow style={{ height: '400px' }}>
                  <CCol style={{ height: '350px' }}>
                    <span style={{ fontSize: '20px' }}>Tier 1 Categories</span>
                    <Exposure data={convertData(productByCategory_state)} chartID="left_chart" />
                  </CCol>
                  <CCol style={{ height: '350px' }}>
                    <span style={{ fontSize: '20px' }}>Tier 2 Categories</span>
                    <Exposure data={data1} chartID="right_chart" />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard

const DropDownCustom = ({ children, unique }) => {
  return (
    <CDropdown alignment="end" className="default-Card">
      <CDropdownToggle color="#282933" className="default-Card">
        {children}
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem className="text-body drop-item cursor-pointer colordropdown">
          Edit
        </CDropdownItem>
        <CDropdownItem className="text-body drop-item cursor-pointer colordropdown">
          Change KPIs
        </CDropdownItem>
        <CDropdownItem className="text-body drop-item cursor-pointer colordropdown">
          Share
        </CDropdownItem>
        <CDropdownItem className="text-body drop-item cursor-pointer colordropdown">
          Move
        </CDropdownItem>
        <CDropdownItem
          className="text-body drop-item cursor-pointer colordropdown"
          // onClick={(e) => fullscreendisable(unique)}
        >
          Full Screen
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

DropDownCustom.propTypes = {
  children: PropTypes.object,
  unique: PropTypes.string,
}

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
    // label: 'Dataset',
    backgroundColor: 'rgba(255,255,255,.22)',
    borderColor: 'rgba(255,255,255,.22)',
    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
    barPercentage: 0.6,
  },
]

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

function FprmatNumber(num) {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return 0
}
