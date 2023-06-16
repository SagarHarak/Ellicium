IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'dbo')
BEGIN
EXEC('CREATE SCHEMA dbo')
END


IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'etl')
BEGIN
EXEC('CREATE SCHEMA etl')
END

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'icr')
BEGIN
EXEC('CREATE SCHEMA icr')
END

-- IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'import')
-- BEGIN
-- EXEC('CREATE SCHEMA import')
-- END

-- IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'log')
-- BEGIN
-- EXEC('CREATE SCHEMA log')
-- END

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'raw')
BEGIN
EXEC('CREATE SCHEMA raw')
END

-- IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'report')
-- BEGIN
-- EXEC('CREATE SCHEMA report')
-- END

-- IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'stg')
-- BEGIN
-- EXEC('CREATE SCHEMA stg')
-- END

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'target')
BEGIN
EXEC('CREATE SCHEMA target')
END

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'viz')
BEGIN
EXEC('CREATE SCHEMA viz')
END
