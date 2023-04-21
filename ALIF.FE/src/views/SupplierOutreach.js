import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CFormSelect,
  CForm,
  CFormLabel,
  CFormInput,
  CButtonToolbar,
  CButtonGroup,
  CButton,
  CFormTextarea,
  CCardBody
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilBold, cilItalic,
  cilUnderline,
  cilAlignLeft,
  cilAlignRight,
  cilAlignCenter,
  cilJustifyCenter,
  cilIndentDecrease,
  cilIndentIncrease,
  cilList,
  cilListNumbered,
  cilTrash,
  cilPaperclip,
  cilTags
} from '@coreui/icons'
import { MultiSelect } from 'react-multi-select-component'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { CCard } from '@coreui/react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

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
  
  const { quillRef } = useQuill();
  


  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    //dispatch(getProductsAsync())
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

  useEffect(() => {
    loadCharts()
  }, [startdate])

  const loadFilters = async (id) => {
    if (id != undefined) {
      let data = {
        product_id: id,
      }
      //dispatch(getFiltersAsync(data))
    } else {
      //dispatch(getFiltersAsync())
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
    /*dispatch(getProductNetworkAsync(data))
    dispatch(getSupplierNetworkAsync(data))
    dispatch(getOverallExposureAsync(data))
    dispatch(getSupplierConcentrationAsync(data))
    dispatch(getVcnKPIsInfo(data))
    dispatch(
      getVcnKPIsInfoGraph({
        ...data,
        year: startdate,
      }),
    )*/
  }

  const updateProduct = (e) => {
    setSelectedProduct(e.target.value)
    loadFilters(e.target.value)
  }

  const updateSupplier = (e) => {
    setSelectedSupplier(e)
    loadCharts('supplier', e)
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
          <CCol md={2}
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            <CFormSelect
              className="dropdown-font"
              aria-label="Default select example"
              options={[
                'Email Template',
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ]}
              style={{
                height: '100%',
              }}
              disabled={filtersLoader}
            />
          </CCol>
          
          <CCol md={2}
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
          <CCol md={2}
            className="vcnfilterscolumn"
            style={{
              border: '1px solid #323234',
            }}
          >
            <MultiSelect
              overrideStrings={{ "selectSomeItems": 'CC' }}
              options={allCountries}
              disabled={filtersLoader}
              className="multiselectcore"
              selectionType="counter"
              value={selectedCountry}
              onChange={(e) => updateCountry(e)}
            />
          </CCol>
        </CCol>
      </CRow>      
      <CRow className="mt-3">
        <CCol md={12}>
        
          <CCard>
            <CCardBody className="default-Card">
            <CForm>
        <CRow form className="mb-3">
          <CFormLabel className="col-1" htmlFor="to">
            Subject:
          </CFormLabel>
          <CCol sm="11">
            <CFormInput id="to" type="email" placeholder="" style={{ borderRadius: 0 }} />
          </CCol>
        </CRow>
        <CRow form className="mb-3">
          <CFormLabel className="col-1" htmlFor="bcc">
            From:
          </CFormLabel>
          <CCol sm="11">
            <CFormInput id="bcc" type="email" placeholder="" style={{ borderRadius: 0 }} />
          </CCol>
        </CRow>
        <CRow form className="mb-3">
          <CFormLabel className="col-1" htmlFor="to">
            To:
          </CFormLabel>
          <CCol sm="11">
            <CFormInput id="to" type="email" placeholder="" style={{ borderRadius: 0 }} />
          </CCol>
        </CRow>
        <CRow form className="mb-3">
          <CFormLabel className="col-1" htmlFor="cc">
            CC:
          </CFormLabel>
          <CCol sm="11">
            <CFormInput id="cc" type="email" placeholder="" style={{ borderRadius: 0 }} />
          </CCol>
        </CRow>
      </CForm>
      <div className='suppiler-outreach-edit' style={{ width: 'auto', minHeight: 300, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className='suppiler-outreach-edit' style={{ width: 'auto', minHeight: 300, border: '1px solid rgba(255, 255, 255, 0.05)' }} ref={quillRef} />
      </div>
      
      <br/>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton color="success" variant="outline" type="submit" shape="rounded-0">
              Send Later
            </CButton>{' '}
            <CButton color="dark" style={{ background: '#5AAD46' }} shape="rounded-0" type="submit">
              Send
            </CButton>
          </div>
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
