import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { CRow, CCol } from '@coreui/react-pro';
import PropTypes from 'prop-types'
import CompetitorMap from './CompetitorMap';
import CompetitorTable from './CompetitorTable'
import OverallDonut from './OverallDonut';
import CompaniesDonut from './CompaniesDonut';
import ImporterCompaniesLeft from './ImporterCompaniesLeft';
import ImporterCompaniesRight from './ImporterCompaniesRight';

const CompetitorAnalysis = () => {
  const token = `${localStorage.getItem("accesstoken")}`;
  const navigate = useNavigate()

  useEffect(() => {
    if (token == 'null') {
      navigate('/')
    }
  }, [])

  return (
    <>
      <CompetitorMap />
      <br />
      <CRow>
        <CCol md={6}>
          <CompetitorTable />
        </CCol>
        <CCol md={6}>
          <OverallDonut />
        </CCol>
      </CRow>
      <br />
      <CRow>
        <CompaniesDonut />
      </CRow>
      <br />
      <CRow>
        <CCol md={6}>
          <ImporterCompaniesLeft />
        </CCol>
        <CCol md={6}>
          <ImporterCompaniesRight />
        </CCol>
      </CRow>
    </>
  )
}

CompetitorAnalysis.propTypes = {
  data: PropTypes.array,
}

export default CompetitorAnalysis
