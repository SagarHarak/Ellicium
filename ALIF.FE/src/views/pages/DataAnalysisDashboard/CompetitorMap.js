import { useState, useEffect } from 'react';
import React from 'react';
import Dropdown from 'src/views/components/Dropdown';
import { CRow, CCol, CCard, CCardHeader, CSpinner } from '@coreui/react-pro';
import WorldMap from 'src/components/charts/WorldMap';
import { useSelector, useDispatch } from 'react-redux'
import { getSuppliersByCountries, getCompetitorAnalysisFilters } from 'src/redux/async'
import { FetchData } from 'src/utils/Functions/CompetitorMap';
import { AddSuppliersMap } from 'src/redux/slices/CompetitorAnalysis/suppliersbycountries.slice';

const CompetitorMap = () => {
    const [supplierOptions, setSupplierOptions] = useState([])
    const [hsOptions, setHSOptions] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [data, setData] = useState([])
    const { suppliersbycountries_state, suppliersbycountriesLoader, suppliersbycountries_data, suppliersbycountriesError } = useSelector((state) => state.suppliersbycountries)
    const { cafiltersLoader, cafiltersError, cafiltersData } = useSelector((state) => state.competitoranalysisfilters)
    const [supplierDataRef3, setSupplierDataRef3] = useState([])
    const [hsRef3, setHSRef3] = useState([])
    const [countryRef3, setCountryRef3] = useState([
        { 'label': 'CHINA', 'value': 'CHINA' },
        { 'label': 'UNITED STATES', 'value': 'UNITED STATES' },
        { 'label': 'INDIA', 'value': 'INDIA' }
    ])
    const dispatch = useDispatch()

    const FetchData1 =  (data) => {
        let countries = []
        let dData = []
        let temp = []
        if (data.Country_Weight_Distribution != undefined) {
        for (let j = 0; j < data.Country_Weight_Distribution.length; j++) {
            let count = 0
            for (var k = 0; k < data.Provider_Weight_Distribution.length; k++) {
                if (!countries.includes(data.Provider_Weight_Distribution[k].Country_of_Origin)) {
                    if (data.Country_Weight_Distribution[j].Country_of_Origin == data.Provider_Weight_Distribution[k].Country_of_Origin) {
                        dData.push({
                            Country_of_Origin: data.Country_Weight_Distribution[j].Country_of_Origin,
                            No_Of_Suppliers: data.Country_Weight_Distribution[j].No_Of_Suppliers,
                            Weight_Percentage: data.Country_Weight_Distribution[j].Weight_Percentage,
                            Suppliers: [{
                                Supplier: data.Provider_Weight_Distribution[k].Provider,
                                Supplier_Weight: data.Provider_Weight_Distribution[k].Weight_Percentage
                            }]
                        })
                        countries.push(data.Provider_Weight_Distribution[k].Country_of_Origin)
                        count = count + 1
                    }
                }
                else {
                    for (var m = 0; m < dData.length; m++) {
                        if (dData[m].Country_of_Origin == data.Provider_Weight_Distribution[k].Country_of_Origin) {
                            if (!temp.includes(data.Provider_Weight_Distribution[k].Provider)) {
                                dData[m].Suppliers.push({
                                    Supplier: data.Provider_Weight_Distribution[k].Provider,
                                    Supplier_Weight: data.Provider_Weight_Distribution[k].Weight_Percentage
                                })
                                temp.push(data.Provider_Weight_Distribution[k].Provider)
                            }
                        }
                    }
                }
            }
        }
        // }
        return dData 
    }
    }

    useEffect(() => {
        dispatch(getCompetitorAnalysisFilters())
    }, [])

    useEffect(() => {
        if (cafiltersData.supporter_type_filters != undefined) {
            let Supplier_type = []
            cafiltersData.supporter_type_filters.map(el => {
                Supplier_type.push({
                    label: el.Supplier_type,
                    value: el.Supplier_type
                })
            })
            if (Supplier_type.length > 0) {
                setSupplierOptions(Supplier_type)
            }
            let countries = []
            cafiltersData.country_filters.map(el => {
                countries.push({
                    label: el.Country_of_Origin,
                    value: el.Country_of_Origin
                })
            })
            setCountryOptions(countries)
            let hs = []
            cafiltersData.hs_filters.map(el => {
                hs.push({
                    label: el.HS,
                    value: el.HS
                })
            })
            setHSOptions(hs)
            // let importer = []
            // cafiltersData.importer_filters.map(el => {
            //     importer.push({
            //         label: el.Importer,
            //         value: el.Importer
            //     })
            // })
            // setImporterOpions(importer)
        }
    }, [cafiltersData])
    // let d = []
    useEffect(() => {
        if (suppliersbycountries_state.Country_Weight_Distribution != undefined) {
            // const d = FetchData1(suppliersbycountries_state)
            // setData(d)
            (async () => {
                const plotmap = await FetchData(suppliersbycountries_state);
                dispatch(AddSuppliersMap(plotmap));
            })();
        }
    }, [suppliersbycountries_state])

    useEffect(() => {
        const filterArray1 = supplierDataRef3.map(
            (element) => element.label
        );
        const filterArray2 = hsRef3.map(
            (element) => element.label
        );
        const filterArray3 = countryRef3.map(
            (element) => element.label
        );
        if (filterArray1.length > 0 & filterArray2.length > 0 & filterArray3.length > 0) {
            const temp1 = "'" + filterArray1.join("','") + "'"
            const temp2 = "'" + filterArray2.join("','") + "'"
            const temp3 = "'" + filterArray3.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    Supplier_Type: temp1,
                    HS: temp2,
                    Country_of_Origin: temp3
                })
            );
        }
        else if (filterArray1.length > 0 & filterArray2.length > 0 & filterArray3.length == 0) {
            const temp1 = "'" + filterArray1.join("','") + "'"
            const temp2 = "'" + filterArray2.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    Supplier_Type: temp1,
                    HS: temp2
                })
            );
        }
        else if (filterArray1.length == 0 & filterArray2.length > 0 & filterArray3.length > 0) {
            const temp3 = "'" + filterArray3.join("','") + "'"
            const temp2 = "'" + filterArray2.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    Country_of_Origin: temp3,
                    HS: temp2
                })
            );
        }
        else if (filterArray1.length > 0 & filterArray2.length == 0 & filterArray3.length > 0) {
            const temp3 = "'" + filterArray3.join("','") + "'"
            const temp1 = "'" + filterArray1.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    Country_of_Origin: temp3,
                    Supplier_Type: temp1
                })
            );
        }
        else if (filterArray1.length > 0 & filterArray2.length == 0 & filterArray3.length == 0) {
            const temp1 = "'" + filterArray1.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    Supplier_Type: temp1
                })
            );
        }
        else if (filterArray1.length == 0 & filterArray2.length > 0 & filterArray3.length == 0) {
            const temp2 = "'" + filterArray2.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    HS: temp2
                })
            );
        }
        else if (filterArray1.length == 0 & filterArray2.length == 0 & filterArray3.length > 0) {
            const temp3 = "'" + filterArray3.join("','") + "'"
            dispatch(
                getSuppliersByCountries({
                    Country_of_Origin: temp3
                })
            );
        }
        else {
            dispatch(getSuppliersByCountries());
        }
    }, [supplierDataRef3, hsRef3, countryRef3])

    return (
        <>
            <CRow className="mb-2">
                <CCol md={3}></CCol>
                <CCol md={3} >
                    {cafiltersLoader ? <></> :
                        <Dropdown set={setSupplierDataRef3} data={supplierDataRef3} value="Supplier Type" options={supplierOptions} />}
                </CCol>
                <CCol md={3}>
                    {cafiltersLoader ? <></> :
                        <Dropdown set={setHSRef3} data={hsRef3} value="HS" options={hsOptions} />}
                </CCol>
                <CCol md={3}>
                    {cafiltersLoader ? <></> :
                        <Dropdown set={setCountryRef3} data={countryRef3} value="Country of Origin" options={countryOptions} />}
                </CCol>
            </CRow>
            <CCard>
                <CCardHeader className="cardtitle">Suppliers by Countries</CCardHeader>
                <div className="d-flex h-100 w-100 default-Card">
                    {suppliersbycountriesLoader?
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <CSpinner color='success' />
                        </div> : 
                        <WorldMap data={suppliersbycountries_data} />
                     }
                </div>
            </CCard>
        </>
    )
}

export default CompetitorMap;