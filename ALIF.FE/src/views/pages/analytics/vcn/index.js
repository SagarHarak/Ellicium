import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CFormSelect,
  CCardHeader,
  CMultiSelect,
  CDateRangePicker,
  CImage,
  CTooltip,
  CLink,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import Help from "./Help.png"
import { cilInfo, cilOptions } from '@coreui/icons'
import { MultiSelect } from 'react-multi-select-component'
import ProductNetwork from '../../../components/ProductNetwork'
import SupplierNetwork from '../../../components/SupplierNetwork'
import OverallExposure from '../../../components/OverallExposure'
import OverallExposure1 from '../../../components/OverallExposure1'
import Kpis from 'src/views/components/KPIs'
import {
  getFiltersAsync,
  getProductsAsync,
  getProductNetworkAsync,
  getSupplierNetworkAsync,
  getOverallExposureAsync,
  getSupplierConcentrationAsync,
  getVcnKPIsInfo,
  getVcnKPIsInfoGraph,
} from '../../../../redux/async/vcn/vcn.async'
import helpicon from '../../../../assets/Help.png'

import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import pinicon from '../../../../assets/pinicon.png'
import threedot from '../../../../assets/threedot.png'
import ToolTip from './ToolTip'


const VCN = () => {
  const token = `${localStorage.getItem("accesstoken")}`;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { filtersLoader, filtersData, filtersError } = useSelector((state) => state.vcnfilter)
  const { productsLoader, productsData, productsError } = useSelector((state) => state.products)

  const [allProducts, setAllProducts] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [allSuppliers, setAllSuppliers] = useState([{ value: 1, text: 'hi' }])
  const [allRiskLevels, setAllRiskLevels] = useState([])
  const [allRiskTypes, setAllRiskTypes] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedRiskLevel, setSelectedRiskLevel] = useState([])
  const [selectedRiskType, setSelectedRiskType] = useState([])
  const [startdate, setStartdate] = useState('2018')
  const [enddate, setEnddate] = useState('')

  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    dispatch(getProductsAsync())
  }, [])

  useEffect(() => {
    let product = []
    let products = []
    for (let i = 0; i < productsData.length; i++) {
      if (!product.includes(productsData[i].product_id)) {
        products.push({
          value: productsData[i].product_id,
          label: productsData[i].product_name,
        })
        product.push(productsData[i].product_id)
      }
    }
    setAllProducts(products)
    loadFilters()
  }, [productsData])

  useEffect(() => {
    if (filtersData.length > 0) {
      let country = []
      let countries = []
      let supplier = []
      let suppliers = []
      let riskLevel = []
      let riskLevels = []
      let riskType = []
      let riskTypes = []
      setSelectedProduct(filtersData[0].product_id)
      for (let i = 0; i < filtersData.length; i++) {
        if (!country.includes(filtersData[i].country)) {
          countries.push({
            value: filtersData[i].country,
            label: filtersData[i].country,
          })
          country.push(filtersData[i].country)
        }
        if (!supplier.includes(filtersData[i].shipper_id)) {
          suppliers.push({
            value: filtersData[i].shipper_id,
            label: filtersData[i].shipper_company_name,
          })
          supplier.push(filtersData[i].shipper_id)
        }
        if (!riskLevel.includes(filtersData[i].risk_level)) {
          riskLevels.push({
            value: filtersData[i].risk_level,
            label: filtersData[i].risk_level,
          })
          riskLevel.push(filtersData[i].risk_level)
        }
        if (!riskType.includes(filtersData[i].risk_type)) {
          riskTypes.push({
            value: filtersData[i].risk_type,
            label: filtersData[i].risk_type,
          })
          riskType.push(filtersData[i].risk_type)
        }
      }
      setAllCountries(countries)
      setAllSuppliers(suppliers)
      setAllRiskLevels(riskLevels)
      setAllRiskTypes(riskTypes)

      loadCharts()
    }
  }, [filtersData])

  // useEffect(() => {
  //   loadCharts()
  // }, [startdate])

  const loadFilters = async (id) => {
    if (id != undefined) {
      let data = {
        product_id: id,
      }
      dispatch(getFiltersAsync(data))
    } else {
      dispatch(getFiltersAsync())
    }
  }

  const loadCharts = async (name, e) => {
    let data = {};
    if (name == undefined) {
      // setSelectedCountry([{
      //   value: "United States",
      //   label: "United States"
      // }])
      setSelectedRiskLevel([{
        value: "High",
        label: "High"
      }])
      data = {
        product_id: selectedProduct,
        // country: "'United States'",
        risk_level: "'High'"
      }
    } else {
      let sdata = []
      if (name == 'supplier') {
        sdata = e
      } else {
        sdata = selectedSupplier
      }
      let supplierData = []
      for (let i = 0; i < sdata.length; i++) {
        supplierData.push(sdata[i].value)
      }
      let cdata = []
      if (name == 'country') {
        cdata = e
      } else {
        cdata = selectedCountry
      }
      let countryData = []
      for (let i = 0; i < cdata.length; i++) {
        countryData.push(cdata[i].value)
      }
      let ldata = []
      if (name == 'risklevel') {
        ldata = e
      } else {
        ldata = selectedRiskLevel
      }
      let riskLevelData = []
      for (let i = 0; i < ldata.length; i++) {
        riskLevelData.push(ldata[i].value)
      }
      let tdata = []
      if (name == 'risktype') {
        tdata = e
      } else {
        tdata = selectedRiskType
      }
      let riskTypeData = []
      for (let i = 0; i < tdata.length; i++) {
        riskTypeData.push(tdata[i].value)
      }
      let countries = ''
      for (let i = 0; i < countryData.length; i++) {
        if (i == 0) {
          countries = "'" + countryData[i] + "'"
        } else {
          countries = countries + ",'" + countryData[i] + "'"
        }
      }
      let risklevels = ''
      for (let i = 0; i < riskLevelData.length; i++) {
        if (i == 0) {
          risklevels = "'" + riskLevelData[i] + "'"
        } else {
          risklevels = risklevels + ",'" + riskLevelData[i] + "'"
        }
      }
      let risktypes = ''
      for (let i = 0; i < riskTypeData.length; i++) {
        if (i == 0) {
          risktypes = "'" + riskTypeData[i] + "'"
        } else {
          risktypes = risktypes + ",'" + riskTypeData[i] + "'"
        }
      }
      data = {
        product_id: selectedProduct,
        shipper_id: supplierData,
        country: countries,
        risk_level: risklevels,
        risk_type: risktypes,
      }
    }
    dispatch(getProductNetworkAsync(data))
    dispatch(getSupplierNetworkAsync(data))
    dispatch(getOverallExposureAsync(data))
    dispatch(getSupplierConcentrationAsync(data))
    dispatch(getVcnKPIsInfo(data))
    dispatch(
      getVcnKPIsInfoGraph({
        ...data,
        // year: startdate,
      }),
    )
  }

  const updateProduct = (e) => {
    setSelectedProduct(e.target.value)
    loadFilters(e.target.value)
    // loadCharts('supplier', selectedSupplier)
    setSelectedCountry([])
    setSelectedSupplier([])
    setSelectedRiskType([])
    loadCharts('risklevel', selectedRiskLevel)
    // loadCharts('risktype', selectedRiskType)
  }

  const updateSupplier = (e) => {
    setSelectedSupplier(e)
    loadCharts('supplier', e)
    // loadCharts('pro')
    // loadFilters(selectedProduct)
    // loadCharts('country', selectedCountry)
    // loadCharts('risklevel', selectedRiskLevel)
    // loadCharts('risktype', selectedRiskType)

  }

  const updateCountry = (e) => {
    setSelectedCountry(e)
    loadCharts('country', e)
  }

  const updateRiskLevel = (e) => {
    setSelectedRiskLevel(e)
    loadCharts('risklevel', e)
  }

  const updateRiskType = (e) => {
    setSelectedRiskType(e)
    loadCharts('risktype', e)
  }

 
  return (
    <>
      <CRow>
        <CCol className="vcnfilters">
          <CCol
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            <CFormSelect
              
              className="dropdown-font "
              aria-label="Default select example"
              options={[
                'Product Category',
                { label: 'ZUTL', value: '1'},
                { label: 'ZTRG', value: '2' },
                { label: 'ZFIN', value: '3' },
                { label: 'ZROH', value: '4' },
              ]}
              style={{
                height: '100%',
              
              }}
              disabled={filtersLoader}
            />
          </CCol>
          <CCol
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            <CFormSelect
              className="dropdown-font country-dropdown"
              options={allProducts}
              value={selectedProduct}
              onChange={(e) => updateProduct(e)}
              style={{
                height: '100%',
              }}
              disabled={filtersLoader}
            />
          </CCol>
          <CCol
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            {allSuppliers && (
              <MultiSelect
                overrideStrings={{ "selectSomeItems": 'Suppliers' }}
                options={allSuppliers}
                disabled={filtersLoader}
                className="multiselectcore"
                selectionType="counter"
                multiple={true}
                value={selectedSupplier}
                onChange={(e) => updateSupplier(e)}
              />
            )}
          </CCol>
          <CCol
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            <MultiSelect
              overrideStrings={{ "selectSomeItems": 'Regions' }}
              options={allCountries}
              disabled={filtersLoader}
              className="multiselectcore"
              selectionType="counter"
              value={selectedCountry}
              onChange={(e) => updateCountry(e)}
            />
          </CCol>
          {/* <CCol className="vcnfilterscolumn">
            <CDateRangePicker
              locale="en-US"
              //size="sm"
              className="multiselectcore"
              // disabled={filtersLoader}
              onEndDateChange={(e) => {
                if (e !== null) {
                  setEnddate(e.toString().split(' ')[3])
                }
              }}
              onStartDateChange={(e) => {
                if (e !== null) {
                  setStartdate(e.toString().split(' ')[3])
                }
              }}
            />
          </CCol> */ }
          <CCol
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            <MultiSelect
              overrideStrings={{ "selectSomeItems": 'Risk Levels' }}
              options={allRiskLevels}
              disabled={filtersLoader}
              className="multiselectcore"
              selectionType="counter"
              value={selectedRiskLevel}
              onChange={(e) => updateRiskLevel(e)}
            />
          </CCol>
          <CCol
            className="vcnfilterscolumn m-0"
            style={{
              border: '1px solid #323234',
            }}
          >
            <MultiSelect
              overrideStrings={{ "selectSomeItems": 'Risk Types' }}
              options={allRiskTypes}
              disabled={filtersLoader}
              className="multiselectcore"
              selectionType="counter"
              value={selectedRiskType}
              onChange={(e) => updateRiskType(e)}
            />
          </CCol>
        </CCol>
      </CRow>
      
        <Kpis />
    
      <CRow className="mt-3">
        <CCol md={6}>
          <CCard>
            <CCardHeader
              style={{
                padding: '13px',
              }}
            >
              <CCol className="d-flex justify-content-between">
                <div className="cardtitle">Product Network
                &nbsp;
                <ToolTip text="Single click to drill down and double click on supplier to view it's scorecard"/>
                
                </div>
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
              <div id="chartdiv"></div>
              <ProductNetwork />
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
                <div className="cardtitle">Supplier Network
                &nbsp;
                <ToolTip text="Single click to drill down and double click on supplier to view it's scorecard"/>

                </div>
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
              <SupplierNetwork />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <br />
      <CRow>
        <CCol md={6}>
          <CCard>
            <CCardHeader
              style={{
                padding: '13px',
              }}
            >
              <CCol className="d-flex justify-content-between">
                <div className="cardtitle">Overall Exposure for Top Suppliers
                &nbsp;
                <ToolTip text="Double click  view it's scorecard"/>

                
                </div>
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
            <CCardBody className="default-Card p-0" style={{height:'340px'}}>
              <OverallExposure />
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
                <div className="cardtitle"  >Supplier Concentration by Region 
                 {/* <img src={helpicon}/> */}
                 &nbsp;
                 <ToolTip text="Single click to drill down and double click on supplier to view it's scorecard"/>

                 
              {/* {showToolTip&& <div style={{zIndex:1000000,position:'fixed',top:tooltipPosition.yposition,left:tooltipPosition.xpostion,backgroundColor:'darkgray'}}>
                Lorem ipsum dolor sit amet
                 </div>}    */}
                 </div> 
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
            <CCardBody className="default-Card p-0" style={{height:'340px'}}>
              <OverallExposure1 
                data={{
                  product_id: selectedProduct,
                  risk_level: selectedRiskLevel,
                  risk_type: selectedRiskType
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default VCN

const DropDownCustom = ({ children, unique }) => {
  return (
    <CDropdown alignment="end" className="default-Card">
      <CDropdownToggle color="#282933" className="default-Card">
        {children}
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem className="text-body drop-item cursor-pointer">Edit</CDropdownItem>
        <CDropdownItem className="text-body drop-item cursor-pointer">Change KPIs</CDropdownItem>
        <CDropdownItem className="text-body drop-item cursor-pointer">Share</CDropdownItem>
        <CDropdownItem className="text-body drop-item cursor-pointer">Move</CDropdownItem>
        <CDropdownItem
          className="text-body drop-item cursor-pointer"
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
