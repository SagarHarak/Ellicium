CREATE view [viz].[commodities_data] as
-- used to be called  [viz].[benchmarking_cpim_data] from the GTO tool
SELECT 
	 Date
	 , fiscal_year
	 , fiscal_month
	 , Commodity_Id
	 , level_1 [Level 1]
	 , level_2 [Level 2]
	 , level_3 [Level 3]
	 , Description
	 , series_specific
	 , --CASE WHEN level_1 in ('Transport') THEN 'N/A' ELSE Index_Ticker END 
	 Index_Ticker
	 , Units
	 , level_4 [Level 4]
	 , d.value
	 , c.data_source [Data Source]
FROM  target.commodities d
INNER JOIN target.dim_commodities c
	ON d.Commodity_ID = c.id
INNER JOIN etl.calendar_fiscal_mapping map
	ON year(d.date) = map.calendar_year
	AND month(d.date) =  map.calendar_month;
