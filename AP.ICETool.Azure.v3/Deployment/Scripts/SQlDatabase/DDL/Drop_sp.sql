IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'log_message_detailed'
            AND type = 'P'
      )
DROP PROCEDURE log.log_message_detailed;



IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'refresh_commodities_data'
            AND type = 'P'
      )
DROP PROCEDURE target.refresh_commodities_data;



IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'early_warning_radar_tables_resfresh'
            AND type = 'P'
      )
DROP PROCEDURE viz.early_warning_radar_tables_resfresh;


IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'should_cost_analysis_tables_resfresh'
            AND type = 'P'
      )
DROP PROCEDURE viz.should_cost_analysis_tables_resfresh;

IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'refresh_data_all_commodities'
            AND type = 'P'
      )
DROP PROCEDURE viz.refresh_data_all_commodities;



IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'refresh_data_early_warning_radar'
            AND type = 'P'
      )
DROP PROCEDURE viz.refresh_data_early_warning_radar;




IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'refresh_data_should_cost_anaylsis'
            AND type = 'P'
      )
DROP PROCEDURE viz.refresh_data_should_cost_anaylsis;


IF EXISTS (
        SELECT type_desc, type
        FROM sys.procedures WITH(NOLOCK)
        WHERE NAME = 'refresh_dashboards'
            AND type = 'P'
      )
DROP PROCEDURE viz.refresh_dashboards;






