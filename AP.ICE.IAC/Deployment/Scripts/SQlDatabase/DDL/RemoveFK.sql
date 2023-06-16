--dbo.template_master
IF (OBJECT_ID('dbo.FK_template_master', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE dbo.template_master DROP CONSTRAINT FK_template_master
END



--target.cost_estimation_formula
IF (OBJECT_ID('target.FK_cost_estimation_formula_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.cost_estimation_formula DROP CONSTRAINT FK_cost_estimation_formula_project_id
END

IF (OBJECT_ID('target.FK_cost_estimation_formula_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.cost_estimation_formula DROP CONSTRAINT FK_cost_estimation_formula_section_id
END

IF (OBJECT_ID('target.FK_cost_estimation_formula_subsection_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.cost_estimation_formula DROP CONSTRAINT FK_cost_estimation_formula_subsection_id
END


--target.cost_estimation_summary


IF (OBJECT_ID('target.FK_cost_estimation_summary_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.cost_estimation_summary DROP CONSTRAINT FK_cost_estimation_summary_project_id
END


IF (OBJECT_ID('target.FK_cost_estimation_summary_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.cost_estimation_summary DROP CONSTRAINT FK_cost_estimation_summary_section_id
END

--target.dim_commodities

IF (OBJECT_ID('target.FK_dim_commodities_dim_commodities', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_commodities DROP CONSTRAINT FK_dim_commodities_dim_commodities
END



--target.dim_cost_estimation_commodities

IF (OBJECT_ID('target.FK_dim_cost_estimation_commodities_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_commodities DROP CONSTRAINT FK_dim_cost_estimation_commodities_section_id
END


IF (OBJECT_ID('target.FK_dim_cost_estimation_commodities_subsection_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_commodities DROP CONSTRAINT FK_dim_cost_estimation_commodities_subsection_id
END


--target.dim_cost_estimation_conversion


IF (OBJECT_ID('target.FK_dim_cost_estimation_conversion_conversion_library_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_conversion
 DROP CONSTRAINT FK_dim_cost_estimation_conversion_conversion_library_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_conversion_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_conversion
 DROP CONSTRAINT FK_dim_cost_estimation_conversion_project_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_conversion_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_conversion
 DROP CONSTRAINT FK_dim_cost_estimation_conversion_section_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_conversion_subsection_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_conversion
 DROP CONSTRAINT FK_dim_cost_estimation_conversion_subsection_id
END


--target.dim_cost_estimation_machine

IF (OBJECT_ID('target.FK_dim_cost_estimation_commodities_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_machine
 DROP CONSTRAINT FK_dim_cost_estimation_commodities_project_id
END


IF (OBJECT_ID('target.FK_dim_cost_estimation_machine_machine_library_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_machine
 DROP CONSTRAINT FK_dim_cost_estimation_machine_machine_library_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_machine_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_machine
 DROP CONSTRAINT FK_dim_cost_estimation_machine_section_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_machine_subsection_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_machine
 DROP CONSTRAINT FK_dim_cost_estimation_machine_subsection_id
END

--target.dim_cost_estimation_tariff
IF (OBJECT_ID('target.FK_dim_cost_estimation_tariff_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_tariff
 DROP CONSTRAINT FK_dim_cost_estimation_tariff_project_id
END


IF (OBJECT_ID('target.FK_dim_cost_estimation_tariff_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_tariff
 DROP CONSTRAINT FK_dim_cost_estimation_tariff_section_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_tariff_subsection_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_tariff
 DROP CONSTRAINT FK_dim_cost_estimation_tariff_subsection_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_tariff_tariff_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_tariff
 DROP CONSTRAINT FK_dim_cost_estimation_tariff_tariff_id
END

--target.dim_element
IF (OBJECT_ID('target.FK_dim_element_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_element
 DROP CONSTRAINT FK_dim_element_project_id
END

--target.dim_spec_material
IF (OBJECT_ID('target.FK__dim_spec___subse__2B0A656D', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_spec_material
 DROP CONSTRAINT FK__dim_spec___subse__2B0A656D
END

IF (OBJECT_ID('target.FK_dim_spec_material_element_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_spec_material
 DROP CONSTRAINT FK_dim_spec_material_element_id
END

--target.dim_subsection
IF (OBJECT_ID('target.FK_dim_subsection_element_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_subsection
 DROP CONSTRAINT FK_dim_subsection_element_id
END

IF (OBJECT_ID('target.FK_dim_subsection_section_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_subsection
 DROP CONSTRAINT FK_dim_subsection_section_id
END

IF (OBJECT_ID('target.FK_dim_cost_estimation_conversion_project_id', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE target.dim_cost_estimation_conversion
 DROP CONSTRAINT FK_dim_cost_estimation_conversion_project_id
END
