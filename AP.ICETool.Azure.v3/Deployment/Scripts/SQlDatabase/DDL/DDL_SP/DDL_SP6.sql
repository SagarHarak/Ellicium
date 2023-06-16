CREATE PROCEDURE [viz].[refresh_data_all_commodities] 

(@batch_id int = 0)

AS

DECLARE @procedure_name varchar(100) = '[refresh_data_should_cost_anaylsis]' 


BEGIN TRAN [tbl_should_cost_analysis_refresh]

BEGIN TRY

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting viz.tbl_all_commodities_data truncate'

TRUNCATE TABLE viz.tbl_all_commodities_data;

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing viz.tbl_all_commodities_data truncate'

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting viz.tbl_all_commodities_data insert'

INSERT INTO viz.tbl_all_commodities_data 
(
[Date]
      ,[fiscal_year]
      ,[fiscal_month]
      ,[Commodity_Id]
      ,[Segment]
      ,[Commodity]
      ,[Details]
      ,[Description]
      ,[series_specific]
      ,[Index_Ticker]
      ,[Units]
      ,[Country]
      ,[value]
)

	SELECT [Date]
      ,[fiscal_year]
      ,[fiscal_month]
      ,[Commodity_Id]
      ,[Segment]
      ,[Commodity]
      ,[Details]
      ,[Description]
      ,[series_specific]
      ,[Index_Ticker]
      ,[Units]
      ,[Country]
      ,[value]
  FROM [viz].[all_commodities_data]


COMMIT TRAN [tbl_should_cost_analysis_refresh]

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing viz.tbl_all_commodities_data insert'

END TRY

BEGIN CATCH
 
ROLLBACK TRANSACTION [tbl_should_cost_analysis_refresh]

DECLARE         @ErrorMessage nvarchar(255)

SET                        @ErrorMessage = ERROR_MESSAGE()

EXEC [log].[log_message_detailed] @batch_id, @procedure_name, @ErrorMessage;

THROW

END CATCH
