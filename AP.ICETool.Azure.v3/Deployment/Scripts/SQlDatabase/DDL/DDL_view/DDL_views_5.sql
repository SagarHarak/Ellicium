  CREATE VIEW [viz].[early_warning_radar_app] as


WITH historical_price AS (
			SELECT DISTINCT [Index_Ticker]
				  ,[fiscal_year] * 100 + [fiscal_month] fiscal_year_month
				  ,[country_of_origin]
				  ,commodity_value
				  ,DENSE_RANK() OVER(PARTITION BY sca.[Index_Ticker], [country_of_origin] ORDER BY [fiscal_year] * 100 + [fiscal_month] DESC) historical_order

			  FROM [viz].[should_cost_analysis_app] sca
			  WHERE Index_Ticker IS NOT NULL	
				   AND cost_category not in ('Duty & Tariff','Overhead & Margin') 
				   AND Index_Ticker != 'null'
	
	
	), historical_changes AS (
			SELECT hp1.Index_Ticker, hp1.country_of_origin, hp2.fiscal_year_month latest_change_fym, hp2.commodity_value latest_change_cv, 
			ROW_NUMBER() OVER(PARTITION BY hp1.Index_Ticker, hp1.country_of_origin ORDER BY hp2.historical_order) latest_change
			  FROM historical_price hp1
			  LEFT JOIN historical_price hp2
				ON hp1.Index_Ticker = hp2.Index_Ticker
			   AND hp1.country_of_origin = hp2.country_of_origin
			   AND hp1.historical_order = hp2.historical_order - 1
			 WHERE hp1.commodity_value != hp2.commodity_value	

	), latest_price_change AS (
			SELECT *
			  FROM historical_changes
			 WHERE latest_change = 1
	)


SELECT sca.[fiscal_year]
      ,sca.[fiscal_month]
	  ,sca.[fiscal_year] * 100 + sca.[fiscal_month] fiscal_year_month
	  ,DATEFROMPARTS(sca.[fiscal_year], sca.[fiscal_month], 1) fiscal_date
	  ,level_1 Commodity
	  ,[category]
      ,[Sub-Category]
      ,[article]
      ,[vendor_name]
      ,[Brand_Name]
	  ,'N/A' brand_category
      ,sca.[country_of_origin]
	  --,level_4 commodity_country
      ,sca.[Index_Ticker]
      ,[commodity_value]
	  ,acd.Units commodity_uom
      ,[actual_cost]
	  ,[should_cost]
	  ,[forecast_anual_unit_volume]
	  ,[actual_cost] * [forecast_anual_unit_volume] po_cost
	  ,[should_cost] * [forecast_anual_unit_volume] exposure
	  ,DATEFROMPARTS(LEFT(lpc.latest_change_fym, 4), RIGHT(lpc.latest_change_fym, 2), 1) latest_change_fiscal_date
	  ,lpc.latest_change_cv
	  ,sca.country_of_origin+CAST(article as varchar(50)) filtering_id

  FROM [viz].[should_cost_analysis_app] sca
  JOIN target.dim_commodities dc ON sca.Index_Ticker = dc.index_ticker
  LEFT JOIN [viz].[all_commodities_data] acd
    ON sca.Index_Ticker = acd.index_ticker
   AND sca.fiscal_year = acd.fiscal_year
   AND sca.fiscal_month = acd.fiscal_month
  LEFT JOIN latest_price_change lpc
    ON sca.Index_Ticker = lpc.index_ticker
   AND sca.country_of_origin = lpc.country_of_origin;