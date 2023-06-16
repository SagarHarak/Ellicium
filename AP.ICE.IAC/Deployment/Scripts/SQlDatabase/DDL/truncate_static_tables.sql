IF OBJECT_ID('target.commodities') IS NOT NULL
TRUNCATE TABLE target.commodities;

IF OBJECT_ID('target.dim_calendar') IS NOT NULL
TRUNCATE TABLE target.dim_calendar;

IF OBJECT_ID('target.dim_commodities') IS NOT NULL
TRUNCATE TABLE target.dim_commodities;

IF OBJECT_ID('target.dim_conversion_library') IS NOT NULL
TRUNCATE TABLE target.dim_conversion_library;

IF OBJECT_ID('target.dim_machine_library') IS NOT NULL
TRUNCATE TABLE target.dim_machine_library;

IF OBJECT_ID('target.dim_tariff') IS NOT NULL
TRUNCATE TABLE target.dim_tariff;

IF OBJECT_ID('target.tariff') IS NOT NULL
TRUNCATE TABLE target.tariff;

