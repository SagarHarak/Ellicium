import React from 'react'
import downsortsvg from '../../../../assets/downsortsvg.svg'

export const DownSort = () => {
  return <img src={downsortsvg} alt="" width="20px" className="mx-2" />
}

export const uniqueValueArray = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

export const customStyles = {
  rows: {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '16px',
      background: '#161a1e',
      color: '#A8B6C2',
      maxWidth: '100%',
      whiteSpace: 'normal',
      overflow: 'none',
      minHeight: '50px',
    },
  },
  headCells: {
    style: {
      background: '#1d2328',
      color: 'white',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '19px',
    },
  },
  pagination: {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '16px',
      background: '#1d2328',
      color: '#A8B6C2',
      // maxWidth: '100%',
      whiteSpace: 'normal',
      overflow: 'none',
      minHeight: '50px',
    },
  },
}
