import React from 'react'
import PropTypes from 'prop-types'

const PageHeader = ({ name }) => {
  return (
    <div
      className="fs-5 text-uppercase pb-3"
      style={{
        fontSize: '25px',
        fontWeight: '500',
        lineHeight: '29px',
        fontFamily: 'Roboto',
      }}
    >
      {name}
    </div>
  )
}

export default PageHeader

PageHeader.propTypes = {
  name: PropTypes.string,
}
