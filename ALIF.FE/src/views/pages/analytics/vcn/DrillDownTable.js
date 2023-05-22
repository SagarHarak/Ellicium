import { CButton, CSmartTable, CSpinner } from '@coreui/react-pro'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { indexOf } from '@amcharts/amcharts5/.internal/core/util/Array'

function DrillDownTable(props) {
  const { drillDownTable_state,drillDownTableLoader } = useSelector((state) => state.drillDownTable)
  const addFontSize = (data) => {
    let newdata = []
    for (let index = 0; index < data.length; index++) {
      
      if(props.drill=='Cost Impact')
      {
        const {product_name,['Revenue Impact']:revenue_impact}=data[index]
        newdata.push({ product_name,revenue_impact, _props: { className: 'row-font' } })
      }
      else if(props.drill=='Quantity')
      {
        const {product_name,component_name:item,Quantity,['Selling Price']:SP}=data[index]
        newdata.push({ product_name,item,Quantity,SP, _props: { className: 'row-font' } })
      }
      else if(props.drill=='Time Impact')
      {
        newdata.push({ ...data[index], _props: { className: 'row-font' } })
      }
    }
    return newdata
  }
  return (
    <>
                  {drillDownTableLoader?
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
                :
                <>
                    <CSmartTable
                      style={{ fontSize: '14px !important' }}
                      // loading={true}
                      // className='d-inline-block text-truncate'
                      // className="fs-1"
                      // style={{maxWidth:'50%'}}

                      // columns={quantity_impacted_columns}
                      items={addFontSize(drillDownTable_state)}
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
                    <br />
                    <CButton
                      style={{ backgroundColor: '#1D2328', border: 0, color: 'white' }}
                      className="rounded-0"
                      onClick={() => props.set((state) => !state)}
                    >
                      Back
                    </CButton>
                </>
                }
    </>
  )
            }

export default DrillDownTable
DrillDownTable.propTypes = {
    set: PropTypes.func,
    drill:PropTypes.string
  }
  