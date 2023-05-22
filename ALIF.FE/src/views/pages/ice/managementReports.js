import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CFormSelect, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react-pro'
import DemandPlanningOrderingTool from './earlyWarningReadrTables/DemandPlanningOrderingTool'
import EarlyLineGraph from './earlyWarningReadrTables/graph/EarlyLineGraph'
import MaterialDemandForecastTable from './earlyWarningReadrTables/materialDemandForecastTable'
import ProjectionForcast from './ForcastPrediction'
import Table from './ForcastPrediction/table'
import { CCol } from '@coreui/react'
import { MultiSelect } from 'react-multi-select-component'
import { commodityPriceForcastAsync, commodityPriceIntelligenceAsync } from 'src/redux/async'
import { useDispatch, useSelector } from 'react-redux'
import CircleLoader from '../../../components/CircleLoader'
import { dropdownData } from './utils'

function ManagementReports() {
  const dispatch = useDispatch()
  const [activeKey, setActiveKey] = useState(1)
  const [demandPlanningTableData, setDemandPlanningTableData] = useState([])
  const [commodityIn, setCommodityIn] = useState('Iron ore - NYM')
  const [selected, setSelected] = useState([
    { label: 'IS22 - Steel wire rod fob N CN', value: 'IS22 - Steel wire rod fob N CN' },
  ])

  const { commodityforcastLoader, commodityforcast } = useSelector(
    (state) => state.commodityforcast,
  )
  const { commodityPriceIntelligenceLoader, commodityPriceIntelligence } = useSelector(
    (state) => state.commodityPriceIntelligence,
  )

  useEffect(() => {
    // let temp
    // for (let i = 0; i < selected.length; i++) {
    //   temp += "'" + selected[i].value + "'"
    // }
    axios.get('http://localhost:3000/api/v3/demand_planning/items').then(
      (response) => {
        setDemandPlanningTableData(response?.data?.data?.demand_planning)
      },
      (error) => {
        console.log(error)
      },
    )
  }, [])

  useEffect(() => {
    dispatch(
      commodityPriceForcastAsync({
        name: commodityIn,
      }),
    )
  }, [commodityIn])

  useEffect(() => {
    let temp = ''
    for (let [index, info] of selected.entries()) {
      if (index == 0) {
        temp += "'" + info.value + "'"
      } else {
        temp = temp + ",'" + info.value + "'"
      }
    }
    dispatch(
      commodityPriceIntelligenceAsync({
        name: temp,
      }),
    )
    console.log("RUN")
  }, [selected])

  return (
    <>
      <CNav variant="pills" role="tablist">
        <CNavItem>
          <CNavLink
            className="nav1"
            style={{ width: '200px', borderRadius: '0px', textAlign: 'center' }}
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Commodity Intelligence
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            className="nav2"
            style={{ width: '200px', borderRadius: '0px', textAlign: 'center' }}
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Early Warning Radar
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 1}>
          <CCol className="mt-4 p-0">
            <CCol
              className="mb-3"
              style={{
                border: '1px solid #323234',
                width: '250px',
              }}
            >
              <CFormSelect
                className="dropdown-font"
                options={[
                  {
                    value: 'Iron ore - NYM',
                    label: 'Iron ore - NYM',
                  },
                  {
                    value: 'Iron ore - SGX',
                    label: 'Iron ore - SGX',
                  },
                  {
                    value: 'Rebar - LME',
                    label: 'Rebar - LME',
                  },
                  {
                    value: 'Rebar - SHF',
                    label: 'Rebar - SHF',
                  },
                  {
                    value: 'Steel Scrap - LME',
                    label: 'Steel Scrap - LME',
                  },
                ]}
                value={commodityIn}
                onChange={(e) => setCommodityIn(e.target.value)}
                style={{
                  height: '100%',
                }}
                // disabled={filtersLoader}
              />
            </CCol>
            {commodityforcastLoader ? (
              <CircleLoader height="150px" />
            ) : (
              <CCol
                style={{
                  backgroundColor: '#18191d',
                  padding: '10px',
                  marginBottom: '20px',
                }}
              >
                <Table className="mb-5" data={commodityforcast} />
              </CCol>
            )}
            {commodityforcastLoader ? (
              <CircleLoader height="150px" />
            ) : (
              <CCol
                style={{
                  backgroundColor: '#18191d',
                  padding: '10px',
                }}
              >
                <ProjectionForcast chartID="projectionforcast" data={commodityforcast} />
              </CCol>
            )}
          </CCol>
        </CTabPane>

        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 2}>
          <CCol className="my-4">
            {/* <h5 className="mb-3">Commodity Price Intelligence</h5> */}

            <CCol
              className="mb-3"
              style={{
                border: '1px solid #323234',
                width: '300px',
              }}
            >
              <MultiSelect
                className="dropdown-font"
                options={dropdownData}
                onChange={(e) => {
                  setSelected(e)
                }}
                style={{ width: '100%' }}
                value={selected}
              />
            </CCol>
            {commodityPriceIntelligenceLoader ? (
              <CircleLoader height="150px" />
            ) : (
              <CCol
                style={{
                  backgroundColor: '#18191d',
                  padding: '10px',
                }}
              >
                <EarlyLineGraph chartID="stackLine" data={commodityPriceIntelligence} />
              </CCol>
            )}
          </CCol>
          <CCol
            className="mb-4"
            style={{
              backgroundColor: '#18191d',
              padding: '10px',
            }}
          >
            <DemandPlanningOrderingTool demandPlanningTableData={demandPlanningTableData} />
          </CCol>
          <CCol
            className="mb-4"
            style={{
              backgroundColor: '#18191d',
              padding: '10px',
            }}
          >
            <MaterialDemandForecastTable demandPlanningTableData={demandPlanningTableData} />
          </CCol>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default ManagementReports
