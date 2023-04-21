-- Inventory Analysis 
SELECT
	CONVERT(FLOAT,SUM(COG)/AVG(Total_Inventory_Value)) as Inventory_Turnover_Rate,
	CAST(100 * (SUM(CONVERT(FLOAT, Selling_Price))-SUM(CONVERT(FLOAT, Cost_Price)))/(SUM(CONVERT(FLOAT, Cost_Price))) AS DECIMAL(5,
	1)) AS Inventory_Rate_Of_Return,
	SUM(Worths_of_Damages) as Inventory_Write_Off_Reserves,
	SUM(COG) AS Overall,
	SUM(CASE WHEN Score>50 THEN COG END) AS Overall_Risk,
	SUM(CASE WHEN Score>50 THEN COG END) * 0.3 AS Mitigation
FROM
	gtosqldbdev.cortevadev2.Summary_Dashboard_Data;

-- Import Analysis
SELECT 
	COUNT(DISTINCT company_id) AS No_Of_Suppliers,
	CONVERT(FLOAT,AVG(net_income)) AS Average_Revenue_Of_Suppliers,
	AVG(credit_score) AS Average_Credit_Health,
	SUM(net_income) AS Overall,
	SUM(CASE WHEN credit_score>15 THEN net_income END) AS Overall_Risk,
	SUM(CASE WHEN credit_score>15 THEN net_income END) * 0.2 AS Mitigation
FROM 
	gtosqldbdev.cortevadev2.Import_Analysis;