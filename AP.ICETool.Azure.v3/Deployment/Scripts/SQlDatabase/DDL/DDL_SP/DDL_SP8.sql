CREATE PROCEDURE [viz].[refresh_data_early_warning_radar]


(@batch_id int = 0)

AS

DECLARE @procedure_name varchar(100) = '[refresh_data_early_warning_radar refresh]' 


BEGIN TRAN [tbl_early_warning_radar_refresh]

BEGIN TRY

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting viz.tbl_early_warning_radar_app truncate'



TRUNCATE TABLE viz.tbl_early_warning_radar_app;

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing viz.tbl_early_warning_radar_app truncate'

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting viz.tbl_early_warning_radar_app insert'


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
      ,[latest_change_cv])

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
	  FROM viz.early_warning_radar_app

COMMIT TRAN  [tbl_early_warning_radar_refresh]

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing viz.tbl_early_warning_radar_app insert'


END TRY

BEGIN CATCH
 
ROLLBACK TRANSACTION [tbl_early_warning_radar_refresh]

DECLARE         @ErrorMessage nvarchar(255)

SET                        @ErrorMessage = ERROR_MESSAGE()

EXEC [log].[log_message_detailed] @batch_id, @procedure_name, @ErrorMessage;

THROW

END CATCH