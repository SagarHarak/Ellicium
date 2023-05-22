import React from 'react';
import { CRow, CCol, CCard, CCardBody, CCardHeader, CSpinner, CSmartTable } from '@coreui/react-pro';
import CountryDonut from './CountryDonut';

const CompaniesDonut = () => {
    const Faurecia = [{
        Country_of_Origin: "PORTUGAL",
        Weight_Percentage: 10
      }, {
        Country_of_Origin: "CHINA",
        Weight_Percentage: 35
      }, {
        Country_of_Origin: "UNITED STATES",
        Weight_Percentage: 29
      },
      {
        Country_of_Origin: "GERMANY",
        Weight_Percentage: 15
      },
      {
        Country_of_Origin: "POLAND",
        Weight_Percentage: 11
      }
      ]
      const Adient = [{
        Country_of_Origin: "CANADA",
        Weight_Percentage: 2
      }, {
        Country_of_Origin: "CHINA",
        Weight_Percentage: 35
      }, {
        Country_of_Origin: "UNITED STATES",
        Weight_Percentage: 51
      },
      {
        Country_of_Origin: "GERMANY",
        Weight_Percentage: 16
      },
      {
        Country_of_Origin: "POLAND",
        Weight_Percentage: 15
      }
      ]
      const Lear = [{
        Country_of_Origin: "CANADA",
        Weight_Percentage: 13
      }, {
        Country_of_Origin: "CHINA",
        Weight_Percentage: 7
      }, {
        Country_of_Origin: "UNITED STATES",
        Weight_Percentage: 59
      },
      {
        Country_of_Origin: "ITALY",
        Weight_Percentage: 2
      },
      {
        Country_of_Origin: "MEXICO",
        Weight_Percentage: 20
      }
      ]
      const Yanfeng = [{
        Country_of_Origin: "CHINA",
        Weight_Percentage: 99.9
      },
      {
        Country_of_Origin: "UNITED STATES",
        Weight_Percentage: 0.1
      }
      ]
      const Magna = [{
        Country_of_Origin: "CANADA",
        Weight_Percentage: 11
      }, {
        Country_of_Origin: "CHINA",
        Weight_Percentage: 14
      }, {
        Country_of_Origin: "UNITED STATES",
        Weight_Percentage: 67
      },
      {
        Country_of_Origin: "TAIWAN",
        Weight_Percentage: 2
      },
      {
        Country_of_Origin: "MEXICO",
        Weight_Percentage: 6
      }
      ]

    return (
        <>
            <CCol>
                <CountryDonut chartID='top1' importerName='Faurecia' data={Faurecia} />
            </CCol>
            <CCol>
                <CountryDonut chartID='top2' importerName='Adient' data={Adient} />
            </CCol>
            <CCol >
                <CountryDonut chartID='top3' importerName='Lear' data={Lear} />
            </CCol>
            <CCol>
                <CountryDonut chartID='top4' importerName='Yanfeng' data={Yanfeng} />
            </CCol>
        </>
    )
}

export default CompaniesDonut;