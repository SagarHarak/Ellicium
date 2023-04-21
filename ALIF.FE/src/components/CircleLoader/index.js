import React from 'react'
import LoadingSVG from '../../assets/RollingLoading.svg'
import { CCol } from '@coreui/react-pro'
import PropTypes from 'prop-types'

const Loader = ({ height = "fit-content" }) => {
  return (
    <CCol
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#18191d',
        marginBottom: "20px"
      }}
    >
      <img
        src={LoadingSVG}
        alt="loader"
        style={{
          width: '50px',
        }}
      />
    </CCol>
  )
}

export default Loader

Loader.propTypes = {
  height: PropTypes.string,
}
