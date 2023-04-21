import { CCard, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import Donut from 'src/views/components/Donut'
import PropTypes from 'prop-types'
import CountryDonutComponent from './CountryDonutComponent'

function CountryDonut({chartID ,importerName,data,legend}) {
  return (
    <CCard style={{ backgroundColor: '#161a1e'}} >
    <CCardHeader className="cardtitle">{importerName}</CCardHeader>
    <div className="d-flex h-100 w-100 ">
    <CountryDonutComponent legend={legend} chartID={chartID} data={data}/>
    </div>
  </CCard>
  )
}

export default CountryDonut

CountryDonut.propTypes = {
    chartID: PropTypes.string,
    importerName:PropTypes.string,
    data:PropTypes.array,
    legend: PropTypes.bool
  }