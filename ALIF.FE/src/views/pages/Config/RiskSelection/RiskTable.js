import React from 'react'

function RiskTable() {
  return (
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
                  onClick={() => setVisible(!visible)}
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
              <CCol>
                <CSmartTable
                  style={{ fontSize: '14px !important' }}
                  columns={columns}
                  items={usersData1}
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
                            onClick={()=>setVisibleRiskModal(state=>!state)}

                              className="d-flex justify-content-center align-items-center"
                            >
                              Edit Risks
                              <CIcon
                                icon={cilPencil}
                                alt="plus"
                                width="18px"
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

                                flex: 1,
                              }}
                              className="d-flex justify-content-center align-items-center"
                            >
                              <CIcon
                                icon={cilTrash}
                                alt="plus"
                                width="18px"
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
                    risk_category: (item) => {
                      return (
                        <td className='py-3'>
                          <CMultiSelect
                className='multiselectcore'
                          
                          options={item.risk_category} multiple={false} />
                          
                        </td>
                      )
                    },
                    risk_type: (item) => {
                        return (
                          <td className='py-3'>
                            <CMultiSelect 
                className='multiselectcore'
                            
                            options={item.risk_type} multiple={false} />
                            
                          </td>
                        )
                      },
                      indicator: (item) => {
                        return (
                          <td className='py-3'>
                            <CMultiSelect 
                className='multiselectcore'
                            
                            options={item.indicator} multiple={false} />
                            
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
              </CCol>
            </CRow>
            <span
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '20px',
                paddingRight: '10px',
                paddingTop:'100px'
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
            </span>

    
    </>
  )
}

export default RiskTable



const [indicator, setIndicator] = useState([])
const [selectedIndicator, setSelectedIndicator] = useState()
useEffect(() => {
  data.forEach(element => {
  if(element["Risk Category"]){
    // setindicator()
    setIndicator(state=>[...state,{label:element["Risk Category"]}])
  }
 }); 
}, []);
const updateindicator = (e) => {setSelectedIndicator(e.target.value)}
