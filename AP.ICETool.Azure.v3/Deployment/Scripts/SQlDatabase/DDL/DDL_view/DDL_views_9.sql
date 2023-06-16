CREATE VIEW [viz].[vendor_cost_structure] as 

WITH in_scope AS -- product in scope
(
	SELECT id article
		, description article_description
		,category_AH4
		,subcategory_AH5
		,details_AH6
		,vendor_name as incumbent
	FROM target.dim_article
WHERE in_scope = 1
)
, RFP_original AS -- raw RFP data
(
	SELECT  CASE 
			WHEN Vendor_Name = 'Huhtamaki' THEN 'HUHTAMAKI INC' 
			WHEN Vendor_Name = 'Kruger' THEN 'KRUGER PRODUCTS USA'
			WHEN Vendor_Name = 'COMET PRO INC WNA' THEN 'COMET PRO INC'
			ELSE cast(Vendor_Name as varchar(100)) END [Vendor]
	  ,cast(Rep_Sku as int) article
      ,cast([Description] as varchar(100)) [Description]
	  ,cast(Raw_Materials_Composition as varchar(100)) as Raw_Materials_Composition
	  ,cast([Factory_Name] as varchar(100)) [Factory_Name]
      ,cast([Country_of_Origin_Full_Name] as varchar(100)) [Country_of_Origin_Full_Name]
      ,cast([Port_of_Export_Full_Name] as varchar(100)) [Port_of_Export_Full_Name]
      ,cast(replace([Raw_Material_Cost_R],'$','') as decimal(12,4)) [Raw_Material_Cost_R]
      ,cast(replace([Scrap_Cost_S],'$','') as decimal(12,4)) [Scrap_Cost_S]
      ,cast(replace([Machine_Cost_C],'$','') as decimal(12,4)) [Machine_Cost_C]
      ,cast(replace([Labor_Cost_L],'$','') as decimal(12,4)) [Labor_Cost_L]
      ,cast(replace([Utilities_Cost_U],'$','') as decimal(12,4)) [Utilities_Cost_U]
      ,cast(replace([Packaging_Cost_P],'$','') as decimal(12,4)) [Packaging_Cost_P]
	  ,cast(replace([Factory_Overhead_and_Margin_O],'$','') as decimal(12,4)) [Factory_Overhead_and_Margin_O]
      ,cast(replace([Dead_Net_FOB_at_Port_Unit_Cost_USD_FOB_Materials_Labor_Packaging_Overhead_Margin],'$','') as decimal(12,4)) [Dead_Net_FOB_at_Port_Unit_Cost_USD_FOB_Materials_Labor_Packaging_Overhead_Margin]
      ,cast(replace([Duty_Rate_with_tariffs],'%','') as decimal(12,4)) [Duty_Rate_with_tariffs]
      ,cast(replace([Duty_D],'$','') as decimal(12,4)) [Duty_D]
      ,cast(replace([Agency_Fee],'$','') as decimal(12,4)) [Agency_Fee]
      ,cast(replace([Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F],'$','') as decimal(12,4)) [Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F]
      ,cast(replace([Supplier_Margin_Mark_up_M],'$','') as decimal(12,4)) [Supplier_Margin_Mark_up_M]
   --   ,cast(replace(Dead_Net_Landed_Unit_Cost_USD_FOB_Duty_Freight_Markup_COLLECT,'$','') as decimal(12,4)) [Dead_Net_Landed_Unit_Cost_USD_FOB_Duty_Freight_Markup_COLLECT] 
	  ,cast(replace(US_Domestic_Prepaid_Freight_T,'$','') as decimal(12,4)) [US_Domestic_Prepaid_Freight_T]
	  ,cast(replace(Supplier_Margin_Mark_up_G,'$','') as decimal(12,4)) [Supplier_Margin_Mark_up_G]
	  ,cast(replace(Landing_Tool_Duty_Tariff_Cost,'$','') as decimal(12,4)) [Landing_Tool_Duty_Tariff_Cost]
	  ,cast(replace(Landing_Tool_Logistics_Cost,'$','') as decimal(12,4)) [Landing_Tool_Logistics_Cost]
      ,cast([Location_US_domestic_distribution_centers] as varchar(100)) [Location_US_domestic_distribution_centers]
	  ,cast(replace(Final_DNL_Cost,'$','') as decimal(12,4)) Final_DNL_Cost
   FROM [raw].[vendor_bid_costs]
   WHERE Final_DNL_Cost is not null 
   --AND Rep_Sku = 48911
   --cast(replace([Dead_Net_FOB_at_Port_Unit_Cost_USD_FOB_Materials_Labor_Packaging_Overhead_Margin],'$','') as decimal(12,4))  > 0
)
,dif_to_total as -- this is used when we do not have cost details informed by the vendor
(
	select *
		  ,cast(CASE WHEN ([Raw_Material_Cost_R] IS NULL
				  AND [Scrap_Cost_S] IS NULL
				  AND [Machine_Cost_C] IS NULL
				  AND [Labor_Cost_L] IS NULL
				  AND [Utilities_Cost_U] IS NULL
				  AND [Packaging_Cost_P] IS NULL
				  AND [Factory_Overhead_and_Margin_O] IS NULL) THEN Final_DNL_Cost - (ISNULL(Landing_Tool_Logistics_Cost,0) + ISNULL(Landing_Tool_Duty_Tariff_Cost,0))
	  ELSE 0 END as decimal(12,4)) Dif_to_total
	from RFP_original
)
, t as -- unpivoting cost information from vendors
(
	SELECT --vendor_id,
		Vendor
		,category_AH4
		,subcategory_AH5
		,article
		,Description
		,Raw_Materials_Composition
		,Factory_Name
		,Country_of_Origin
		,[Location_US_domestic_distribution_centers]
		,[Port_of_Export_Full_Name]
		,cost_element
		,unit_cost
		FROM 
		(
			SELECT --ven.id vendor_id,
				t.Vendor
				,art.category_AH4
				,art.subcategory_AH5
				,t.article
				,t.Description
				,t.Raw_Materials_Composition
				,t.Factory_Name
				,CASE WHEN t.Country_of_Origin_Full_Name in ('US','USA') THEN 'USA' ELSE t.Country_of_Origin_Full_Name END Country_of_Origin
				,[Location_US_domestic_distribution_centers]
				,[Port_of_Export_Full_Name]
				,Raw_Material = Raw_Material_Cost_R
				,Scrap = ISNULL(Scrap_Cost_S,0)
				,Machine =	Machine_Cost_C
				,Labor = Labor_Cost_L 
				,Utilities = Utilities_Cost_U
				,Packaging = Packaging_Cost_P
				,Factory_Overhead_and_Margin_O
				,[Dead_Net_FOB_at_Port_Unit_Cost_USD_FOB_Materials_Labor_Packaging_Overhead_Margin]
				,[Duty_Tariff] = coalesce([Landing_Tool_Duty_Tariff_Cost],[Duty_D])
				,[Agency_Fee]
				,[Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F]
				,[Supplier_Margin_Mark_up_M]
				,[US_Domestic_Prepaid_Freight_T]
				,[Supplier_Margin_Mark_up_G]
				,[Landing_Tool_Logistics_Cost]
				,Final_DNL_Cost
				,Dif_to_total
			FROM dif_to_total t
			LEFT JOIN target.dim_article art
				on art.id = t.article
			--LEFT JOIN target.dim_vendor ven
			--	ON ven.name = t.Vendor
			WHERE art.in_scope = 1
		) src
	UNPIVOT
	(
	  unit_cost FOR cost_element IN   
      ( Raw_Material
		,Scrap
		,Machine
		,Labor
		,Utilities
		,Packaging
		,Factory_Overhead_and_Margin_O
		,[Duty_Tariff]
		,Agency_Fee
		,Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F
		,Supplier_Margin_Mark_up_M
		,US_Domestic_Prepaid_Freight_T
		,Supplier_Margin_Mark_up_G
		,Landing_Tool_Logistics_Cost
		,Final_DNL_Cost
		,Dif_to_total)
	)pvt  
)
, rfp_results as
(
	SELECT Fiscal_Year = 2022
	,Fiscal_Month = '06'
	,category_AH4 Category
	,subcategory_AH5 [Sub-category]
	,Vendor
	,t.Article
	,Description
	,Raw_Materials_Composition [Raw Materials Composition]
	,Factory_Name [Factory Name]
	,CASE 
		WHEN Country_of_Origin = 'India/ Vietnam' THEN 'India or Vietnam'
		WHEN Country_of_Origin =  'PRC' THEN 'China'
		WHEN Country_of_Origin in ('United States','Unites States', 'US','USA') THEN 'Uinted States'
		WHEN Country_of_Origin in ('USA & Canada','Unites States and Canada') THEN 'United States and Canada'
		WHEN Country_of_Origin = 'Vietnam/ India' THEN 'Vietnam or India'
		WHEN Country_of_Origin is NULL THEN 'N/A'
		ELSE Country_of_Origin END [Contry of Origin]
	,[Location_US_domestic_distribution_centers] [Location US DC]
	,[Port_of_Export_Full_Name] [Port of Export]
	,CASE 
		WHEN cost_element in ('Raw_Material','Scrap') THEN 'Material + Scrap'
		WHEN cost_element in ('Machine','Labor','Utilities') THEN 'Conversion'
		WHEN cost_element in ('Drayage_Ocean_Freight_Storage_and_US_Domestic_Freight_F','US_Domestic_Prepaid_Freight_T','Landing_Tool_Logistics_Cost') THEN 'Logistics'
		WHEN cost_element in ('Duty_Tariff') THEN 'Duty/Tariff'
		WHEN cost_element in ('Factory_Overhead_and_Margin_O','Agency_Fee','Supplier_Margin_Mark_up_G','Supplier_Margin_Mark_up_M') THEN 'OH/Margin'
	 ELSE cost_element
		END AS [Cost Category]
	,CASE cost_element  
		WHEN 'OH_Margin' THEN 'Overhead & Margin' 
	 ELSE cost_element END AS [Cost Element]
	,unit_cost [Unit Cost]
	,1 vendor_flag
	FROM t
)
, should_cost AS
(
	SELECT fiscal_year
		,fiscal_month
		,art.category_ah4 category
		,art.subcategory_ah5 [sub_category]
		,article_id article
		,art.description
		,NULL Raw_Materials_Composition
		,NULL Factory_Name
		,p.country country_of_origin
		,CASE 
			WHEN s.name in ('Conversion Costs','Labor Costs') THEN 'Conversion'
			WHEN s.name = 'Material Costs' THEN 'Material + Scrap'
			WHEN s.name = 'Domestic Transit' THEN 'Logistics'
			WHEN s.name= 'Overhead & Margin' THEN 'OH/Margin'
		ELSE s.name
		END AS cost_category
		,sub.name	cost_element
		,sum(ces.value) [Unit Cost]
		,0 vendor_flag
		,'Y' use_to_details
	FROM target.cost_estimation_summary ces
	INNER JOIN target.dim_project p
		ON p.id = ces.project_id AND ISNULL(p.is_final,0) = 1 
	INNER JOIN target.dim_section s
		ON s.id = ces.section_id
	INNER JOIN target.dim_subsection sub
		ON sub.id = ces.subsection_id
	INNER JOIN target.dim_article art
		ON p.article_id = art.id
	WHERE s.name <> 'Import Transit'
	--AND cm.article = 48911
	GROUP BY fiscal_year
		,fiscal_month
		,art.category_ah4
		,art.vendor_name
		,art.subcategory_ah5
		,article_id
		,art.description
		,p.country
		,s.name
		,sub.name
		,CASE 
			WHEN s.name in ('Conversion Costs','Labor Costs') THEN 'Conversion'
			WHEN s.name = 'Material Costs' THEN 'Material + Scrap'
			WHEN s.name = 'Domestic Transit' THEN 'Logistics'
			WHEN s.name= 'Overhead & Margin' THEN 'OH/Margin'
		ELSE s.name
		END
)

SELECT Fiscal_Year [Fiscal Year]
	,Fiscal_Month [Fiscal Month]
	,a.Article
	,a.article_description [Description]
	,a.category_AH4 Category
	,a.subcategory_AH5 [Sub-category]
	--,a.details_AH6
	,a.Incumbent

	,rfp.Vendor
	,[Raw Materials Composition]
	,[Factory Name]
	,[Contry of Origin]
	,[Location US DC]
	,[Port of Export]
	,rfp.[Cost Category]
	,rfp.[Cost Element]
	,rfp.[Unit Cost]
	,1 vendor_flag
FROM in_scope a
INNER JOIN rfp_results rfp
	ON a.article = rfp.article
--WHERE rfp.article = 48911

UNION ALL

select fiscal_year
	,fiscal_month
	,a.article
	,a.article_description
	,a.category_AH4 Category
	,a.subcategory_AH5 [Sub-category]
	--,a.details_AH6
	,a.incumbent
	,'Should Cost' vendor
	,NULL [Raw Materials Composition]
	,NULL [Factory Name]
	,sc.country_of_origin
	,NULL [Location US DC]
	,NULL [Port of Export]
	,[cost_category]
	,cost_element
	,[Unit Cost]
	,0 vendor_flag
from in_scope a
INNER JOIN should_cost sc
	ON a.article = sc.article;