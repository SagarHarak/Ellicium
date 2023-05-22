import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CCol, CContainer, CRow, CCard, CCardHeader, CCardBody, CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu,
  CFormSelect
} from '@coreui/react-pro'
import MapPolygonPointLine from 'src/components/charts/MapPolygonPointLine/MapPolygonPointLine'
import { MapPolygonPointLineStyle } from 'src/components/charts/MapPolygonPointLine/MapPolygonPointLineStyle'
import pinicon from '../assets/pinicon.png'
import threedot from '../assets/threedot.png'
import PropTypes from 'prop-types'
import InternalRoutingKpi from './components/InternalRoutingKpi'
import ExternalRoutingKpi from './components/ExternalRoutingKpi'
import { 
  getInternalRoutingKpiAsync, 
  getExternalRoutingKpiAsync, 
  getInternalRoutingMapAsync, 
  getExternalRoutingMapAsync 
} from '../redux/async/digitaltwin.async'
import { 
  getProductsAsync
} from '../redux/async/vcn/vcn.async'
import { useDispatch, useSelector } from 'react-redux'

  const DigitalTwin = () => {
    const dispatch = useDispatch();
    const { productsLoader, productsData, productsError } = useSelector((state) => state.products)
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const { internalRoutingMapLoader, internalRoutingMapData } = useSelector((state) => state.internalRoutingMap)
    const { externalRoutingMapLoader, externalRoutingMapData } = useSelector((state) => state.externalRoutingMap)
    const token = `${localStorage.getItem("accesstoken")}`;
    const navigate = useNavigate()
  
    useEffect(() => {
      if (token == 'null') {
        navigate('/')
      }
    }, [])

    useEffect(() => {
      dispatch(getProductsAsync())
    }, [])

    useEffect(() => {
      if(productsData.length > 0){
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
        setSelectedProduct(productsData[0].product_id);
        loadCharts(productsData[0].product_id);
      }
    }, [productsData])
    
    const loadCharts = (product_id) => {
      dispatch(getInternalRoutingKpiAsync({
        product_id: product_id
      }));
      dispatch(getExternalRoutingKpiAsync({
        product_id: product_id
      }));
      dispatch(getInternalRoutingMapAsync({
        product_id: product_id
      }));
      dispatch(getExternalRoutingMapAsync({
        product_id: product_id
      }));
    }

    const updateProduct = (e) => {
      setSelectedProduct(e.target.value)
      
      loadCharts(e.target.value)
    }
  
    return (
      <>
        
          <CRow>
            <CCol className="vcnfilters justify-content-md-end">
              <CCol md={2}
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
                  disabled={productsLoader}
                />
              </CCol>
            </CCol>
          </CRow>
          <CContainer fluid>
          <CRow>
            <CCol lg={6} className="p-1 m-0">
            <CCard>
              <CCardHeader
                style={{
                  padding: '13px',
                }}
              >
                <CCol className="d-flex justify-content-between">
                  <div className="cardtitle">Internal Supply Chain</div>
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
                  <InternalRoutingKpi />
                  <br/><br/>
                <div id="chartdiv">
                  <MapPolygonPointLine
                    chartID="globediv1"
                    style={MapPolygonPointLineStyle}
                    data={ internalRoutingMapData }
                  />
                </div>
              </CCardBody>
            </CCard>
            </CCol>
            <CCol lg={6} className="p-1 m-0">
            <CCard>
              <CCardHeader
                style={{
                  padding: '13px',
                }}
              >
                <CCol className="d-flex justify-content-between">
                  <div className="cardtitle">External Supply Chain</div>
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
                  <ExternalRoutingKpi />
                  <br/><br/>
                <div id="chartdiv">
                  <MapPolygonPointLine
                    chartID="globediv2"
                    style={MapPolygonPointLineStyle}
                    data={ externalRoutingMapData }
                  />
                </div>
              </CCardBody>
            </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </>
    )
  }
  
  export default DigitalTwin
  
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
  