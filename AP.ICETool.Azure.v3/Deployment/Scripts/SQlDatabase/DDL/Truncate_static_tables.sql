IF OBJECT_ID('target.dim_calendar') IS NOT NULL
TRUNCATE TABLE target.dim_calendar;

IF OBJECT_ID('target.dim_country') IS NOT NULL
TRUNCATE TABLE target.dim_country;

IF OBJECT_ID('target.dim_section') IS NOT NULL
TRUNCATE TABLE target.dim_section;

IF OBJECT_ID('etl.country_mapping') IS NOT NULL
TRUNCATE TABLE etl.country_mapping;

IF OBJECT_ID('dbo.app_config') IS NOT NULL
TRUNCATE TABLE dbo.app_config;

-- IF OBJECT_ID('target.dim_machine_library') IS NOT NULL
-- TRUNCATE TABLE target.dim_machine_library;

-- IF OBJECT_ID('target.dim_tariff') IS NOT NULL
-- TRUNCATE TABLE target.dim_tariff;

-- IF OBJECT_ID('target.tariff') IS NOT NULL
-- TRUNCATE TABLE target.tariff;



