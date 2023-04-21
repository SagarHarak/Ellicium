import React from 'react'

function AddRisk() {
  return (
    <>
    <CRow className='p-4'>
    <CCol>
        <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
            <span style={{fontSize:'14px',color:'#A8A7A7',paddingTop:'9px'}}>

        Step 1
            </span>
            <span style={{fontSize:'16px' ,paddingTop:'11px'}}>
     Select Risk Category         

            </span>
            <span style={{paddingTop:'50px'}}>
            <CMultiSelect 
            className='multiselectcore'
                        
                        options={options} multiple={false} />
            </span>
            <span style={{color:'#4B5A67',fontSize:'16px',paddingTop:'22.14px'}}>
            <CIcon
                            icon={cilInfo}
                            alt="plus"
                            width="18px"
                              style={{
                                marginRight: '10px',
                              }}
                          />Temporal risk pertains to volatility in the LMP at a specific location over time; Risk associated with variation in a node or zone prices over time. Temporal risk arises due to changes in electricity demand and fuel prices at a specific location.
            </span>
            
        </CCard>
     
    </CCol>
    <CCol>
    <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
        
            <span style={{fontSize:'14px',color:'#A8A7A7' ,paddingTop:'9px'}}>
                
     Step 2
                </span>
                <span style={{fontSize:'16px',paddingTop:'11px'}}>
                    
     Select Risk Type         
                    </span>    
                    <span style={{paddingTop:'50px'}}>
            <CMultiSelect 
            className='multiselectcore'
                        
                        options={options} multiple={false} />
            </span>
            <span style={{color:'#4B5A67',fontSize:'16px',paddingTop:'22.14px'}}>
            <CIcon
                            icon={cilInfo}
                            alt="plus"
                            width="18px"
                              style={{
                                marginRight: '10px',
                              }}
                          />Logistics risks are transportation, warehousing, shipping, and inventory management risks, as well as management risks at all levels, including management risks associated with logistics functions and supply chain operations.
            </span>
        </CCard>
    </CCol>
    <CCol>
    <CCard className="p-0 default-Card h-100">
    <span style={{fontSize:'14px',color:'#A8A7A7',paddingTop:'9px'}}>
                
     Step 3
                </span>
                <span style={{fontSize:'16px',paddingTop:'11px'}}>
                    
     Indicator       
                    </span>
                    <span style={{paddingTop:'50px'}}>
            <CMultiSelect 
            className='multiselectcore'
                        
                        options={options} multiple={false} />
            </span>
            <span style={{color:'#4B5A67',fontSize:'16px',paddingTop:'22.14px'}}>
            <CIcon
                            icon={cilInfo}
                            alt="plus"
                            width="18px"
                              style={{
                                marginRight: '10px',
                              }}
                          />The shipping industry is responsible for transporting the majority of goods. Even if the vessels arrive at the port on time, the loading and unloading of containers takes a lot of time, causing delays at ports. It&apos;s a common occurrence and makes the shipping industry lose its valuable time.
            </span>
            </CCard>
    </CCol>
    <CCol>
    <CCard className="p-0 default-Card h-100">
    <span style={{fontSize:'14px',color:'#A8A7A7',paddingTop:'9px'}}>
                
     Step 4
                </span>
                <span style={{fontSize:'16px',paddingTop:'11px'}}>
                    
     Advanced Settings      
                    </span>
                    <span style={{paddingTop:'50px'}}>
             
            <div
              style={{
                backgroundColor: '#5AAD46',
                height: '40px',
                width: '100%',
                color: 'white',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Roboto',
                cursor: 'pointer',

                flex: 1,
              }}
              className="d-flex justify-content-center align-items-center"
            >
              Edit Default Configurations
            </div>
          </span>
            <span style={{color:'#4B5A67',fontSize:'16px',paddingTop:'22.14px'}}>
            <CIcon
                            icon={cilInfo}
                            alt="plus"
                            width="18px"
                              style={{
                                marginRight: '10px',
                              }}
                          />
                          Default values are set based on recommendations by experts. If you would like to configure the risks further you can click the above button to view advance settings.
            </span>
            </CCard>
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

export default AddRisk