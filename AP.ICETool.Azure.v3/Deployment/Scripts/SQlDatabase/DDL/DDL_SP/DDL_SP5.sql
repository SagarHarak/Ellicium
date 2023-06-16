CREATE PROCEDURE [viz].[refresh_dashboards] AS
 
 EXEC [viz].[refresh_data_should_cost_anaylsis]

 EXEC [viz].[refresh_data_early_warning_radar]