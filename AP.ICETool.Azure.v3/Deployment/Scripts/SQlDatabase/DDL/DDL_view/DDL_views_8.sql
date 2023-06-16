CREATE view [icr].[basket_movers] as
WITH maxDate AS
(
	SELECT MAX(Date) as MD FROM viz.all_commodities_data
	WHERE Date <= '2022-08-01'
)

SELECT 
	b.name as Basket,
	c.description as Commodity,
	c.index_ticker as Ticker,
	MD As CurrentDate,
	cdCurrent.value as CurrentPrice,
	DATEADD(month, -1, MD) AS PriorMonthDate,
	cdPM.value as PriorMonthPrice,
	CASE cdCurrent.value
		WHEN 0 THEN 0
		ELSE (cdPM.value - cdCurrent.value) / cdCurrent.value 
	END as PriorMonthVar,
	DATEADD(year, -1, MD) AS PriorYearDate,
	cdPY.value as PriorMonthYear,
	CASE cdCurrent.value
		WHEN 0 THEN 0
		ELSE (cdPY.value - cdCurrent.value) / cdCurrent.value
	END as PriorYearVar
FROM
	[icr].[basket] b INNER JOIN
	[icr].[basket_commodities] bc ON b.id = bc.basket_id INNER JOIN
	target.dim_commodities c on bc.commodity_id = c.id CROSS JOIN 
	maxDate LEFT JOIN
	viz.all_commodities_data cdCurrent ON cdCurrent.Commodity_Id = c.id AND cdCurrent.Date = MD LEFT JOIN
	viz.all_commodities_data cdPM ON cdPM.Commodity_Id = c.id AND cdPM.Date = DATEADD(month, -1, MD) LEFT JOIN
	viz.all_commodities_data cdPY ON cdPY.Commodity_Id = c.id AND cdPY.Date = DATEADD(year, -1, MD);