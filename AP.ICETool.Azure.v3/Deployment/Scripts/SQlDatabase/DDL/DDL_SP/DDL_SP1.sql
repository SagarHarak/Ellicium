CREATE PROCEDURE [viz].[refresh_data_should_cost_anaylsis] 

(@batch_id int = 0)

AS

DECLARE @procedure_name varchar(100) = '[refresh_data_should_cost_anaylsis]' 


BEGIN TRAN [tbl_should_cost_analysis_refresh]

BEGIN TRY

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting viz.tbl_should_cost_analysis_app truncate'

TRUNCATE TABLE viz.tbl_should_cost_analysis_app;

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing viz.tbl_should_cost_analysis_app truncate'

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting viz.tbl_should_cost_analysis_app insert'

INSERT INTO viz.tbl_should_cost_analysis_app ([fiscal_year]
      ,[fiscal_month]
      ,[fiscal_date]
      ,[fiscal_year_month]
      ,[Commodity]
      ,[commodity_uom]
      ,[category]
      ,[Sub-category]
      ,[article]
      ,[article_description]
      ,[Brand_Name]
      ,[material]
      ,[color]
      ,[Count]
      ,[size]
      ,[vendor_name]
      ,[Template_URL]
      ,[country_of_origin]
      ,[cost_category_group]
      ,[cost_category]
      ,[cost_element]
      ,[Index_Ticker]
      ,[actual_cost]
      ,[should_cost]
      ,[flag_modelled_cost]
      ,[funding_pct]
      ,[Sales Quantity]
      ,[Avg Unit Retail]
      ,[forecast_anual_unit_volume]
      ,[forecast_COGS]
      ,[forecast_revenue]
      ,[commodity_value]
	  ,[filtering_id])

	SELECT [fiscal_year]
      ,[fiscal_month]
      ,[fiscal_date]
      ,[fiscal_year_month]
      ,[Commodity]
      ,[commodity_uom]
      ,[category]
      ,[Sub-category]
      ,[article]
      ,[article_description]
      ,[Brand_Name]
      ,[material]
      ,[color]
      ,[Count]
      ,[size]
      ,[vendor_name]
      ,[Template_URL]
      ,[country_of_origin]
      ,[cost_category_group]
      ,[cost_category]
      ,[cost_element]
      ,[Index_Ticker]
      ,[actual_cost]
      ,[should_cost]
      ,[flag_modelled_cost]
      ,[funding_pct]
      ,[Sales Quantity]
      ,[Avg Unit Retail]
      ,[forecast_anual_unit_volume]
      ,[forecast_COGS]
      ,[forecast_revenue]
      ,[commodity_value]
	  ,[filtering_id]
  FROM [viz].[should_cost_analysis_app]


COMMIT TRAN [tbl_should_cost_analysis_refresh]

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing viz.tbl_should_cost_analysis_app insert'

END TRY

BEGIN CATCH
 
ROLLBACK TRANSACTION [tbl_should_cost_analysis_refresh]

DECLARE         @ErrorMessage nvarchar(255)

SET                        @ErrorMessage = ERROR_MESSAGE()

EXEC [log].[log_message_detailed] @batch_id, @procedure_name, @ErrorMessage;

THROW

END CATCH