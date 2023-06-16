-- IF NOT EXISTS (
--  SELECT TABLE_SCHEMA, TABLE_NAME
--  FROM INFORMATION_SCHEMA.COLUMNS
--  WHERE TABLE_SCHEMA = 'dbo'
--  AND TABLE_NAME = 'articles')
-- CREATE TABLE dashboard_tableau.dbo.dashboard_tableau (
-- 	id int NOT NULL,
-- 	display_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
-- 	description varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
-- 	link varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
-- 	img_url varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
-- 	status int NULL,
-- 	created_date date NULL,
-- 	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
-- 	updated_date date NULL,
-- 	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
-- 	CONSTRAINT PK__dashboar__3213E83F5668AACE PRIMARY KEY (id)
-- );


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'simplified_data')
CREATE TABLE dbo.simplified_data (
	id int IDENTITY(1,1) NOT NULL,
	serial_no varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	vendor varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	item_name varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	industry varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	description varchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	origin varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	name varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	status int NULL,
	created_date date NULL,
	created_by varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date datetime NULL,
	updated_by varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cron_id varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__simplifi__3213E83FB70D4E8B PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'template_data')	 
CREATE TABLE dbo.template_data (
	id int IDENTITY(1,1) NOT NULL,
	[data] varchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	status varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	log varchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__template__3213E83FFEF27D5C PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'dbo'
 AND TABLE_NAME = 'template_master')
CREATE TABLE dbo.template_master (
	id int IDENTITY(1,1) NOT NULL,
	proj_id int NULL,
	country varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category_group varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sub_category varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	description varchar(2000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	status varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	should_cost decimal(18,2) NULL,
	CONSTRAINT PK__template__3213E83F58A897E6 PRIMARY KEY (id),
	
);


--etl Schema

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'etl'
 AND TABLE_NAME = 'calendar_fiscal_mapping')
CREATE TABLE etl.calendar_fiscal_mapping (
	calendar_year int NULL,
	calendar_month int NULL,
	fiscal_year int NULL,
	fiscal_month int NULL
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'etl'
 AND TABLE_NAME = 'country_mapping')
CREATE TABLE etl.country_mapping (
	Country varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Country_Normalized varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


--icr schema


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'icr'
 AND TABLE_NAME = 'basket')
CREATE TABLE icr.basket (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	baseline_date date NOT NULL,
	CONSTRAINT PK_basket PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'icr'
 AND TABLE_NAME = 'basket_commodities')
CREATE TABLE icr.basket_commodities (
	id int IDENTITY(1,1) NOT NULL,
	basket_id int NOT NULL,
	commodity_id int NOT NULL,
	percentage decimal(18,2) NOT NULL,
	CONSTRAINT PK_basket_commodities PRIMARY KEY (id)
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'icr'
 AND TABLE_NAME = 'dim_commodities')
CREATE TABLE icr.dim_commodities (
	commodity_id int NOT NULL,
	category varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	friendly_name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


--log schema
IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'log'
 AND TABLE_NAME = 'etl_log_detailed')
CREATE TABLE log.etl_log_detailed (
	id bigint IDENTITY(1,1) NOT NULL,
	batch_id bigint NULL,
	created_at datetime NOT NULL,
	created_by varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	procedure_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	message nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK_ETL_Log_Detailed PRIMARY KEY (id)
);



--raw schema
IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'raw'
 AND TABLE_NAME = 'vendor_bid_costs')
CREATE TABLE raw.vendor_bid_costs (
	Vendor_ID nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Vendor_Name nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Item_Code nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Vendor_ID_Item_Code nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Rep_Sku nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Program nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Sub_Department nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Incumbent_for_this_line_item_Y_N nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Quotation_Type nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Vendor_ID_Program nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Factory_Name nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Country_of_Origin_Full_Name nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Port_of_Export_Full_Name nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	HTS_Code nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Case_Length_Inches nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Case_Height_Inches nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Case_Width_Inches nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Case_Weight_lbs nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Case_Units_per_40_Container nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Case_units_per_53_Trailer_palletized nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Raw_Materials_Composition nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Raw_Material_Cost_R nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Scrap_Cost_S nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Machine_Cost_C nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Labor_Cost_L nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Utilities_Cost_U nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Packaging_Cost_P nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Factory_Overhead_and_Margin_O nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Dead_Net_FOB_at_Port_Unit_Cost_USD_FOB_Materials_Labor_Packaging_Overhead_Margin nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Duty_Rate_with_tariffs nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Duty_D nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Agency_Fee_Only_if_you_are_an_agent nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Agency_Fee nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Supplier_Margin_Mark_up_M nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Dead_Net_Landed_Unit_Cost_USD_FOB_Duty_Freight_Markup_COLLECT nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	US_Domestic_Prepaid_Freight_T nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Supplier_Margin_Mark_up_G nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Dead_Net_Landed_Unit_Cost_USD_Collect_Freight_PREPAID nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	PO_Landed_Unit_Cost_USD_FOB_Duty_Freight_Markup nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Location_US_domestic_distribution_centers nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Comments nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Alternate_Prod_Description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Key_difference_from_original_spec nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	FOB_Unit_Cost nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	US_Domestic_Unit_Cost_USD nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Quality_Rating_Comparable_Higher_Lower nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Comments2 nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Duty_Rate_with_tariffs nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Case_Length_Inches nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Case_Height_Inches nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Case_Width_Inches nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Case_Weight_lbs nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Case_Units_per_40_Container nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Did_Item_Incumbent_Increased_Price nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Incumbent_HTS nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Duty nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Standardized_Tariff nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Landing_Tool_Duty_Tariff_Cost nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Landing_Tool_Logistics_Cost nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Estimated_DNL_Cost nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Final_DNL_Cost nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	DNL_Reduction nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);



--stg schema


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'stg'
 AND TABLE_NAME = 'commodities')
CREATE TABLE stg.commodities (
	commodity_id int NOT NULL,
	[date] date NOT NULL,
	value numeric(20,8) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__commodit__BD632EE82E01ED2F PRIMARY KEY ([date],commodity_id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'stg'
 AND TABLE_NAME = 'dim_commodities')
CREATE TABLE stg.dim_commodities (
	id int NOT NULL,
	level_1 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_2 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_3 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	series_specific varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	index_ticker varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	units varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_4 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	data_source varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_commodities_id PRIMARY KEY (id),
	CONSTRAINT UQ_index_ticker UNIQUE (index_ticker)
);





--target
IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'baseline_costs')
 CREATE TABLE target.baseline_costs (
	fiscal_year nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	fiscal_month nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	article float NULL,
	country_of_origin nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	merchant_cat_id float NULL,
	vendor_id float NULL,
	cost float NULL,
	created_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_by nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);




IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'commodities')
CREATE TABLE target.commodities (
	commodity_id int NOT NULL,
	[date] date NOT NULL,
	value numeric(20,8) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__commodit__BD632EE87D037866 PRIMARY KEY ([date],commodity_id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'cost_estimation_formula')
CREATE TABLE target.cost_estimation_formula (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NOT NULL,
	section_id int NULL,
	subsection_id int NULL,
	formula_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	formula varchar(2000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value decimal(18,4) NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	subsection_final_formula int NULL,
	element_id int NULL,
	items_names varchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	subsection_formula int NULL,
	CONSTRAINT PK_cost_est_formula_id PRIMARY KEY (id)
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'cost_estimation_summary')
CREATE TABLE target.cost_estimation_summary (
	section_id int NOT NULL,
	subsection_id int NULL,
	index_ticker varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	value decimal(18,5) NOT NULL,
	fiscal_year int NOT NULL,
	fiscal_month int NOT NULL,
	project_id int NULL,
	simplified_project_id int NULL,
	[date] date NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_article')
CREATE TABLE target.dim_article (
	id varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	unique_sc bit NULL,
	material varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[size] varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	count int NULL,
	color varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	listing_status int NULL,
	vendor int NULL,
	vendor_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ah3 varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category_ah4 varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	subcategory_ah5 varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	details_ah6 varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	brand_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	in_scope bit NULL,
	template_url varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	units_per_case int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	brand_category varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	wet_dry_code varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	primary_protein varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_article_id PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_calendar')
CREATE TABLE target.dim_calendar (
	id int NULL,
	[date] date NULL,
	calendar_year int NULL,
	calendar_month int NULL,
	calendar_month_name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	calendar_month_first_day date NULL,
	fiscal_year int NULL,
	fiscal_quarter varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	fiscal_month int NULL,
	fiscal_week int NULL,
	fiscal_month_first_date date NULL,
	fiscal_year_label varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	day_of_week varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_commodities')
CREATE TABLE target.dim_commodities (
	id int IDENTITY(1,1) NOT NULL,
	level_1 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_2 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_3 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	series_specific varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	index_ticker varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	units varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_4 varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	data_source varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_commodities_id PRIMARY KEY (id),
	CONSTRAINT UQ_index_ticker UNIQUE (index_ticker)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_conversion_library')
CREATE TABLE target.dim_conversion_library (
	id int IDENTITY(1,1) NOT NULL,
	country varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	industry varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	application varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	process varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	description varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value_final decimal(18,6) NULL,
	uom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	comments varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	data_source varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_conv_lib_id PRIMARY KEY (id)
);




IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_commodities')
CREATE TABLE target.dim_cost_estimation_commodities (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NOT NULL,
	subsection_id int NULL,
	variable_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value decimal(18,2) NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	section_id int NULL,
	commodities_id int NULL,
	uom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	lookup_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_cost_est_comm_id PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_conversion')
CREATE TABLE target.dim_cost_estimation_conversion (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NOT NULL,
	section_id int NULL,
	subsection_id int NULL,
	conversion_library_id int NOT NULL,
	adjusted_value decimal(18,4) NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	variable_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	uom varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value decimal(18,4) NULL,
	lookup_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_cost_est_conv_id PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_machine')
CREATE TABLE target.dim_cost_estimation_machine (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NOT NULL,
	section_id int NULL,
	subsection_id int NULL,
	machine_library_id int NOT NULL,
	machine_library_field varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	variable_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	adjusted_value decimal(18,5) NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	uom varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value decimal(18,4) NULL,
	CONSTRAINT PK_dim_cost_est_mach_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_estimation_tariff')
CREATE TABLE target.dim_cost_estimation_tariff (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NOT NULL,
	section_id int NULL,
	subsection_id int NULL,
	tariff_id int NULL,
	variable_name varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	value decimal(18,4) NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	uom varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	adjusted_value decimal(18,4) NULL,
	lookup_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_cost_est_tariff_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_cost_structure')
CREATE TABLE target.dim_cost_structure (
	cost_category_group varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cost_category varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cost_subcategory varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_country')
CREATE TABLE target.dim_country (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	iso2 varchar(2) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_element')
CREATE TABLE target.dim_element (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NOT NULL,
	name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	internal_order int NOT NULL,
	packaging_flag bit NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_element_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_machine_library')
CREATE TABLE target.dim_machine_library (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	details varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	country varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	application varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	machine_cost decimal(10,2) NULL,
	lifespan decimal(5,2) NULL,
	throughput_minute decimal(10,2) NULL,
	energy_consumption_Kwh decimal(10,2) NULL,
	operator_FTEs_per_line decimal(6,2) NULL,
	supervisor_FTE_per_line decimal(6,2) NULL,
	scrap decimal(4,2) NULL,
	[attribute] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	hours_per_day decimal(4,2) NULL,
	days_per_week decimal(4,2) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_mach_lib_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_project')
CREATE TABLE target.dim_project (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	article_id varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	country varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	status varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	industry varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	application varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	parent_project_id int NULL,
	project_code varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	is_final bit DEFAULT 0 NULL,
	parent_project_code varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_project_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_project_cost_details')
CREATE TABLE target.dim_project_cost_details (
	id int IDENTITY(1,1) NOT NULL,
	project_id int NULL,
	element_id int NULL,
	section_id int NULL,
	subsection_id int NULL,
	type_id int NULL,
	tb_id int NULL,
	variable_name varchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value decimal(18,4) NULL,
	adjusted_value decimal(18,4) NULL,
	uom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	index_spec varchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	comments varchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	final_formula int NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	is_packaging int NULL,
	formula varchar(2000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tb_ref_id int NULL,
	items_names varchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	subsection_formula int NULL,
	should_cost decimal(18,4) NULL,
	linked_sku int NULL,
	CONSTRAINT PK_dim_project_cost_details_id PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_section')
CREATE TABLE target.dim_section (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_section_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_spec_material')
CREATE TABLE target.dim_spec_material (
	id int IDENTITY(1,1) NOT NULL,
	element_id int NOT NULL,
	specification varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	uom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	additional_description varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	internal_order int NULL,
	variable_name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value decimal(18,4) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	udpated_date date NULL,
	udpated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	subsection_id int NULL,
	CONSTRAINT PK_dim_spec_material_id PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_subsection')
CREATE TABLE target.dim_subsection (
	id int IDENTITY(1,1) NOT NULL,
	element_id int NOT NULL,
	section_id int NOT NULL,
	name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	internal_order int NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_subsection_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_tariff')
CREATE TABLE target.dim_tariff (
	id int IDENTITY(1,1) NOT NULL,
	level_1 varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_2 varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_3 varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_4 varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_5 varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	level_6 varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	hts_code varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	country varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_tariff_id PRIMARY KEY (id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_type')
CREATE TABLE target.dim_type (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_dim_type_id PRIMARY KEY (id)
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'dim_vendor')
CREATE TABLE target.dim_vendor (
	id int NULL,
	name nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'forecast')
CREATE TABLE target.forecast (
	fiscal_year int NULL,
	article varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	forecast_qty int NULL,
	forecast_cogs decimal(18,2) NULL,
	forecast_revenue decimal(18,2) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'retail_aur')
CREATE TABLE target.retail_aur (
	fiscal_year int NULL,
	fiscal_month nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	article varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	article_description varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sales_quantity int NULL,
	avg_unit_retail decimal(38,6) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'tariff')
CREATE TABLE target.tariff (
	[date] date NOT NULL,
	tariff_id int NOT NULL,
	value decimal(18,4) NULL,
	created_date date NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date date NULL,
	updated_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_target_tariff PRIMARY KEY ([date],tariff_id)
);



IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'target'
 AND TABLE_NAME = 'vendor_funding')
CREATE TABLE target.vendor_funding (
	fiscal_year int NOT NULL,
	fiscal_month varchar(4) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	vendor_id int NOT NULL,
	vendor_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	funding_pct decimal(18,8) NOT NULL,
	created_date datetime NULL,
	created_by varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

--viz Schema

IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_all_commodities_data')
 CREATE TABLE viz.tbl_all_commodities_data (
	[Date] date NULL,
	fiscal_year int NULL,
	fiscal_month int NULL,
	Commodity_Id int NULL,
	Segment varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Commodity varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Details varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Description varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	series_specific varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Index_Ticker varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Units varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Country varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	value numeric(20,8) NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_early_warning_radar_app')
CREATE TABLE viz.tbl_early_warning_radar_app (
	fiscal_year int NULL,
	fiscal_month int NULL,
	fiscal_year_month int NULL,
	fiscal_date date NULL,
	Commodity varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	category varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Sub-Category] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	article int NULL,
	vendor_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Brand_Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	brand_category varchar(3) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	country_of_origin varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Index_Ticker varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	commodity_value numeric(20,8) NULL,
	commodity_uom varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	actual_cost float NULL,
	should_cost numeric(38,6) NULL,
	forecast_anual_unit_volume int NULL,
	po_cost float NULL,
	exposure numeric(38,6) NULL,
	latest_change_fiscal_date date NULL,
	latest_change_cv numeric(20,8) NULL,
	filtering_id varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


IF NOT EXISTS (
 SELECT TABLE_SCHEMA, TABLE_NAME
 FROM INFORMATION_SCHEMA.COLUMNS
 WHERE TABLE_SCHEMA = 'viz'
 AND TABLE_NAME = 'tbl_should_cost_analysis_app')
CREATE TABLE viz.tbl_should_cost_analysis_app (
	fiscal_year int NULL,
	fiscal_month int NULL,
	fiscal_date date NULL,
	fiscal_year_month varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Commodity varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commodity_uom varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Sub-Category] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	article int NULL,
	article_description varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Brand_Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	material varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	color varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Count int NULL,
	[size] varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	vendor_name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Template_URL varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	country_of_origin varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cost_category_group int NULL,
	cost_category varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cost_element varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Index_Ticker varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	actual_cost float NULL,
	should_cost numeric(38,6) NULL,
	flag_modelled_cost int NOT NULL,
	funding_pct decimal(18,8) NULL,
	[Sales Quantity] int NULL,
	[Avg Unit Retail] decimal(38,6) NULL,
	forecast_anual_unit_volume int NULL,
	forecast_COGS decimal(18,2) NULL,
	forecast_revenue decimal(18,2) NULL,
	commodity_value numeric(20,8) NULL,
	filtering_id varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);

