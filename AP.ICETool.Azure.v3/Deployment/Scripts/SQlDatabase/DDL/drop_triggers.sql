IF OBJECT_ID ('target.default_project_logic', 'TR') IS NOT NULL  
   DROP TRIGGER target.default_project_logic; 
GO


IF OBJECT_ID ('target.project_code_logic_country_update', 'TR') IS NOT NULL  
   DROP TRIGGER target.project_code_logic_country_update; 
GO


IF OBJECT_ID ('target.project_code_logic', 'TR') IS NOT NULL  
   DROP TRIGGER target.project_code_logic; 
GO


IF OBJECT_ID ('target.update_parent_project_code_logic', 'TR') IS NOT NULL  
   DROP TRIGGER target.update_parent_project_code_logic; 
GO