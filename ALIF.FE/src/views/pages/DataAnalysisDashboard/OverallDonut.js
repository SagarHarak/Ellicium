import { useState, useEffect } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSuppliersByCountriesForDonut } from 'src/redux/async'
import CountryDonut from './CountryDonut';

const OverallDonut = () => {
    const dispatch = useDispatch()
    const [pieDataCountry, setPieDataCountry] = useState([])
    const { topcountriesLoader, topcountriesError, topcountries_state} = useSelector((state) => state.topcountriesdonut)
    useEffect(() => {
        dispatch(getSuppliersByCountriesForDonut())
    }, [])

    useEffect(() => {
        if (topcountries_state.Country_Weight_Distribution != undefined) {
            setPieDataCountry(topcountries_state.Country_Weight_Distribution)
        }
    },[topcountries_state])
    return (
        <CountryDonut legend={true} chartID='countrydonut' importerName='Top Countries by Metric Tons' data={pieDataCountry?.slice(0, 5)} />
    )
}

export default OverallDonut;