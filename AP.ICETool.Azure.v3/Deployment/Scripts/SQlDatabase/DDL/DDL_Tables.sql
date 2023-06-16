 IF NOT EXISTS (
  SELECT TABLE_SCHEMA, TABLE_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'dbo'
  AND TABLE_NAME = 'dashboard_tableau')
CREATE TABLE [dbo].[dashboard_tableau](
	[id] [int] NOT NULL,
	[display_name] [varchar](255) NULL,
	[description] [varchar](255) NULL,
	[link] [varchar](255) NULL,
	[img_url] [varchar](255) NULL,
	[status] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[category_analytics] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'simplified_data')
CREATE TABLE [dbo].[simplified_data](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[serial_no] [varchar](250) NULL,
	[vendor] [varchar](250) NULL,
	[item_name] [varchar](250) NULL,
	[industry] [varchar](250) NULL,
	[category] [varchar](250) NULL,
	[description] [varchar](250) NULL,
	[origin] [varchar](250) NULL,
	[name] [varchar](250) NULL,
	[value] [varchar](50) NULL,
	[status] [bit] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](250) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'template_data')	 
CREATE TABLE [dbo].[template_data](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[data] [varchar](max) NULL,
	[status] [varchar](50) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[log] [varchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'template_master')
CREATE TABLE [dbo].[template_master](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[proj_id] [int] NULL,
	[country] [varchar](100) NULL,
	[category_group] [varchar](100) NULL,
	[category] [varchar](100) NULL,
	[sub_category] [varchar](100) NULL,
	[description] [varchar](MAX) NULL,
	[status] [varchar](100) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[should_cost] [decimal](18, 4) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


--etl Schema

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'etl'
 AND TABLE_NAME = 'calendar_fiscal_mapping')
CREATE TABLE [etl].[calendar_fiscal_mapping](
	[calendar_year] [int] NULL,
	[calendar_month] [int] NULL,
	[fiscal_year] [int] NULL,
	[fiscal_month] [int] NULL,
	[fiscal_year_old] [int] NULL,
	[fiscal_month_old] [int] NULL
) ON [PRIMARY]

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'etl'
 AND TABLE_NAME = 'country_mapping')
CREATE TABLE [etl].[country_mapping](
	[Country] [varchar](255) NULL,
	[Country_Normalized] [varchar](255) NULL
) ON [PRIMARY]


--icr schema


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'icr'
 AND TABLE_NAME = 'basket')
CREATE TABLE [icr].[basket](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[baseline_date] [date] NOT NULL,
 CONSTRAINT [PK_basket] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'icr'
 AND TABLE_NAME = 'basket_commodities')
CREATE TABLE [icr].[basket_commodities](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[basket_id] [int] NOT NULL,
	[commodity_id] [int] NOT NULL,
	[percentage] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_basket_commodities] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'icr'
 AND TABLE_NAME = 'dim_commodities')
CREATE TABLE [icr].[dim_commodities](
	[commodity_id] [int] NOT NULL,
	[category] [varchar](50) NOT NULL,
	[friendly_name] [varchar](50) NULL,
 CONSTRAINT [PK_icr_dim_comm] PRIMARY KEY CLUSTERED 
(
	[commodity_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


--log schema
-- IF NOT EXISTS (
--  SELECT TABLE_SCHEMA, TABLE_NAME
--  FROM INFORMATION_SCHEMA.COLUMNS
--  WHERE TABLE_SCHEMA = 'log'
--  AND TABLE_NAME = 'etl_log_detailed')
-- CREATE TABLE [log].[etl_log_detailed](
-- 	[id] [bigint] IDENTITY(1,1) NOT NULL,
-- 	[batch_id] [bigint] NULL,
-- 	[created_at] [datetime] NOT NULL,
-- 	[created_by] [varchar](50) NULL,
-- 	[procedure_name] [varchar](100) NULL,
-- 	[message] [nvarchar](max) NOT NULL,
--  CONSTRAINT [PK_ETL_log_Detailed] PRIMARY KEY CLUSTERED 
-- (
-- 	[id] ASC
-- )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
-- ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



--raw schema
IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'raw'
 AND TABLE_NAME = 'vendor_bid_costs')
CREATE TABLE [raw].[vendor_bid_costs](
	[Vendor_ID] [nvarchar](max) NULL,
	[Vendor_Name] [nvarchar](max) NULL,
	[Item_Code] [nvarchar](max) NULL,
	[Vendor_ID_Item_Code] [nvarchar](max) NULL,
	[Rep_Sku] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Program] [nvarchar](max) NULL,
	[Sub_Department] [nvarchar](max) NULL,
	[Incumbent_for_this_line_item_Y_N] [nvarchar](max) NULL,
	[Quotation_Type] [nvarchar](max) NULL,
	[Vendor_ID_Program] [nvarchar](max) NULL,
	[Factory_Name] [nvarchar](max) NULL,
	[Country_of_Origin_Full_Name] [nvarchar](max) NULL,
	[Port_of_Export_Full_Name] [nvarchar](max) NULL,
	[HTS_Code] [nvarchar](max) NULL,
	[Case_Length_Inches] [nvarchar](max) NULL,
	[Case_Height_Inches] [nvarchar](max) NULL,
	[Case_Width_Inches] [nvarchar](max) NULL,
	[Case_Weight_lbs] [nvarchar](max) NULL,
	[Case_Units_per_40_Container] [nvarchar](max) NULL,
	[Case_units_per_53_Trailer_palletized] [nvarchar](max) NULL,
	[raw_Materials_Composition] [nvarchar](max) NULL,
	[raw_Material_Cost_R] [nvarchar](max) NULL,
	[Scrap_Cost_S] [nvarchar](max) NULL,
	[Machine_Cost_C] [nvarchar](max) NULL,
	[Labor_Cost_L] [nvarchar](max) NULL,
	[Utilities_Cost_U] [nvarchar](max) NULL,
	[Packaging_Cost_P] [nvarchar](max) NULL,
	[Factory_Overhead_and_Margin_O] [nvarchar](max) NULL,
	[Dead_Net_FOB_at_Port_Unit_Cost_USD_FOB_Materials_Labor_Packaging_Overhead_Margin] [nvarchar](max) NULL,
	[Duty_Rate_with_tariffs] [nvarchar](max) NULL,
	[Duty_D] [nvarchar](max) NULL,
	[Agency_Fee_Only_if_you_are_an_agent] [nvarchar](max) NULL,
	[Agency_Fee] [nvarchar](max) NULL,
	[Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F] [nvarchar](max) NULL,
	[Supplier_Margin_Mark_up_M] [nvarchar](max) NULL,
	[Dead_Net_Landed_Unit_Cost_USD_FOB_Duty_Freight_Markup_COLLECT] [nvarchar](max) NULL,
	[US_Domestic_Prepaid_Freight_T] [nvarchar](max) NULL,
	[Supplier_Margin_Mark_up_G] [nvarchar](max) NULL,
	[Dead_Net_Landed_Unit_Cost_USD_Collect_Freight_PREPAID] [nvarchar](max) NULL,
	[PO_Landed_Unit_Cost_USD_FOB_Duty_Freight_Markup] [nvarchar](max) NULL,
	[Location_US_domestic_distribution_centers] [nvarchar](max) NULL,
	[Comments] [nvarchar](max) NULL,
	[Alternate_Prod_Description] [nvarchar](max) NULL,
	[Key_difference_from_original_spec] [nvarchar](max) NULL,
	[FOB_Unit_Cost] [nvarchar](max) NULL,
	[US_Domestic_Unit_Cost_USD] [nvarchar](max) NULL,
	[Quality_Rating_Comparable_Higher_Lower] [nvarchar](max) NULL,
	[Comments2] [nvarchar](max) NULL,
	[Standardized_Duty_Rate_with_tariffs] [nvarchar](max) NULL,
	[Standardized_Case_Length_Inches] [nvarchar](max) NULL,
	[Standardized_Case_Height_Inches] [nvarchar](max) NULL,
	[Standardized_Case_Width_Inches] [nvarchar](max) NULL,
	[Standardized_Case_Weight_lbs] [nvarchar](max) NULL,
	[Standardized_Case_Units_per_40_Container] [nvarchar](max) NULL,
	[Did_Item_Incumbent_Increased_Price] [nvarchar](max) NULL,
	[Incumbent_HTS] [nvarchar](max) NULL,
	[Standardized_Duty] [nvarchar](max) NULL,
	[Standardized_Tariff] [nvarchar](max) NULL,
	[Landing_Tool_Duty_Tariff_Cost] [nvarchar](max) NULL,
	[Landing_Tool_logistics_Cost] [nvarchar](max) NULL,
	[Estimated_DNL_Cost] [nvarchar](max) NULL,
	[Final_DNL_Cost] [nvarchar](max) NULL,
	[DNL_Reduction] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



--stg schema


-- IF NOT EXISTS (
--  SELECT TABLE_SCHEMA, TABLE_NAME
--  FROM INFORMATION_SCHEMA.COLUMNS
--  WHERE TABLE_SCHEMA = 'stg'
--  AND TABLE_NAME = 'commodities')
-- CREATE TABLE [stg].[commodities](
-- 	[commodity_id] [int] NOT NULL,
-- 	[date] [date] NOT NULL,
-- 	[value] [numeric](20, 8) NULL,
-- 	[created_date] [date] NULL,
-- 	[created_by] [varchar](100) NULL,
-- 	[updated_date] [date] NULL,
-- 	[updated_by] [varchar](100) NULL,
-- PRIMARY KEY CLUSTERED 
-- (
-- 	[date] ASC,
-- 	[commodity_id] ASC
-- )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
-- ) ON [PRIMARY]


-- IF NOT EXISTS (
--  SELECT TABLE_SCHEMA, TABLE_NAME
--  FROM INFORMATION_SCHEMA.COLUMNS
--  WHERE TABLE_SCHEMA = 'stg'
--  AND TABLE_NAME = 'dim_commodities')
-- CREATE TABLE [stg].[dim_commodities](
-- 	[id] [int] NOT NULL,
-- 	[level_1] [varchar](255) NOT NULL,
-- 	[level_2] [varchar](255) NOT NULL,
-- 	[level_3] [varchar](255) NOT NULL,
-- 	[description] [varchar](255) NOT NULL,
-- 	[series_specific] [varchar](255) NULL,
-- 	[index_ticker] [varchar](255) NOT NULL,
-- 	[units] [varchar](255) NOT NULL,
-- 	[level_4] [varchar](255) NULL,
-- 	[data_source] [varchar](50) NULL,
-- 	[created_date] [date] NULL,
-- 	[created_by] [varchar](100) NULL,
-- 	[updated_date] [date] NULL,
-- 	[updated_by] [varchar](100) NULL,
--  CONSTRAINT [PK_commodities_id] PRIMARY KEY CLUSTERED 
-- (
-- 	[id] ASC
-- )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
--  CONSTRAINT [UQ_index_ticker] UNIQUE NONCLUSTERED 
-- (
-- 	[index_ticker] ASC
-- )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
-- ) ON [PRIMARY]





--target
IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'baseline_costs')
CREATE TABLE [target].[baseline_costs](
	[fiscal_year] [int] NULL,
	[fiscal_month] [int] NULL,
	[article] [varchar](50) NULL,
	[country_of_origin] [varchar](50) NULL,
	[merchant_cat_id] [int] NULL,
	[vendor_id] [int] NULL,
	[cost] [decimal](38, 6) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[old_price] [decimal](20, 8) NULL
) ON [PRIMARY]




IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'commodities')
CREATE TABLE [target].[commodities](
	[commodity_id] [int] NOT NULL,
	[date] [date] NOT NULL,
	[value] [numeric](20, 8) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_target_comm] PRIMARY KEY CLUSTERED 
(
	[commodity_id] ASC,
	[date] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'cost_estimation_formula')
CREATE TABLE [target].[cost_estimation_formula](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[section_id] [int] NULL,
	[subsection_id] [int] NULL,
	[formula_name] [varchar](100) NULL,
	[formula] [varchar](1025) NULL,
	[value] [decimal](18, 4) NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[subsection_final_formula] [int] NULL,
	[element_id] [int] NULL,
	[items_names] [varchar](250) NULL,
	[subsection_formula] [int] NULL,
 CONSTRAINT [PK_cost_est_formula_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'cost_estimation_summary')
CREATE TABLE [target].[cost_estimation_summary](
	[section_id] [int] NOT NULL,
	[subsection_id] [int] NULL,
	[index_ticker] [varchar](255) NOT NULL,
	[value] [decimal](18, 5) NOT NULL,
	[fiscal_year] [int] NOT NULL,
	[fiscal_month] [int] NOT NULL,
	[project_id] [int] NULL,
	[simplified_project_id] [int] NULL,
	[date] [date] NULL
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_article')
CREATE TABLE [target].[dim_article](
	[id] [varchar](50) NOT NULL,
	[description] [varchar](MAX) NULL,
	[unique_sc] [bit] NULL,
	[material] [varchar](50) NULL,
	[size] [varchar](20) NULL,
	[count] [int] NULL,
	[color] [varchar](50) NULL,
	[listing_status] [bit] NULL,
	[vendor] [int] NULL,
	[vendor_name] [varchar](100) NULL,
	[ah3] [varchar](50) NULL,
	[category_ah4] [varchar](50) NULL,
	[subcategory_ah5] [varchar](50) NULL,
	[details_ah6] [varchar](50) NULL,
	[brand_name] [varchar](100) NULL,
	[in_scope] [bit] NULL,
	[template_url] [varchar](255) NULL,
	[units_per_case] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_article_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_calendar')
CREATE TABLE [target].[dim_calendar](
	[id] [int] NOT NULL,
	[date] [date] NULL,
	[calendar_year] [int] NULL,
	[calendar_month] [int] NULL,
	[calendar_month_name] [varchar](50) NULL,
	[calendar_month_first_day] [date] NULL,
	[fiscal_year] [int] NULL,
	[fiscal_quarter] [varchar](50) NULL,
	[fiscal_month] [int] NULL,
	[fiscal_week] [int] NULL,
	[fiscal_month_first_date] [date] NULL,
	[fiscal_year_label] [varchar](10) NULL,
	[day_of_week] [varchar](50) NULL,
 CONSTRAINT [PK_target_dim_calendar] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_commodities')
CREATE TABLE [target].[dim_commodities](
	[id] [int] NOT NULL,
	[level_1] [varchar](255) NOT NULL,
	[level_2] [varchar](255) NOT NULL,
	[level_3] [varchar](255) NOT NULL,
	[description] [varchar](255) NOT NULL,
	[series_specific] [varchar](255) NULL,
	[index_ticker] [varchar](255) NOT NULL,
	[units] [varchar](255) NOT NULL,
	[level_4] [varchar](255) NULL,
	[data_source] [varchar](50) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_commodities_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_index_ticker] UNIQUE NONCLUSTERED 
(
	[index_ticker] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_conversion_library')
CREATE TABLE [target].[dim_conversion_library](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[country] [varchar](100) NULL,
	[industry] [varchar](100) NULL,
	[application] [varchar](100) NULL,
	[name] [varchar](100) NULL,
	[process] [varchar](100) NULL,
	[description] [varchar](255) NULL,
	[value_final] [decimal](18, 6) NULL,
	[uom] [varchar](50) NULL,
	[comments] [varchar](255) NULL,
	[data_source] [varchar](50) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_conv_lib_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]




IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_commodities')
CREATE TABLE [target].[dim_cost_estimation_commodities](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[subsection_id] [int] NULL,
	[variable_name] [varchar](255) NULL,
	[value] [decimal](18, 2) NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[section_id] [int] NULL,
	[commodities_id] [int] NULL,
	[uom] [varchar](100) NULL,
	[lookup_name] [varchar](255) NULL,
 CONSTRAINT [PK_dim_cost_est_comm_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_conversion')
CREATE TABLE [target].[dim_cost_estimation_conversion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[section_id] [int] NULL,
	[subsection_id] [int] NULL,
	[conversion_library_id] [int] NOT NULL,
	[adjusted_value] [decimal](18, 4) NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[variable_name] [varchar](255) NULL,
	[uom] [varchar](20) NULL,
	[value] [decimal](18, 4) NULL,
	[lookup_name] [varchar](255) NULL,
 CONSTRAINT [PK_dim_cost_est_conv_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_machine')
CREATE TABLE [target].[dim_cost_estimation_machine](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[section_id] [int] NULL,
	[subsection_id] [int] NULL,
	[machine_library_id] [int] NOT NULL,
	[machine_library_field] [varchar](100) NOT NULL,
	[variable_name] [varchar](100) NULL,
	[adjusted_value] [decimal](18, 5) NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[uom] [varchar](20) NULL,
	[value] [decimal](18, 4) NULL,
 CONSTRAINT [PK_dim_cost_est_mach_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_tariff')
CREATE TABLE [target].[dim_cost_estimation_tariff](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[section_id] [int] NULL,
	[subsection_id] [int] NULL,
	[tariff_id] [int] NULL,
	[variable_name] [varchar](20) NOT NULL,
	[value] [decimal](18, 4) NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[uom] [varchar](20) NULL,
	[adjusted_value] [decimal](18, 4) NULL,
	[lookup_name] [varchar](255) NULL,
 CONSTRAINT [PK_dim_cost_est_tariff_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_structure')
CREATE TABLE [target].[dim_cost_structure](
	[cost_category_group] [varchar](100) NULL,
	[cost_category] [varchar](100) NULL,
	[cost_subcategory] [varchar](100) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_country')
CREATE TABLE [target].[dim_country](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[iso2] [varchar](2) NULL,
 CONSTRAINT [PK_dim_contry_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_element')
CREATE TABLE [target].[dim_element](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[name] [varchar](100) NOT NULL,
	[internal_order] [int] NOT NULL,
	[packaging_flag] [bit] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_element_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_machine_library')
CREATE TABLE [target].[dim_machine_library](
	[id] [int] NOT NULL,
	[name] [nvarchar](100) NULL,
	[details] [nvarchar](255) NULL,
	[country] [nvarchar](50) NULL,
	[application] [nvarchar](255) NULL,
	[machine_cost] [decimal](10, 2) NULL,
	[lifespan] [decimal](5, 2) NULL,
	[throughput_minute] [decimal](10, 2) NULL,
	[energy_consumption_Kwh] [decimal](10, 2) NULL,
	[operator_FTEs_per_line] [decimal](6, 2) NULL,
	[supervisor_FTE_per_line] [decimal](6, 2) NULL,
	[scrap] [decimal](4, 2) NULL,
	[attribute] [varchar](50) NULL,
	[hours_per_day] [decimal](4, 2) NULL,
	[days_per_week] [decimal](4, 2) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [nvarchar](100) NULL,
 CONSTRAINT [PK_dim_machine_library_sweet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_project')
CREATE TABLE [target].[dim_project](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NULL,
	[article_id] [varchar](50) NOT NULL,
	[country] [varchar](100) NOT NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[status] [varchar](30) NULL,
	[industry] [varchar](250) NULL,
	[application] [varchar](250) NULL,
	[parent_project_id] [int] NULL,
	[project_code] [varchar](100) NULL,
	[parent_project_code] [varchar](100) NULL,
	[is_final] [bit] NULL,
 CONSTRAINT [PK_dim_project_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_project_cost_details')
CREATE TABLE [target].[dim_project_cost_details](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NULL,
	[element_id] [int] NULL,
	[section_id] [int] NULL,
	[subsection_id] [int] NULL,
	[type_id] [int] NULL,
	[tb_id] [int] NULL,
	[variable_name] [varchar](200) NULL,
	[value] [decimal](18, 4) NULL,
	[adjusted_value] [decimal](18, 4) NULL,
	[uom] [varchar](50) NULL,
	[index_spec] [varchar](200) NULL,
	[comments] [varchar](200) NULL,
	[final_formula] [int] NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
	[is_packaging] [int] NULL,
	[formula] [varchar](1025) NULL,
	[tb_ref_id] [int] NULL,
	[items_names] [varchar](250) NULL,
	[subsection_formula] [int] NULL,
	[should_cost] [decimal](18, 4) NULL,
	[linked_sku] [int] NULL,
 CONSTRAINT [PK_dim_project_cost_details_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_section')
CREATE TABLE [target].[dim_section](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_section_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_spec_material')
CREATE TABLE [target].[dim_spec_material](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[element_id] [int] NOT NULL,
	[specification] [varchar](50) NOT NULL,
	[uom] [varchar](50) NULL,
	[additional_description] [varchar](100) NULL,
	[internal_order] [int] NULL,
	[variable_name] [varchar](50) NULL,
	[value] [decimal](18, 4) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[udpated_date] [date] NULL,
	[udpated_by] [varchar](100) NULL,
	[subsection_id] [int] NULL,
 CONSTRAINT [PK_dim_spec_material_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_subsection')
CREATE TABLE [target].[dim_subsection](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[element_id] [int] NOT NULL,
	[section_id] [int] NOT NULL,
	[name] [varchar](255) NOT NULL,
	[internal_order] [int] NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_subsection_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_tariff')
CREATE TABLE [target].[dim_tariff](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[level_1] [varchar](500) NOT NULL,
	[level_2] [varchar](500) NOT NULL,
	[level_3] [varchar](500) NOT NULL,
	[level_4] [varchar](500) NOT NULL,
	[level_5] [varchar](500) NOT NULL,
	[level_6] [varchar](500) NOT NULL,
	[description] [varchar](500) NOT NULL,
	[hts_code] [varchar](10) NOT NULL,
	[country] [varchar](100) NOT NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_tariff_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_type')
CREATE TABLE [target].[dim_type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](10) NOT NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_dim_type_id] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_vendor')
CREATE TABLE [target].[dim_vendor](
	[id] [int] NOT NULL,
	[name] [nvarchar](50) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
 CONSTRAINT [PK_target_dim_vendor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'forecast')
CREATE TABLE [target].[forecast](
	[fiscal_year] [int] NOT NULL,
	[article] [varchar](50) NOT NULL,
	[forecast_qty] [int] NULL,
	[forecast_cogs] [decimal](18, 2) NULL,
	[forecast_revenue] [decimal](18, 2) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
 CONSTRAINT [PK_target_forecast] PRIMARY KEY CLUSTERED 
(
	[fiscal_year] ASC,
	[article] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'retail_aur')
CREATE TABLE [target].[retail_aur](
	[fiscal_year] [int] NOT NULL,
	[fiscal_month] [nvarchar](50) NOT NULL,
	[article] [varchar](50) NOT NULL,
	[article_description] [varchar](100) NULL,
	[sales_quantity] [int] NULL,
	[avg_unit_retail] [decimal](38, 6) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
 CONSTRAINT [PK_target_retail_aur] PRIMARY KEY CLUSTERED 
(
	[fiscal_year] ASC,
	[fiscal_month] ASC,
	[article] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'tariff')
CREATE TABLE [target].[tariff](
	[date] [date] NOT NULL,
	[tariff_id] [int] NOT NULL,
	[value] [decimal](18, 4) NULL,
	[created_date] [date] NULL,
	[created_by] [varchar](100) NULL,
	[updated_date] [date] NULL,
	[updated_by] [varchar](100) NULL,
 CONSTRAINT [PK_target_tariff] PRIMARY KEY CLUSTERED 
(
	[date] ASC,
	[tariff_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'vendor_funding')
CREATE TABLE [target].[vendor_funding](
	[fiscal_year] [int] NOT NULL,
	[fiscal_month] [varchar](4) NOT NULL,
	[vendor_id] [int] NOT NULL,
	[vendor_name] [varchar](100) NULL,
	[funding_pct] [decimal](18, 8) NOT NULL,
	[created_date] [datetime] NULL,
	[created_by] [varchar](100) NULL,
 CONSTRAINT [PK_target_vendor_funding] PRIMARY KEY CLUSTERED 
(
	[fiscal_year] ASC,
	[fiscal_month] ASC,
	[vendor_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


--viz Schema

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_all_commodities_data')
 CREATE TABLE [viz].[tbl_all_commodities_data](
	[Date] [date] NULL,
	[fiscal_year] [int] NULL,
	[fiscal_month] [int] NULL,
	[Commodity_Id] [int] NULL,
	[Segment] [varchar](255) NULL,
	[Commodity] [varchar](255) NULL,
	[Details] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
	[series_specific] [varchar](255) NULL,
	[Index_Ticker] [varchar](255) NOT NULL,
	[Units] [varchar](255) NULL,
	[Country] [varchar](255) NULL,
	[value] [numeric](20, 8) NULL
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_early_warning_radar_app')
CREATE TABLE [viz].[tbl_early_warning_radar_app](
	[fiscal_year] [int] NULL,
	[fiscal_month] [int] NULL,
	[fiscal_year_month] [int] NULL,
	[fiscal_date] [date] NULL,
	[Commodity] [varchar](255) NOT NULL,
	[category] [varchar](50) NULL,
	[Sub-Category] [varchar](50) NULL,
	[article] [int] NULL,
	[vendor_name] [varchar](100) NULL,
	[Brand_Name] [varchar](100) NULL,
	[brand_category] [varchar](3) NOT NULL,
	[country_of_origin] [varchar](100) NULL,
	[Index_Ticker] [varchar](255) NOT NULL,
	[commodity_value] [numeric](20, 8) NULL,
	[commodity_uom] [varchar](255) NULL,
	[actual_cost] [float] NULL,
	[should_cost] [numeric](38, 6) NULL,
	[forecast_anual_unit_volume] [int] NULL,
	[po_cost] [float] NULL,
	[exposure] [numeric](38, 6) NULL,
	[latest_change_fiscal_date] [date] NULL,
	[latest_change_cv] [numeric](20, 8) NULL,
	[filtering_id] [varchar](255) NULL
) ON [PRIMARY]


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_should_cost_analysis_app')
CREATE TABLE [viz].[tbl_should_cost_analysis_app](
	[fiscal_year] [int] NULL,
	[fiscal_month] [int] NULL,
	[fiscal_date] [date] NULL,
	[fiscal_year_month] [varchar](10) NULL,
	[Commodity] [varchar](255) NULL,
	[commodity_uom] [varchar](255) NULL,
	[category] [varchar](50) NULL,
	[Sub-Category] [varchar](50) NULL,
	[article] [int] NULL,
	[article_description] [varchar](100) NULL,
	[Brand_Name] [varchar](100) NULL,
	[material] [varchar](50) NULL,
	[color] [varchar](50) NULL,
	[Count] [int] NULL,
	[size] [varchar](20) NULL,
	[vendor_name] [varchar](100) NULL,
	[Template_URL] [varchar](255) NULL,
	[country_of_origin] [varchar](100) NULL,
	[cost_category_group] [int] NULL,
	[cost_category] [varchar](100) NULL,
	[cost_element] [varchar](255) NULL,
	[Index_Ticker] [varchar](255) NULL,
	[actual_cost] [float] NULL,
	[should_cost] [numeric](38, 6) NULL,
	[flag_modelled_cost] [int] NOT NULL,
	[funding_pct] [decimal](18, 8) NULL,
	[Sales Quantity] [int] NULL,
	[Avg Unit Retail] [decimal](38, 6) NULL,
	[forecast_anual_unit_volume] [int] NULL,
	[forecast_COGS] [decimal](18, 2) NULL,
	[forecast_revenue] [decimal](18, 2) NULL,
	[commodity_value] [numeric](20, 8) NULL,
	[filtering_id] [varchar](255) NULL
) ON [PRIMARY]

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_should_cost_analysis_excel')
CREATE TABLE [viz].[tbl_should_cost_analysis_excel](
    [fiscal_year] [int] NULL,
    [fiscal_month] [int] NULL,
    [fiscal_date] [date] NULL,
    [fiscal_year_month] [varchar](10) NULL,
    [Commodity] [varchar](255) NULL,
    [commodity_uom] [varchar](255) NULL,
    [category] [varchar](50) NULL,
    [Sub-Category] [varchar](50) NULL,
    [article] [varchar](50) NULL,
    [article_description] [varchar](100) NULL,
    [Brand_Name] [varchar](100) NULL,
    [material] [varchar](50) NULL,
    [color] [varchar](50) NULL,
    [Count] [int] NULL,
    [size] [varchar](20) NULL,
    [vendor_name] [varchar](100) NULL,
    [Template_URL] [varchar](255) NULL,
    [country_of_origin] [varchar](100) NULL,
    [cost_category_group] [varchar](100) NULL,
    [cost_category] [varchar](100) NULL,
    [cost_element] [varchar](255) NULL,
    [Index_Ticker] [varchar](255) NULL,
    [actual_cost] [decimal](38, 6) NULL,
    [should_cost] [numeric](38, 6) NULL,
    [flag_modelled_cost] [int] NOT NULL,
    [funding_pct] [decimal](18, 8) NULL,
    [Sales Quantity] [int] NULL,
    [Avg Unit Retail] [decimal](38, 6) NULL,
    [forecast_anual_unit_volume] [int] NULL,
    [forecast_COGS] [decimal](18, 2) NULL,
    [forecast_revenue] [decimal](18, 2) NULL,
    [commodity_value] [numeric](20, 8) NULL,
    [filtering_id] [varchar](255) NULL
) ON [PRIMARY]



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_early_warning_radar_excel')
CREATE TABLE [viz].[tbl_early_warning_radar_excel](
    [fiscal_year] [int] NULL,
    [fiscal_month] [int] NULL,
    [fiscal_year_month] [int] NULL,
    [fiscal_date] [date] NULL,
    [Commodity] [varchar](255) NOT NULL,
    [category] [varchar](50) NULL,
    [Sub-Category] [varchar](50) NULL,
    [article] [varchar](50) NULL,
    [vendor_name] [varchar](100) NULL,
    [Brand_Name] [varchar](100) NULL,
    [brand_category] [varchar](3) NOT NULL,
    [country_of_origin] [varchar](100) NULL,
    [Index_Ticker] [varchar](255) NULL,
    [commodity_value] [numeric](20, 8) NULL,
    [commodity_uom] [varchar](255) NULL,
    [actual_cost] [decimal](38, 6) NULL,
    [should_cost] [numeric](38, 6) NULL,
    [forecast_anual_unit_volume] [int] NULL,
    [po_cost] [decimal](38, 6) NULL,
    [exposure] [numeric](38, 6) NULL,
    [latest_change_fiscal_date] [date] NULL,
    [latest_change_cv] [numeric](20, 8) NULL,
    [filtering_id] [varchar](255) NULL
) ON [PRIMARY]




IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'app_config')CREATE TABLE dbo.app_config (
	id int IDENTITY(1,1) NOT NULL,
	config_path varchar(MAX) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NOT NULL,
	config_type varchar(255) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL,
	route_category varchar(255) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL,
	config_label varchar(255) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL,
	config_icon varchar(255) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL,
	is_active bit NULL,
	config_category_order int NULL,
	CONSTRAINT PK__app_conf__3213E83F47D0313A PRIMARY KEY (id)
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_powerbi')CREATE TABLE target.dim_powerbi (
	report_name varchar(100) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL,
	report_id varchar(100) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL,
	workspace_id varchar(100) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NULL
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'RFI_users')CREATE TABLE dbo.RFI_users (
	id int IDENTITY(1,1) NOT NULL,
	email_id varchar(100) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NOT NULL,
	oid varchar(100) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NOT NULL,
	CONSTRAINT PK__tbl_comp__3213E83F81CB445l PRIMARY KEY (id)
);