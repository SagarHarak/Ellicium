INSERT INTO dbo.app_config (config_path,config_type,route_category,config_label,config_icon,is_active,config_category_order) VALUES
	 (N'/home/summary-dashboard',N'route',N'HOME',N'Summary Dashboard',N'cilHome',0,10),
	 (N'/analytics/vcn-exposure',N'route',N'SUPPLIER RESILIENCY',N'VCN and Exposure',N'cilBarChart',0,2),
	 (N'/analytics/supplier-outreach',N'route',N'SUPPLIER RESILIENCY',N'Supplier Outreach',N'cilBarChart',0,2),
	 (N'/analytics/digital-twin',N'route',N'SUPPLIER RESILIENCY',N'Digital Twin',N'cilBarChart',0,2),
	 (N'/analytics/sales-analysis',N'route',N'SUPPLIER RESILIENCY',N'Sales Analysis',N'cilBarChart',0,2),
	 (N'/analytics/cogs-analysis',N'route',N'SUPPLIER RESILIENCY',N'COGs Analysis',N'cilBarChart',0,2),
	 (N'/analytics/competitor-analysis',N'route',N'SUPPLIER RESILIENCY',N'Competitor Analysis',N'cilBarChart',0,2),
	 (N'/scenario-management/what-if-analysis',N'route',N'SCENARIO MANAGEMENT',N'What If Analysis',N'cilStream',0,3),
	 (N'/config/data-management',N'route',N'CONFIG',N'Data Management',N'cilSettings',0,4),
	 (N'/config/risk-selection',N'route',N'CONFIG',N'Risk Selection',N'cilSettings',0,4);
INSERT INTO dbo.app_config (config_path,config_type,route_category,config_label,config_icon,is_active,config_category_order) VALUES
	 (N'/config/top-selection',N'route',N'CONFIG',N'Top Selection',N'cilSettings',0,4),
	 (N'/input-cost-radar/commodity',N'route',N'INPUT COST RADAR',N'Commodity',N'cilChart',1,5),
	 (N'/input-cost-radar/basket',N'route',N'INPUT COST RADAR',N'Basket',N'cilChart',1,5),
	 (N'/libraries/machine',N'route',N'LIBRARIES',N'Machine',N'cilLibrary',1,6),
	 (N'/libraries/conversion',N'route',N'LIBRARIES',N'Conversion',N'cilLibrary',1,6),
	 (N'/libraries/template',N'route',N'LIBRARIES',N'Template',N'cilLibrary',1,6),
	 (N'/libraries/duty-tariff',N'route',N'LIBRARIES',N'Tariff',N'cilLibrary',1,6),
	 (N'/libraries/commodity',N'route',N'LIBRARIES',N'Commodity',N'cilLibrary',1,6),
	 (N'/rfi-rfq/create-project',N'route',N'RFx',N'Create Project',N'cilPaperPlane',0,7),
	 (N'/rfi-rfq/search-supplier',N'route',N'RFx',N'Search Supplier',N'cilPaperPlane',0,7);
INSERT INTO dbo.app_config (config_path,config_type,route_category,config_label,config_icon,is_active,config_category_order) VALUES
	 (N'/rfi-rfq/templates',N'route',N'RFx',N'Templates',N'cilPaperPlane',0,7),
	 (N'/rfi-rfq/supplier-outreach',N'route',N'RFx',N'Send an Email',N'cilPaperPlane',0,7),
	 (N'/rfi-rfq/inbox',N'route',N'RFx',N'Response Reconcilation',N'cilPaperPlane',0,7),
	 (N'/rfi-rfq/monitor-response',N'route',N'RFx',N'Monitor Response',N'cilPaperPlane',0,7),
	 (N'/management-reports/early-warning-radar',N'route',N'MANAGEMENT REPORTS',N'Early Warning Radar',N'cilNotes',1,8),
	 (N'/management-reports/input-cost-radar',N'route',N'MANAGEMENT REPORTS',N'Input Cost Radar',N'cilNotes',1,8),
	 (N'/management-reports/commodity-intelligence',N'route',N'MANAGEMENT REPORTS',N'Commodity Intelligence',N'cilNotes',1,8),
	 (N'/margin-management/should-cost-analysis',N'route',N'MARGIN MANAGEMENT',N'Clawback Quantifier',N'cilVector',1,9),
	 (N'/margin-management/input-factor-analysis',N'route',N'MARGIN MANAGEMENT',N'Input Factor Analysis',N'cilVector',1,9),
	 (N'/margin-management/supplier-performance-management',N'route',N'MARGIN MANAGEMENT',N'Supplier Performance Management',N'cilVector',1,9);
INSERT INTO dbo.app_config (config_path,config_type,route_category,config_label,config_icon,is_active,config_category_order) VALUES
	 (N'/simulation-and-scenario-planning/cost-details-engineering',N'route',N'SIMULATION AND SCENARIO PLANNING',N'Cost Details and Engineering',N'cilViewQuilt',1,10),
	 (N'/simulation-and-scenario-planning/country-comparison',N'route',N'SIMULATION AND SCENARIO PLANNING',N'Country Comparison',N'cilViewQuilt',1,10),
	 (N'/simulation-and-scenario-planning/costing-exercise-results',N'route',N'SIMULATION AND SCENARIO PLANNING',N'Costing Exercise Results',N'cilViewQuilt',1,10),
	 (N'/simulation-and-scenario-planning/scenario-comparison',N'route',N'SIMULATION AND SCENARIO PLANNING',N'Scenario Comparison',N'cilViewQuilt',1,10),
	 (N'/config/should-cost',N'route',N'CONFIG',N'Should Cost',N'cilSettings',1,4),
	 (N'/home/ice-overview',N'route',N'HOME',N'Ice Overview',N'cilHome',1,1),
	 (N'/config/mass-upload',N'route',N'CONFIG',N'Mass Upload',N'cilSettings',1,4);