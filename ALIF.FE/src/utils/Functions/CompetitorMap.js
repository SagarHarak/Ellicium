export const FetchData = async (data) => {
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