  CREATE VIEW [viz].[should_cost_analysis_app] AS
WITH should_cost_dates as (
	SELECT DISTINCT date
	FROM target.commodities
	WHERE year(date) > year(GETDATE())-3
)
,minimum_date as (

SELECT project_id
,d.date
,DATEDIFF(day,ces.date,d.date) date_diff
,MAX(DATEDIFF(day,ces.date,d.date)) OVER (PARTITION BY project_id) min_date
FROM target.cost_estimation_summary ces
CROSS JOIN should_cost_dates d
WHERE DATEDIFF(day,ces.date,d.date) < 0
GROUP BY project_id, d.date,DATEDIFF(day,ces.date,d.date)
)
, should_cost_model as 
(
	SELECT
	ces.[fiscal_year]
	,ces.[fiscal_month]
	,ces.[date]
	,a.category_ah4 [category]
	,a.subcategory_ah5 [sub_category]
	,CAST([article_id] AS VARCHAR(50)) [article]
	,a.description	[article_description]
	,p.country	[country_of_origin]
	,sec.name	cost_category
	,CASE ces.section_id 
	WHEN 4 THEN 'Overhead & Margin'
	WHEN 5 THEN 'Logistics'
	WHEN 6 THEN ' Duty & Tariff'
	ELSE s.[name] END [cost_element]
	,cast(ces.value as decimal(18,4)) unit_cost
	,CASE WHEN ces.Index_Ticker = 'null' THEN null else ces.index_ticker END index_ticker
	,bcd.Value as commodity_value
	,md.date commodity_date
	FROM target.cost_estimation_summary ces
	LEFT JOIN target.dim_subsection s ON
	s.id=ces.subsection_id
	LEFT JOIN target.dim_project p ON
	ces.project_id=p.id AND ISNULL(p.is_final,0) = 1 
	INNER JOIN target.dim_article a ON
	a.id= p.article_id
	LEFT JOIN target.dim_section sec ON
	sec.id=ces.section_id
	LEFT JOIN minimum_date md ON
	md.project_id=ces.project_id
	AND md.date_diff=md.min_date
	LEFT JOIN viz.all_commodities_data bcd 
	ON bcd.Index_Ticker = ces.index_ticker 
	AND bcd.Date = md.date

)

  SELECT 
		map.[fiscal_year]
	  ,map.[fiscal_month]
	  ,CAST(CAST(map.fiscal_year as varchar(5))+'-'+CAST(map.fiscal_month as varchar(5))+'-01' as date) fiscal_date
	  ,CAST(map.fiscal_year as varchar(5))+CAST(map.fiscal_month as varchar(5)) [fiscal_year_month]
	  ,bcd.Commodity Commodity
	  ,bcd.Units commodity_uom
	  ,scost.[category]
      ,scost.[sub_category] [Sub-Category]
	  ,scost.[article]
      ,scost.[article_description]
	  ,art.Brand_Name
	  ,art.material
	  ,art.color
	  ,art.Count
	  ,art.size
	  ,art.vendor_name
	  ,art.Template_URL
      ,scost.[country_of_origin]
      ,NULL cost_category_group
	  ,cost_category
	  ,scost.[cost_element]
	  ,scost.Index_Ticker
	  ,bcost.cost actual_cost
      ,[unit_cost] * isnull((ISNULL(NULLIF(bcd.value,0), commodity_value) / NULLIF(commodity_value,0)), 1) should_cost
	  ,CASE WHEN d.Date <> scost.commodity_date THEN 0 ELSE 1 END flag_modelled_cost
	  ,vfun.funding_pct
	  ,aur.[sales_quantity] [Sales Quantity]
	  ,aur.[avg_unit_retail] [Avg Unit Retail]
	  ,forc.forecast_qty forecast_anual_unit_volume
	  ,forc.forecast_COGS
	  ,forc.forecast_revenue
	  ,bcd.Value commodity_value
	  ,scost.country_of_origin+CAST(scost.article as varchar(25)) filtering_id
  FROM should_cost_model scost
  CROSS JOIN should_cost_dates d
  INNER JOIN etl.calendar_fiscal_mapping map
	ON  year(d.Date) = map.calendar_year
	AND month(d.date) = map.calendar_month
  LEFT JOIN viz.all_commodities_data bcd 
	ON bcd.Index_Ticker = scost.Index_Ticker 
	AND d.Date = bcd.Date
  LEFT JOIN target.baseline_costs bcost 
	ON bcost.article = scost.article 
	AND bcost.fiscal_year = map.fiscal_year 
	AND bcost.fiscal_month = map.fiscal_month
  INNER JOIN target.dim_article art
	ON art.id = scost.article
  LEFT JOIN target.vendor_funding vfun
	ON vfun.vendor_id = art.vendor
  LEFT JOIN target.retail_aur aur
	ON aur.Article = scost.article
	AND aur.fiscal_year = map.fiscal_year
	AND aur.fiscal_month = map.fiscal_month
  LEFT JOIN target.forecast forc
	ON forc.article = bcost.article
	AND forc.fiscal_year = bcost.fiscal_year;