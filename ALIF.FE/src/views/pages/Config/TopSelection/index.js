import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import star from '../../../../assets/star.png'
import greenstar from '../../../../assets/greenstar.png'
import searchicon from '../../../../assets/searchicon.svg'
import CustomModal from 'src/components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import WorldMapDrill from 'src/components/charts/WorldMapDrill'
import { getCountryList, getTopSelectionSupplier } from 'src/redux/async'
import ScoreCard from '../../analytics/vcn/ScoreCard'
import { setShipperID } from '../../../../redux/slices/vcn/shipperid.slice'
import DataTable from 'react-data-table-component'
import {
  cilArrowLeft,
  cilArrowRight,
  cilMediaStepBackward,
  cilMediaStepForward,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DownSort, customStyles, uniqueValueArray } from './utils'

const TopSelection = () => {
  const dispatch = useDispatch()
  const [activeKey, setActiveKey] = useState(1)
  const [visible, setVisible] = useState(false)
  const [allsuppliers, setAllsuppliers] = useState([])
  const [allcountry, setAllcountry] = useState([])
  const [filtersuppliers, setFiltersuppliers] = useState([])
  const [supplierselect, setSupplierSelect] = useState('')
  const [countryselect, setCountryselect] = useState('')
  const [countryinfoworldmap, setCountryinfoworldmap] = useState([])
  const [supplierworldmap, setSupplierworldmap] = useState([])

  const token = `${localStorage.getItem("accesstoken")}`;
  const navigate = useNavigate()

  const { topselectionsupplierLoader, topselectionsupplierData } = useSelector(
    (state) => state.topselection,
  )
  const { countrylistData } = useSelector((state) => state.allcountrylist)

  const columns = [
    {
      name: <img src={star} alt="" width="16px" />,
      selector: (row) => {
        // true | false
        if (row.id === 1) {
          return <img src={star} alt="" width="16px" />
        } else {
          return <img src={greenstar} alt="" width="16px" />
        }
      },
      sortable: true,
      width: '50px',
      style: {
        cursor: 'pointer',
      },
    },
    {
      name: 'Supplier Id',
      selector: (row) => row.shipper_id,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Supplier Name',
      selector: (row) => {
        return (
          <button
            onClick={() => {
              setVisible(true)
              dispatch(setShipperID(row.shipper_id))
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a7b5c1',
            }}
          >
            {row.shipper_company_name}
          </button>
        )
      },
      sortable: true,
      width: '200px',
      style: {
        cursor: 'pointer',
      },
    },
    {
      name: 'Tier',
      selector: (row) => row.shipper_tier,
      sortable: true,
      right: true,
    },
    {
      name: 'Net Income',
      selector: (row) => 'N/A',
      sortable: true,
      right: true,
      width: '200px',
    },
    {
      name: 'Credit Health',
      selector: (row) => 'N/A',
      sortable: true,
      right: true,
      width: '200px',
    },
    {
      name: 'Overall Risk',
      selector: (row) => 'N/A',
      sortable: true,
      right: true,
      width: '200px',
    },
    {
      name: 'Quantity Supplied',
      selector: (row) => 'N/A',
      sortable: true,
      right: true,
      width: '200px',
    },
    {
      name: 'Inventory Amount',
      selector: (row) => 'N/A',
      sortable: true,
      right: true,
      width: '200px',
    },
  ]

  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    dispatch(getTopSelectionSupplier())
    dispatch(getCountryList())
  }, [])

  useEffect(() => {
    if (topselectionsupplierData) {
      const uniqeinfovalue = uniqueValueArray(topselectionsupplierData, 'shipper_id')
      const supplier = uniqeinfovalue.map((info) => {
        return {
          value: info.shipper_company_name,
          label: info.shipper_company_name,
        }
      })
      setAllsuppliers([{ value: '', label: 'Select Supplier' },{ value: '', label: 'Clear Selection' }, ...supplier])
    }
  }, [topselectionsupplierData])

  useEffect(() => {
    if (countrylistData) {
      const country = countrylistData.map((info) => {
        return {
          value: info.country,
          label: info.country,
        }
      })
      setAllcountry([{ value: '', label: 'Select Country' }, ...country])
    }
  }, [countrylistData])

  const handleFilter = (search) => {
    if (topselectionsupplierData.length !== 0) {
      const filterData = topselectionsupplierData.filter((item) => {
        return item.shipper_company_name?.toLowerCase().includes(search.target.value.toLowerCase())
      })
      setFiltersuppliers(filterData)
    }
  }

  useEffect(() => {
    if (supplierselect !== '') {
      const filterData = topselectionsupplierData.filter((item) => {
        return item.shipper_company_name?.toLowerCase().includes(supplierselect.toLowerCase())
      })
      setFiltersuppliers(filterData)
    } else {
      setSupplierSelect('')
      setFiltersuppliers([])
    }
  }, [supplierselect])

  useEffect(() => {
    if (topselectionsupplierData) {
      const suppliermap = topselectionsupplierData.map((info) => {
        return {
          latitude: info.lat,
          longitude: info.lng,
          country: info.iso2,
          company_name: info.shipper_company_name,
          shipper_id: info.shipper_id,
          shipper_tier: info.shipper_tier,
          country_name: info.country,
        }
      })
      const information = topselectionsupplierData.map((info) => {
        return {
          id: info.iso2,
          name: info.country,
        }
      })
      const uniqeinfo = uniqueValueArray(information, 'id')
      const finalcountry = []
      for (let value of uniqeinfo) {
        const countfilter = information.filter((info) => {
          if (info.id === value.id) {
            return true
          }
          return false
        }).length
        finalcountry.push({
          id: value.id,
          name: value.name,
          value: countfilter,
        })
        setCountryinfoworldmap(finalcountry)
      }
      setSupplierworldmap(suppliermap)
    }
  }, [topselectionsupplierData])

  const first_page = <CIcon icon={cilMediaStepBackward} />
  const last_page = <CIcon icon={cilMediaStepForward} />
  const next_icon = <CIcon icon={cilArrowRight} />
  const previous = <CIcon icon={cilArrowLeft} />

  return (
    <CRow>
      <CCard className="default-Card h-100 w-100">
        <CCardBody>
          <span className="cardtitle">Top Selection</span>
          <br />
          <span style={{ fontSize: '14px', color: '#4B5A67' }}>
            Select your Data source from the options provided. Based on the selections, the steps
            might change.
          </span>
          <br />
          <br />
      
              <CButton
                width="30%"
                style={{
                  width: '140px',
                  borderRadius: '0px',
                  color:'white',
                  backgroundColor:activeKey==1?'#5AAD46':'#1D2328',
                  border:0,
                }}
                
                // disabled={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Suppliers
              </CButton>
              <CButton
                style={{
                  width: '140px',
                  borderRadius: '0px',
                  color:'white',
                  backgroundColor:activeKey==2?'#5AAD46':'#1D2328',
                  border:0
                }}
                // disabled={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Regions
              </CButton>

          <CRow className="d-flex justify-content-end">
            {activeKey === 1 ? (
              <>
              
              
              <CFormSelect
                className="multiselectcore topselectionmulti"
                options={allsuppliers}
                value={supplierselect}
                style={{
                  padding: '9.5px',
                  backgroundColor: '#232931',
                }}
                onChange={(e) => setSupplierSelect(e.target.value)}
                />
                  <CInputGroup
              className="mb-3 topselectionsearch"
              style={{
                border: '0px',
                borderRadius: '0px',
              }}
            >
              <CInputGroupText>
                <img src={searchicon} alt="" width="20px" className="mx-2" />
              </CInputGroupText>
              <CFormInput
                placeholder="Search"
                aria-label="Sea"
                aria-describedby="basic-addon1"
                className="topselectionsearchinput"
                onChange={handleFilter}
              />
            </CInputGroup>
                </>
            ) : (
              <CFormSelect
                className="multiselectcore topselectionmulti"
                options={allcountry}
                value={countryselect}
                style={{
                  padding: '9.5px',
                  backgroundColor: '#232931',
                }}
                onChange={(e) => setCountryselect(e.target.value)}
              />
            )}

          
          </CRow>

          {activeKey === 1 ? (
            <>
              <DataTable
                className="mt-2"
                responsive
                paginationIconFirstPage={first_page}
                paginationIconLastPage={last_page}
                paginationIconNext={next_icon}
                paginationIconPrevious={previous}
                pagination
                columns={columns}
                data={
                  filtersuppliers.length !== 0
                    ? uniqueValueArray(filtersuppliers, 'shipper_id')
                    : uniqueValueArray(topselectionsupplierData, 'shipper_id')
                }
                customStyles={customStyles}
                sortIcon={<DownSort />}
                progressPending={topselectionsupplierLoader}
                persistTableHead={true}
                fixedHeader={true}
                progressComponent={<h6 className="tableloader">Loading...</h6>}
              />
              <CustomModal size="xl" visible={visible} setVisible={setVisible}>
                <ScoreCard />
              </CustomModal>
            </>
          ) : (
            <WorldMapDrill
              countryinfo={countryinfoworldmap}
              supplierinfo={supplierworldmap}
              selectcountry={countryselect}
            />
          )}
        </CCardBody>
      </CCard>
    </CRow>
  )
}

export default TopSelection
