IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'commodity_price_intelligence')
CREATE TABLE dbo.commodity_price_intelligence (
Name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Last Price] real NULL,
[Date] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Futures contract prices] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'demand_forecast')
CREATE TABLE dbo.demand_forecast (
Jan int NULL,
Feb int NULL,
Mar int NULL,
Apr int NULL,
May int NULL,
Jun int NULL,
Jul int NULL,
Aug int NULL,
Sep int NULL,
Oct int NULL,
Nov int NULL,
[Dec] int NULL,
demand_id int NULL
);


IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'demand_planning')
CREATE TABLE dbo.demand_planning (
[Grade type] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Source] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Group] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
Diameter varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Lot number] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[dbo Part] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Re-order point] real NULL,
[EOQ Quantity] real NULL,
[Max usage (daily)] real NULL,
[Avg usage (daily)] real NULL,
[Max LT (days)] int NULL,
[Avg LT (Days)] int NULL,
[Safety stock (MTs)] real NULL,
[Current Working inventory(MTs)] int NULL,
[Total On hand Inventory] real NULL,
[Quantity to be recevied from next order] real NULL,
[Order expected to arrive in: (days)] real NULL,
[Demand Forecasted Qty for current month] real NULL,
[Commodity Price trend next month] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[% of change] int NULL,
[Suggested action] varchar(256) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Recommended Order Qty(MT)] real NULL,
id int NULL
);


IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'price_prediction')
CREATE TABLE dbo.price_prediction (
Material varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Current date] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Current price] int NULL,
Horizon varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Predicted for Date] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Predicted Price ($/t)] real NULL,
[Vs Current ($/t)] int NULL,
Direction varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Upper price] real NULL,
[Lower price] real NULL
);


IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'price_trend')
CREATE TABLE dbo.price_trend (
Material varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
current_price int NULL,
[Date] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'on_hand_inventory_trend')
CREATE TABLE dbo.on_hand_inventory_trend (
Jan real NULL,
Feb real NULL,
Mar real NULL,
Apr real NULL,
May real NULL,
Jun real NULL,
Jul real NULL,
Aug real NULL,
Sep real NULL,
Oct real NULL,
Nov real NULL,
[Dec] real NULL,
demand_id int NULL
);

IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'upward_movement_probability')
CREATE TABLE dbo.upward_movement_probability (
Material varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[1 week] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[1 month] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[3 months] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[6 months] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[1 year] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'influence_chart')
CREATE TABLE dbo.influence_chart (
Material varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
Horizon varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Position] bigint NULL,
Trend real NULL,
Currency real NULL,
Curve real NULL,
Freight real NULL,
Inventory bigint NULL,
Macro real NULL,
Satellite real NULL,
Seasonality real NULL,
Price real NULL,
Weather bigint NULL
);
