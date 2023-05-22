import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CMultiSelect,
  CRow,
  CSmartTable,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect, useRef, useState } from 'react'
import plusicon from '../../../../assets/plusicon.png'
import { cilInfo, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ModalDropDown from './ModalDropDown'
import StepCard from './StepCard'
import { useDispatch, useSelector } from 'react-redux'
import { getRiskSelectionData, getupdateRiskData } from 'src/redux/async'
import { useNavigate } from 'react-router-dom'
import EditRiskModal from './EditRiskModal'

function RiskSelection() {
  const [deleteId, setID] = useState()
  const { riskSelectionLoader, riskSelectionError, riskSelection_state } = useSelector(
    (state) => state.riskselection,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRiskSelectionData())
  }, [])
  const [riskCategory, setRiskCategory] = useState([])
  const [selectedRiskCategory, setSelectedRiskCategory] = useState()
  const [riskType, setRiskType] = useState([])
  const [selectedRiskType, setSelectedRiskType] = useState()
  const [indicator, setIndicator] = useState([])
  const [selectedIndicator, setSelectedIndicator] = useState()
  const [advanceSettings, setAdvanceSettings] = useState([])
  const [idandValue, setIdandValue] = useState(new Map())
  // const [selectedIndicator, setSelectedIndicator] = useState()
  const { updateRiskLoader, updateRiskError, updateRisk_state } = useSelector(
    (state) => state.updaterisk,
  )
  const navigate = useNavigate()
  const [deleteModal, setDeleteModal] = useState(false)
  const [visibleRiskModal, setVisibleRiskModal] = useState(false)
  const [visibleEditModal, setVisibleEditModal] = useState(false)
  const [showTable, setShowTable] = useState(true)
  const [tableData, setTableData] = useState([])
  const [height, setHeight] = useState()
  const ref = useRef(null)
  const token = `${localStorage.getItem("accesstoken")}`;

  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    let newdata = []
    riskSelection_state.forEach((element) => {
      let key = newdata.findIndex((data) => data.label === element['risk_category'])
      if (key === -1) {
        newdata.push({ label: element['risk_category'] })
      } else {
      }
    })
    setRiskCategory(['Risk Category', ...newdata])
  }, [riskSelection_state])
  const updateRiskCategory = (e) => {
    setSelectedRiskCategory(e.target.value)

    let newdata = []
    riskSelection_state.forEach((element) => {
      if (e.target.value === element['risk_category']) {
        let key = newdata.findIndex((data) => data.label === element['risk_type'])
        if (key === -1) {
          newdata.push({ label: element['risk_type'] })
        } else {
        }
      }
    })
    setRiskType(['Risk Type', ...newdata])
    newdata = []
    riskSelection_state.forEach((element) => {
      if (riskType[1]?.label === element['risk_type']) {
        let key = newdata.findIndex((data) => data?.label === element['indicator'])
        if (key === -1) {
          newdata.push({ label: element['indicator'] })
        } else {
        }
      }
    })
    setIndicator(['Indicator', ...newdata])
    setSelectedIndicator('')
  }

  const updateRiskType = (e) => {
    setSelectedRiskType(e.target.value)
    let newdata = []
    riskSelection_state.forEach((element) => {
      if (e.target.value === element['risk_type']) {
        let key = newdata.findIndex((data) => data.label === element['indicator'])
        if (key === -1) {
          newdata.push({ label: element['indicator'] })
        } else {
        }
      }
    })
    setIndicator(['Indicator', ...newdata])
    setSelectedIndicator('')
  }

  const updateindicator = (e) => {
    setSelectedIndicator(e.target.value)
    let newdata = []
    riskSelection_state.forEach((element) => {
      if (e.target.value === element['indicator']) {
        newdata.push({
          risk_category: element.risk_category,
          risk_type: element.risk_type,
          name: element.name,
          type: element.type,
          options: element.options,
          value: element.value,
          id: element.id,
        })
      }
    })
    setAdvanceSettings(['Advance Settings', ...newdata])
  }

  const columns = [
    {
      key: 'risk_category',
      _style: { width: '24%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'risk_type',
      _style: { width: '24%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'indicator',
      _style: { width: '24%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'advanced_settings',
      // _style: { width: '24%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'delete_risk',
      // _style: { width: '5%' },
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
  ]

  const done = () => {
    setShowTable((state) => !state)
    setSelectedRiskCategory()
    setSelectedRiskType()
    setSelectedIndicator()
    idandValue.forEach((value, id) => {
      dispatch(
          getupdateRiskData({
            id:id,
            value:value,
          }),
        ).then(() => dispatch(getRiskSelectionData()))
    });

    setIdandValue(new Map())
  }
  const reset = () => {
    setShowTable((state) => !state)
    setSelectedRiskCategory()
    setSelectedRiskType()
    setSelectedIndicator()
    setIdandValue(new Map())
  }
  const delete_risk = (item) => {
    setDeleteModal((state) => !state)
    setID(item.settings)
  }
  const confirmdelete = (settings) => {
    settings.forEach(element => {
      dispatch(getupdateRiskData({ id: element.id, value: null })).then(() => dispatch(getRiskSelectionData()))
    });
    setDeleteModal((state) => !state)
  }
  const checkValue = (data) => {
    let newdata = []
    data.forEach((element) => {
      if (element.value !=null) {
        let key = newdata.findIndex((data) => {
          return (
            data.risk_category === element.risk_category &&
            data.risk_type === element.risk_type &&
            data.indicator === element.indicator
          )
        })
        if (key === -1) {
          newdata.push({
            ...element,
            settings: [
              {
                risk_category:element.risk_category,
                risk_type:element.risk_type,
                name: element.name,
                value: element.value,
                options: element.options,
                id: element.id,
                type: element.type
              }
            ],
          })

        }
        else{
          newdata[key]={...newdata[key],settings:newdata[key].settings.concat({
            risk_category:element.risk_category,
            risk_type:element.risk_type,
            name: element.name,
            value: element.value,
            options: element.options,
            id: element.id,
            type: element.type

          })}
        }
      }
    })
    setTableData(newdata)
  }
  useEffect(() => {
    checkValue(riskSelection_state)
    // setHeight(ref.current.clientHeight)
  }, [riskSelection_state])
  const editTable = (item) => {
    setVisibleEditModal((state) => !state)
    setAdvanceSettings([...item.settings])
  }
  return (
    <>
      <CModal
        visible={visibleRiskModal}
        onClose={() => setVisibleRiskModal(false)}
        style={{ borderRadius: '0 !important' }}
      >
        <CCard className="p-0 default-Card h-100 border-bottom border-5 border-bottom-success">
          <ModalDropDown data={advanceSettings} currentValue={idandValue} set={setIdandValue} close={setVisibleRiskModal} />
        </CCard>
      </CModal>
      <CModal
        visible={visibleEditModal}
        onClose={() => setVisibleEditModal(false)}
        style={{ borderRadius: '0 !important' }}
      >
        <CCard className="p-0 default-Card h-100 border-bottom border-5 border-bottom-success">
          <EditRiskModal data={advanceSettings} set={setIdandValue} close={setVisibleEditModal} />
        </CCard>
      </CModal>
      <CModal
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        style={{ borderRadius: '0 !important' }}
      >
        <CCard className="p-0 default-Card h-100 border-bottom border-5 border-bottom-success">
          <div className="p-5">
            Are you sure you want to want to continue this action is irreversible!!
          </div>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              padding: '20px',
              paddingRight: '10px',
              paddingTop: '25px',
            }}
          >
            <span>
              <div
                style={{
                  backgroundColor: '#21252B',
                  height: '40px',
                  width: '152px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  cursor: 'pointer',

                  flex: 1,
                }}
                className="d-flex justify-content-center align-items-center"
                onClick={() => setDeleteModal((state) => !state)}
              >
                Cancel
              </div>
            </span>
            <span>
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

                  flex: 1,
                }}
                className="d-flex justify-content-center align-items-center"
                onClick={() => confirmdelete(deleteId)}
              >
                Delete
              </div>
            </span>
          </span>
        </CCard>
      </CModal>
      <CRow>
        <CCard className=" default-Card h-100 ">
          <CCardBody>
            <span>
              <span className="cardtitle">Risk Configuration</span>
              <br />
              <span style={{ fontSize: '14px', color: '#4B5A67' }}>
                Add, remove or tweak the type of risks associated for your business and analysis.
                All risks configured below reflect throughout the application for a particular user
                only.
              </span>
            </span>

            {showTable ? (
              <>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '20px',
                    paddingRight: '10px',
                  }}
                >
                  <span></span>
                  <span>
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

                        flex: 1,
                      }}
                      onClick={() => setShowTable((state) => !state)}
                      className="d-flex justify-content-center align-items-center"
                    >
                      Add Risks
                      <img
                        src={plusicon}
                        alt="plus"
                        width="15px"
                        style={{
                          marginLeft: '30px',
                        }}
                      />
                    </div>
                  </span>
                </span>

                <CRow>
                  <>
                    {riskSelectionLoader || updateRiskLoader ? (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '300px',
                        }}
                      >
                        <CSpinner color="success" />
                      </div>
                    ) : (
                      <CSmartTable
                        ref={ref}
                        style={{ fontSize: '14px !important', height: '100%' }}
                        columns={columns}
                        items={tableData}
                        loading={riskSelectionLoader}
                        //   itemsPerPageSelect
                        //    itemsPerPage={5}
                        pagination
                        scopedColumns={{
                          advanced_settings: (item) => {
                            return (
                              <td className="py-3">
                                <span>
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

                                      flex: 1,
                                    }}
                                    onClick={() => editTable(item)}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    Edit Risks
                                    <CIcon
                                      icon={cilPencil}
                                      alt="plus"
                                      width={18}
                                      style={{
                                        marginLeft: '30px',
                                      }}
                                    />
                                  </div>
                                </span>
                                {/* <br />
                          <br />
                          <CButton
                            style={{ background: '#5AAD46', border: 0, borderRadius: 0 }}
                            className="text-white"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              //toggleDetails(item._id)
                            }}
                          >
                            Competitors
                          </CButton> */}
                              </td>
                            )
                          },
                          delete_risk: (item) => {
                            return (
                              <td className="py-3">
                                <span>
                                  <div
                                    style={{
                                      backgroundColor: '#5AAD46',
                                      height: '40px',
                                      width: '50px',
                                      color: 'white',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      fontFamily: 'Roboto',
                                      cursor: 'pointer',
                                      // marginLeft:'20px',
                                      flex: 1,
                                    }}
                                    onClick={() => delete_risk(item)}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <CIcon
                                      icon={cilTrash}
                                      alt="plus"
                                      width={18}
                                    //   style={{
                                    //     marginLeft: '30px',
                                    //   }}
                                    />
                                  </div>
                                </span>
                                {/* <br />
                            <br />
                            <CButton
                              style={{ background: '#5AAD46', border: 0, borderRadius: 0 }}
                              className="text-white"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                //toggleDetails(item._id)
                              }}
                            >
                              Competitors
                            </CButton> */}
                              </td>
                            )
                          },
                        }}
                        tableHeadProps={
                          {
                            // /color: 'primary',
                            // style:{ background: '#5AAD46' }
                          }
                        }
                      />
                    )}
                  </>
                </CRow>
                {/* <span
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '20px',
                    paddingRight: '10px',
                    paddingTop: '100px',
                  }}
                >
                  <span></span>
                  <span>
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

                        flex: 1,
                      }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      Save
                    </div>
                  </span>
                </span> */}
              </>
            ) : (
              <div style={{ paddingTop: '50px' }}>
                <CRow className="">
                  <CCol>
                    <StepCard
                      disable={false}
                      show="Show"
                      step="Step 1"
                      text="Select Risk Category"
                      currentValue={selectedRiskCategory}
                      update={updateRiskCategory}
                      data={riskCategory}
                    />
                  </CCol>
                  <CCol>
                    <StepCard
                      disable={false}
                      show={selectedRiskCategory}
                      step="Step 2"
                      text="Select Risk Type"
                      currentValue={selectedRiskType}
                      update={updateRiskType}
                      data={riskType}
                    />
                  </CCol>
                  <CCol>
                    <StepCard
                      disable={false}
                      show={selectedRiskType}
                      step="Step 3"
                      text="Indicator"
                      currentValue={selectedIndicator}
                      update={updateindicator}
                      data={indicator}
                    />
                  </CCol>
                  <CCol>
                    <StepCard
                      set={setVisibleRiskModal}
                      last={true}
                      show={selectedIndicator}
                      step="Step 4"
                      text="Advanced Settings"
                      currentValue={selectedIndicator}
                      update={updateindicator}
                      data={indicator}
                    />
                  </CCol>
                </CRow>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    paddingRight: '10px',
                    paddingTop: '100px',
                  }}
                >
                  <span>
                    <div
                      style={{
                        backgroundColor: '#21252B',
                        height: '40px',
                        width: '152px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Roboto',
                        cursor: 'pointer',

                        flex: 1,
                      }}
                      onClick={reset}
                      className="d-flex justify-content-center align-items-center"
                    >
                      Cancel
                    </div>
                  </span>
                  {idandValue && (
                    <span>
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

                          flex: 1,
                        }}
                        className="d-flex justify-content-center align-items-center"
                        onClick={done}
                      >
                        {selectedIndicator ? 'Complete' : 'Save'}
                      </div>
                    </span>
                  )}
                </span>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CRow>
    </>
  )
}

export default RiskSelection
