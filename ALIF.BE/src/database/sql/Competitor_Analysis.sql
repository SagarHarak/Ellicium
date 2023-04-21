SELECT Provider_State_City, Port, Importer_City, Naics_Code, Unit_Value_USD, Importer, Commercial_Unit, Port_ID, Importer_State, Importer_Address, HS_Description, Provider_State_Declared, Naics_Classification, Port_State, Weight, [Date], Provider, Provider_Address, Product_HS, Provider_Declared, Transport_Method, Customs_Value_USD, Commercial_Quantity, row_id, Country_of_Origin, HS, HS_Desc, [Time], Supplier_Type
FROM gtosqldbdev.cortevadev1.Faurecia_data;


-- World Map
SELECT
    100 * (SUM(Weight)/(
	select
        SUM(Weight)
    from
        gtosqldbdev.cortevadev1.Faurecia_data)) As Weight_Percentage
		,
    Country_of_Origin 
			, COUNT(Provider) AS No_Of_Suppliers
FROM
    gtosqldbdev.cortevadev1.Faurecia_data
GROUP BY
	Country_of_Origin
--	,Provider
ORDER BY 
	Country_of_Origin
;

SELECT
    100 * (SUM(Weight)/(
	select
        SUM(Weight)
    from
        gtosqldbdev.cortevadev1.Faurecia_data)) As Weight_Percentage
		,
    Country_of_Origin 
			,
    Provider
FROM
    gtosqldbdev.cortevadev1.Faurecia_data
GROUP BY
	Country_of_Origin
	,
	Provider
ORDER BY 
	Country_of_Origin ;