----- Changed datatype of description column in target.dim_article table to varchar(max) on 13/12/22

IF NOT EXISTS    (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
                 WHERE     TABLE_NAME = 'dim_article' AND  
                        COLUMN_NAME = 'description' AND 
                        TABLE_SCHEMA ='target' AND 
                        CHARACTER_MAXIMUM_LENGTH = -1 AND 
                        DATA_TYPE = 'varchar')
BEGIN
    ALTER TABLE target.dim_article ALTER COLUMN description varchar(max)
END;

-- dbo.template_master
IF NOT EXISTS    (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
                 WHERE     TABLE_NAME = 'template_master' AND  
                        COLUMN_NAME = 'description' AND 
                        TABLE_SCHEMA ='dbo' AND 
                        CHARACTER_MAXIMUM_LENGTH = -1 AND 
                        DATA_TYPE = 'varchar')
BEGIN
    ALTER TABLE dbo.template_master ALTER COLUMN description varchar(max)
END;

-- Adding column category_analytics in dbo.dashboard_tableau table    17/01/22
IF NOT EXISTS    (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
                 WHERE     TABLE_NAME = 'dashboard_tableau' AND  
                        COLUMN_NAME = 'category_analytics' AND 
                        TABLE_SCHEMA ='dbo')
BEGIN
    ALTER TABLE dbo.dashboard_tableau ADD category_analytics bit NULL;
END;



