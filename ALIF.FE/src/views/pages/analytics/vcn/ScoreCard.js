import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
  CFormSelect,
  CSmartTable,
  CListGroupItem,
  CListGroup,
  CCardHeader,
  CSpinner,
} from '@coreui/react-pro'

import Donut from '../../../components/Donut'
// import Gauge from '../../../components/Gauge';
import Exposure from '../../../components/Exposure'
import { useDispatch, useSelector } from 'react-redux'
import {
  alternativeSuppliersByProduct,
  getDrillDownData,
  getProductBySupplier,
  getSuppilerDetailsandExposures,
} from 'src/redux/async'
import DrillDownTable from './DrillDownTable'
import ExposureBar from './ExposureBar'
import ScoreCardTable from './ScoreCardTable'

const ScoreCard = () => {
  const token = `${localStorage.getItem('accesstoken')}`
  const navigate = useNavigate()
  const { shipperidstate } = useSelector((state) => state.shipperid)
  // const [shipperID, setShipperID] = useState(shipperidstate)s
  const { supplierDetailsAndExposures_state } = useSelector(
    (state) => state.supplierDetailsAndExposures
  )
  const { productBySuppliers_state } = useSelector((state) => state.productBySuppliers)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      alternativeSuppliersByProduct({
        shipper_id: shipperidstate,
      }),
    )
    dispatch(
      getSuppilerDetailsandExposures({
        shipper_id: shipperidstate,
      }),
    )
    dispatch(
      getProductBySupplier({
        shipper_id: shipperidstate,
      }),
    )
  }, [])


  // setDonutData(supplierDetailsAndExposures_state)

  const columns = [
    {
      key: 'product_name',
      _style: { width: '33%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'component_name',
      _style: { width: '33%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'invoice_quantity',
      _style: { width: '33%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
  ]

  
  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  const addFontSize = (data) => {
    let newdata = []
    for (let index = 0; index < data.length; index++) {
      newdata.push({ ...data[index], _props: { className: 'row-font' } })
    }
    return newdata
  }

  return (
    <>
      <CRow>
        <CCard className="p-0 default-Card ">
          <CCardHeader className="cardtitle" style={{ textTransform: 'capitalize' }}>
            {supplierDetailsAndExposures_state[0]?.shipper_company_name
              ?.toLowerCase()
              .replace(/^./, (str) => str.toUpperCase())}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6} style={{ paddingTop: '25px' }}>
                <Donut chartID="donut" radius={50} data={supplierDetailsAndExposures_state} />
              </CCol>
              <CCol md={6}>
                <CSmartTable
                  style={{ fontSize: '14px !important' }}
                  // loading={true}
                  // className='d-inline-block text-truncate'
                  // className="fs-1"
                  // style={{maxWidth:'50%'}}
                  columns={columns}
                  items={addFontSize(productBySuppliers_state)}
                  // itemsPerPageSelect
                  itemsPerPage={3}
                  pagination
                  scopedColumns={{}}
                  tableHeadProps={
                    {
                      // color: 'primary',
                      // fontSize:'14px'
                    }
                  }
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>
      <br />
      <CRow>
        <CCard className="p-0 default-Card">
          <CCardHeader className="cardtitle">Exposure</CCardHeader>
          <CCardBody>
            <CRow>
              <ExposureBar/>
              <ScoreCardTable/>
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>
    </>
  )
}

export default ScoreCard
