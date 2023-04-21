import React from 'react'
import PropTypes from 'prop-types'
import './SkeletonLoading.scss'

const SkeletonLoading = ({ width, height, radius, className }) => {
  return (
    <div
      style={{
        backgroundColor: '#cfcfcf!important',
        width: width,
        height: height,
        borderRadius: radius,
        padding:'10px'
      }}
      className={`animateloader ${className}`}
    ></div>
  )
}

export default SkeletonLoading

SkeletonLoading.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    radius: PropTypes.string,
    className: PropTypes.string,
  }
  