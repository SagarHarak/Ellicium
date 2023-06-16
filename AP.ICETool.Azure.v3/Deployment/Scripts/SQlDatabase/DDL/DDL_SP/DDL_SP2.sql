CREATE PROCEDURE [viz].[early_warning_radar_tables_resfresh] as

TRUNCATE TABLE viz.tbl_early_warning_radar_app;
INSERT INTO viz.tbl_early_warning_radar_app (
[fiscal_year]
      ,[fiscal_month]
      ,[fiscal_year_month]
      ,[fiscal_date]
      ,[Commodity]
      ,[category] 
      ,[Sub-category]
      ,[article]
      ,[vendor_name]
      ,[Brand_Name]
      ,[brand_category]
      ,[country_of_origin]
      ,[Index_Ticker]
      ,[commodity_value]
      ,[commodity_uom]
      ,[actual_cost]
      ,[should_cost]
      ,[forecast_anual_unit_volume]
      ,[po_cost]
      ,[exposure]
      ,[latest_change_fiscal_date]
      ,[latest_change_cv]
	  ,[filtering_id])

	SELECT [fiscal_year]
      ,[fiscal_month]
      ,[fiscal_year_month]
      ,[fiscal_date]
      ,[Commodity]
      ,[category]
      ,[Sub-category]
      ,[article]
      ,[vendor_name]
      ,[Brand_Name]
      ,[brand_category]
      ,[country_of_origin]
      ,[Index_Ticker]
      ,[commodity_value]
      ,[commodity_uom]
      ,[actual_cost]
      ,[should_cost]
      ,[forecast_anual_unit_volume]
      ,[po_cost]
      ,[exposure]
      ,[latest_change_fiscal_date]
      ,[latest_change_cv]
	  ,[filtering_id]
	  FROM viz.early_warning_radar_app