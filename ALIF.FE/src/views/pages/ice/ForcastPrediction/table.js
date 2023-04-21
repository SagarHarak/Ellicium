import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

function Table({ className, data }) {
  console.log(data)
  return (
    <>
      <CTable className={className}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Current Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Current Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Horizon</CTableHeaderCell>
            <CTableHeaderCell scope="col">Predicted</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price ($/t)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Vs Current ($/t)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Direction</CTableHeaderCell>
            <CTableHeaderCell scope="col">Upper price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lower price</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.filter(ev=>ev.predict_price).map((item, i) => (
            <CTableRow key={i}>
              <CTableHeaderCell scope="row">{moment(item.date).format('DD MMMM YYYY')}</CTableHeaderCell>
              <CTableDataCell>{item.current_price?.toFixed(2)}</CTableDataCell>
              <CTableDataCell>{item.horizon}</CTableDataCell>
              <CTableDataCell>{moment(item.predict_date).format('DD MMMM YYYY')}</CTableDataCell>
              <CTableDataCell>{item.predict_price?.toFixed(2)}</CTableDataCell>
              <CTableDataCell>{item.diff_current_price?.toFixed(2)}</CTableDataCell>
              <CTableDataCell>{item.direction}</CTableDataCell>
              <CTableDataCell>{item.upper_price?.toFixed(2)}</CTableDataCell>
              <CTableDataCell>{item.lower_price?.toFixed(2)}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Table

Table.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
}
