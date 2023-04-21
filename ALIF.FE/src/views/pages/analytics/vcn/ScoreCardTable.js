import { CButton, CCol, CSmartTable } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alternativeSuppliersByProduct, getDrillDownData } from 'src/redux/async'
import DrillDownTable from './DrillDownTable'

function ScoreCardTable() {
  const [showImpactedTable, setShowImpactedTable] = useState(false)
  const [drilldown, setDrilldown] = useState('')

  const dispatch = useDispatch()
  const { shipperidstate } = useSelector((state) => state.shipperid)
  const { alternativeSuppliersByProduct_state } = useSelector(
    (state) => state.alternateProductBySuppliers,
  )
  useEffect(() => {
    dispatch(
      alternativeSuppliersByProduct({
        shipper_id: shipperidstate,
      }),
    )
  }, [])
  const tableShow = (id, risk_type, drill_down) => {
    dispatch(
      getDrillDownData({
        shipper_id: Number(shipperidstate),
        risk_type: risk_type,
        drill_down: drill_down,
      }),
    )
    setDrilldown(drill_down)
    setShowImpactedTable((state) => !state)
  }

  const columns1 = [
    {
      key: 'Risk_Type',
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'Score',
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'Cost_Impact',
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'Quantity_Impact',
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'AVG_Time_Impact',
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
    {
      key: 'action',
      //_props: { color: 'primary', className: 'fw-semibold' },
    },
  ]
  const addFontSize = (data) => {
    let newdata = []
    for (let index = 0; index < data.length; index++) {
      newdata.push({ ...data[index], _props: { className: 'row-font' } })
    }
    return newdata
  }

  return (
    <>
      <CCol>
        {!showImpactedTable ? (
          <CSmartTable
            style={{ fontSize: '14px !important' }}
            columns={columns1}
            items={addFontSize(alternativeSuppliersByProduct_state)}
            // itemsPerPageSelect
            itemsPerPage={3}
            pagination
            scopedColumns={{
              action: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      style={{
                        background: '#5AAD46',
                        border: 0,
                        borderRadius: 0,
                        fontSize: '14px',
                      }}
                      className="text-white"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        //toggleDetails(item._id)
                      }}
                    >
                      Alernate Suppliers
                    </CButton>
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
              Quantity_Impact: (item) => {
                return (
                  <td
                    style={{ cursor: 'pointer', textDecoration: 'underline',textUnderlinePosition: 'under', }}
                    onClick={() => tableShow(shipperidstate, item.Risk_Type, 'Quantity')}
                  >
                    {item.Quantity_Impact}
                  </td>
                )
              },
              Cost_Impact: (item) => {
                return (
                  <td
                    style={{ cursor: 'pointer', textDecoration: 'underline',textUnderlinePosition: 'under', }}
                    onClick={() => tableShow(shipperidstate, item.Risk_Type, 'Cost Impact')}
                  >
                    {item.Cost_Impact}
                  </td>
                )
              },
              Score: (item) => {
                return (
                  <td>
                    {item.Score <= 30 && <span style={{ color: '#85CAA1' }}>{item.Score}</span>}
                    {item.Score <= 70 && item.Score > 30 && (
                      <span style={{ color: '#E7BA46' }}>{item.Score}</span>
                    )}
                    {item.Score <= 100 && item.Score > 70 && (
                      <span style={{ color: '#D44646' }}>{item.Score}</span>
                    )}
                  </td>
                )
              },
              AVG_Time_Impact: (item) => {
                return (
                  <td
                    style={{}}
                    onClick={() =>
                      item.AVG_Time_Impact != 'No Delay' &&
                      tableShow(shipperidstate, item.Risk_Type, 'Time Impact')
                    }
                  >
                    {item.AVG_Time_Impact === 'No Delay' ? (
                      item.AVG_Time_Impact
                    ) : (
                      <span
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          textUnderlinePosition: 'under',
                        }}
                      >
                        {item.AVG_Time_Impact}
                      </span>
                    )}
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
        ) : (
          <DrillDownTable set={setShowImpactedTable} drill={drilldown} />
        )}
      </CCol>
    </>
  )
}

export default ScoreCardTable
