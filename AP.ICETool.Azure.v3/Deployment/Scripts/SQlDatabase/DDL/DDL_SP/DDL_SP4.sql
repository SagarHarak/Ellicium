CREATE procedure [target].[refresh_commodities_data]

@batch_id int = 0

as

BEGIN TRANSACTION [refresh_commodity_data]

BEGIN TRY

DECLARE @procedure_name varchar(100) = 'target.refresh_commodities_data'

EXEC log.log_message_detailed @batch_id,  @procedure_name,  'Starting MERGE target.dim_commodities'

MERGE target.dim_commodities as target
USING stg.dim_commodities as source
ON (target.index_ticker = source.index_ticker)
	WHEN MATCHED THEN
	UPDATE SET
	

		target.[level_1]		  =source.level_1
		,target.[level_2]		  =source.level_2
		,target.[level_3]		  =source.level_3
		,target.[description]	  =source.description
		,target.[series_specific] =source.series_specific
		,target.[index_ticker]	  =source.index_ticker
		,target.[units]			  =source.units
		,target.[level_4]		  =source.level_4
		,target.[data_source]	  =source.data_source
		,target.[created_date]	  =source.created_date
		,target.[created_by]	  =source.created_by
		,target.[updated_date]	  =source.updated_date
		,target.[updated_by]	  =source.updated_by
	
	WHEN NOT MATCHED BY TARGET THEN
	
	INSERT (
		 id
		,[level_1]		  
		,[level_2]		  
		,[level_3]		  
		,[description]	  
		,[series_specific]
		,[index_ticker]	  
		,[units]		
		,[level_4]		  
		,[data_source]	  
		,[created_date]	  
		,[created_by]	  
		,[updated_date]	  
		,[updated_by]	  
	)
	
	VALUES (
		 source.id
		,source.level_1
		,source.level_2
		,source.level_3
		,source.description
		,source.series_specific
		,source.index_ticker
		,source.units
		,source.level_4
		,source.data_source
		,source.created_date
		,source.created_by
		,source.updated_date
		,source.updated_by
	)
	
	WHEN NOT MATCHED BY SOURCE THEN
	DELETE

;

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing MERGE target.dim_commodities'

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Starting MERGE target.commodities'

MERGE target.commodities as TARGET
USING stg.commodities as source
ON(source.commodity_id = target.commodity_id and source.date = target.date)
	WHEN MATCHED THEN
	UPDATE SET	   
		   target.[commodity_id]   = source.commodity_id
	      ,target.[date]		   = source.date
	      ,target.[value]		   = source.value
	      ,target.[created_date]   = source.created_date
	      ,target.[created_by]	   = source.created_by
	      ,target.[updated_date]   = source.updated_date
	      ,target.[updated_by]	   = source.updated_by
	
	WHEN NOT MATCHED BY TARGET THEN
	INSERT
	(
	       [commodity_id]  
	      ,[date]		  
	      ,[value]		  
	      ,[created_date]  
	      ,[created_by]	  
	      ,[updated_date]  
	      ,[updated_by]	  
	)
	VALUES
	(
		   source.commodity_id
	      ,source.date
	      ,source.value
	      ,source.created_date
	      ,source.created_by
	      ,source.updated_date
	      ,source.updated_by
	)

	WHEN NOT MATCHED BY SOURCE THEN
	DELETE
;

EXEC log.log_message_detailed @batch_id, @procedure_name, 'Finishing MERGE target.commodities'

COMMIT TRAN [refresh_commodity_data]

END TRY 

BEGIN CATCH
	
	DECLARE         @ErrorMessage nvarchar(255)

	SET             @ErrorMessage = ERROR_MESSAGE()

	EXEC [log].[log_message_detailed] @batch_id, @procedure_name, @ErrorMessage;
	
	ROLLBACK TRAN [refresh_commodity_data]

END CATCH