import { useState, useEffect } from 'react';
import React from 'react';
import Dropdown from 'src/views/components/Dropdown';
import { CRow, CCol, CCard, CCardBody, CCardHeader, CSpinner, CSmartTable } from '@coreui/react-pro';
import ChartComponent from 'src/components/charts/BarLineChart'
import { useSelector, useDispatch } from 'react-redux'
import { getChartDataLeftChart } from 'src/redux/async'

const ImporterCompaniesLeft = () => {
    const [importerOpions, setImporterOpions] = useState([])
    const [bardata1, setBarData1] = useState([])
    const [importerRef1, setImporterRef1] = useState([])
    const dispatch = useDispatch()
    const { providerLeftChart_state, providerLeftChartLoader } = useSelector((state) => state.providerLeftChart)
    const { cafiltersLoader, cafiltersError, cafiltersData }
        = useSelector((state) => state.competitoranalysisfilters)

    const fetchProviderDataClean = (data, setData) => {
        let newData = []
        for (let j = 0; j < data?.Provider_Weight_Distribution?.length; j++) {
            let key = newData.findIndex(
                (element) => element.Provider === data.Provider_Weight_Distribution[j].Provider,
            )
            if (key === -1) {
                newData.push({
                    Provider: data.Provider_Weight_Distribution[j].Provider,
                    weight_percentage: data.Provider_Weight_Distribution[j].Weight_Percentage,
                    count: 1,
                    country_of_origin: [
                        {
                            country: data.Provider_Weight_Distribution[j].Country_of_Origin,
                            sales: data.Provider_Weight_Distribution[j].Weight_Percentage,
                        },
                    ],
                })
            } else {
                newData[key] = {
                    ...newData[key],
                    weight_percentage:
                        newData[key].weight_percentage + data.Provider_Weight_Distribution[j].Weight_Percentage,
                    count: newData[key].count + 1,
                    country_of_origin: newData[key].country_of_origin.concat({
                        country: data.Provider_Weight_Distribution[j].Country_of_Origin,
                        sales: data.Provider_Weight_Distribution[j].Weight_Percentage,
                    }),
                }
            }
        }

        let totalCount = newData.length
        for (let index = 0; index < newData.length; index++) {
            newData[index] = {
                ...newData[index],
                count_percentage: (newData[index].count / totalCount) * 100,
            }
        }
        setData(newData)
    }

    useEffect(() => {
        const filterArray2 = importerRef1.map(
            (element) => element.label
        );
        if (filterArray2.length > 0) {
            const temp2 = "'" + filterArray2.join("','") + "'"
            dispatch(
                getChartDataLeftChart({
                    Importer: temp2,
                }),
            )
        }
        else {
            dispatch(getChartDataLeftChart())
        }
    }, [importerRef1])

    useEffect(() => {
        if (cafiltersData.importer_filters != undefined) {
            let importer = []
            cafiltersData.importer_filters.map(el => {
                importer.push({
                    label: el.Importer,
                    value: el.Importer
                })
            })
            setImporterOpions(importer)
        }
    }, [cafiltersData])

    useEffect(() => {
        if (providerLeftChart_state) {
            fetchProviderDataClean(providerLeftChart_state, setBarData1)
        }
    }, [providerLeftChart_state])

    return (
        <CCard className='default-Card' >
            <CCardHeader className="cardtitle">Our Company</CCardHeader>
            <CRow className="m-3 default-Card">
                <CCol md={5}>
                    {cafiltersLoader ? <></> :
                        <Dropdown set={setImporterRef1} data={importerRef1} value="Importers" options={importerOpions} />
                    }
                </CCol>
            </CRow>
            <div className="d-flex h-100 w-100 default-Card" >
                {providerLeftChartLoader ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>

                    <CSpinner color='success' />
                </div> :

                    <ChartComponent charttype="left_chart" data={bardata1.slice(0, 10)} />
                }
            </div>
        </CCard>
    )
}

export default ImporterCompaniesLeft;