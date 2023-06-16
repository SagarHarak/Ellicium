CREATE view [viz].[all_commodities_data] as
-- used to be called  [viz].[benchmarking_cpim_data] from the GTO tool


WITH dates as(

SELECT DISTINCT calendar_month_first_day
FROM target.dim_calendar
WHERE date<GETDATE()
)
, crossjoin as 

(
SELECT DISTINCT index_ticker
	, calendar_month_first_day 
FROM target.dim_commodities
CROSS JOIN dates dd
--WHERE index_ticker = 'PA29'
)

,max_date_per_commodity as ( 
SELECT value,index_ticker,date
FROM  target.commodities d
INNER JOIN target.dim_commodities c
	ON d.Commodity_ID = c.id
INNER JOIN (SELECT commodity_id, MAX(date) max_date FROM target.commodities group by commodity_id) f
	ON f.commodity_id = d.commodity_id
WHERE  f.max_date =d.date --and index_ticker = 'PA29'
)



SELECT 
	  cj.calendar_month_first_day Date
	 , fiscal_year
	 , fiscal_month
	 , Commodity_Id
	 , level_1 Segment
	 , level_2 Commodity 
	 , level_3 Details
	 , Description
	 , series_specific
	 , cj.Index_Ticker
	 , Units
	 , level_4 Country
	 , CASE WHEN d.value is null THEN mdc.value ELSE d.value END value
FROM  target.commodities d
INNER JOIN target.dim_commodities c
	ON d.Commodity_ID = c.id
INNER JOIN etl.calendar_fiscal_mapping map
	ON year(d.date) = map.calendar_year
	AND month(d.date) =  map.calendar_month
RIGHT JOIN crossjoin cj
	ON cj.index_ticker = c.index_ticker
	AND cj.calendar_month_first_day = d.date
LEFT JOIN max_date_per_commodity mdc
	ON mdc.index_ticker = cj.index_ticker
	AND calendar_month_first_day >= mdc.date
WHERE YEAR(cj.calendar_month_first_day)>=2020 ;