import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CCol, CContainer, CRow } from '@coreui/react-pro'
import PropTypes from 'prop-types'
import StackedColumnChart from 'src/components/charts/StackedColumnChart/StackedColumnChart'
import ClusteredBarChart from 'src/components/charts/ClusteredBarChart/ClusteredBarChart'

const SalesAnalytics = () => {
  const token = `${localStorage.getItem("accesstoken")}`;
  const navigate = useNavigate()

  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  return (
    <>
      <CContainer className="bg-white">
        <CRow className="bg-white InfoBlockRow">
          <InfoBlock number="311" percent="18,17" vs="PM" name="Inventory Units" />
          <InfoBlock number="311" percent="18,17" vs="PM" name="Inventory Units" />
          <InfoBlock number="311" percent="18,17" vs="PM" name="Inventory Units" />
          <InfoBlock number="311" percent="18,17" vs="PM" name="Inventory Units" />
          <InfoBlock number="311" percent="18,17" vs="PM" name="Inventory Units" border={true} />
        </CRow>
        <CRow className="bg-white mt-5">
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's">
            <StackedColumnChart chartID="stack" />
          </InfoChartBox>
          <InfoChartBox name="Quaterly Inventory" by="quarter" number="8152" type="Total SKU's">
            <ClusteredBarChart chartID="cluster" />
          </InfoChartBox>
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's" />
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's" />
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's" />
        </CRow>
        <CRow className="bg-white">
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's">
            <StackedColumnChart chartID="stack2" />
          </InfoChartBox>
          <InfoChartBox name="Quaterly Inventory" by="quarter" number="8152" type="Total SKU's">
            <ClusteredBarChart chartID="cluster2" />
          </InfoChartBox>
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's" />
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's" />
          <InfoChartBox name="Quaterly Inventory" by="" number="8152" type="Total SKU's" />
        </CRow>
      </CContainer>
    </>
  )
}

export default SalesAnalytics

const InfoBlock = ({ number, percent, vs, name, border }) => {
  return (
    <CCol
      className="p-4"
      style={{
        borderRight: !border ? '8px solid #3493e6' : '',
        borderWidth: !border ? '8px' : '',
      }}
    >
      <h6 className="text-center fs-4">{number}</h6>
      <h6 className="text-center">
        <span className="text-success">{percent}%</span>{' '}
        <span
          style={{
            fontSize: '10px',
          }}
        >
          vs {vs}
        </span>
      </h6>
      <h6
        className="text-center"
        style={{
          fontSize: '13px',
          fontWeight: '500',
        }}
      >
        {name}
      </h6>
    </CCol>
  )
}

const InfoChartBox = ({ name, by, number, type, children }) => {
  return (
    <CCol
      className="p-4"
      style={{
        borderRight: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderRightStyle: 'dashed',
        borderBottomStyle: 'dashed',
      }}
    >
      <h6
        className="h6"
        style={{
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '15px',
        }}
      >
        {name}
      </h6>
      <h6
        style={{
          fontSize: '13px',
          fontWeight: '500',
        }}
      >
        {by && `By ${by}`}
      </h6>
      <h6
        className="h6 fs-4"
        style={{
          fontSize: '16px',
          lineHeight: '15px',
        }}
      >
        {number}
      </h6>
      <h6
        style={{
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: '13px',
        }}
      >
        {type}
      </h6>
      <CCol
      // style={{
      //   height: '100px',
      // }}
      >
        {children}
      </CCol>
    </CCol>
  )
}

InfoChartBox.propTypes = {
  name: PropTypes.string,
  by: PropTypes.string,
  number: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.func,
}

InfoBlock.propTypes = {
  number: PropTypes.string,
  percent: PropTypes.string,
  vs: PropTypes.string,
  name: PropTypes.string,
  border: PropTypes.bool,
}
