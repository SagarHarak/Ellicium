--dbo.template_master
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'dbo' AND
        CONSTRAINT_NAME   = 'FK_template_master' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE dbo.template_master
add CONSTRAINT FK_template_master FOREIGN KEY (proj_id) REFERENCES target.dim_project(id);

--target.cost_estimation_formula
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_project_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_formula_project_id FOREIGN KEY (project_id) REFERENCES target.dim_project(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_section_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_formula_section_id FOREIGN KEY (section_id) REFERENCES target.dim_section(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_subsection_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_formula_subsection_id FOREIGN KEY (subsection_id) REFERENCES target.dim_subsection(id);



--target.cost_estimation_summary
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_summary_project_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_summary
add CONSTRAINT FK_cost_estimation_summary_project_id FOREIGN KEY (project_id) REFERENCES  target.dim_project(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_summary_section_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_summary
add CONSTRAINT FK_cost_estimation_summary_section_id FOREIGN KEY (section_id) REFERENCES  target.dim_section(id);


--target.dim_commodities
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_commodities_dim_commodities' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_commodities
add CONSTRAINT FK_dim_commodities_dim_commodities FOREIGN KEY (id) REFERENCES  target.dim_commodities(id);



--target.dim_cost_estimation_commodities
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_commodities_section_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_commodities
add CONSTRAINT FK_dim_cost_estimation_commodities_section_id FOREIGN KEY (section_id) REFERENCES  target.dim_section(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_commodities_subsection_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_commodities
add CONSTRAINT FK_dim_cost_estimation_commodities_subsection_id FOREIGN KEY (subsection_id) REFERENCES  target.dim_subsection(id);


--target.dim_cost_estimation_conversion
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_conversion_conversion_library_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_conversion
add CONSTRAINT FK_dim_cost_estimation_conversion_conversion_library_id FOREIGN KEY (conversion_library_id) REFERENCES  target.dim_conversion_library(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_conversion_project_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_conversion
add CONSTRAINT FK_dim_cost_estimation_conversion_project_id FOREIGN KEY (project_id) REFERENCES  target.dim_project(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_conversion_section_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_conversion
add CONSTRAINT FK_dim_cost_estimation_conversion_section_id FOREIGN KEY (section_id) REFERENCES  target.dim_section(id);

IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_conversion_subsection_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_conversion
add CONSTRAINT FK_dim_cost_estimation_conversion_subsection_id FOREIGN KEY (subsection_id) REFERENCES target.dim_subsection(id);


--target.dim_cost_estimation_machine
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_commodities_project_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_machine
add CONSTRAINT FK_dim_cost_estimation_commodities_project_id FOREIGN KEY (project_id) REFERENCES target.dim_project(id);

IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_machine_machine_library_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_machine
add CONSTRAINT FK_dim_cost_estimation_machine_machine_library_id FOREIGN KEY (machine_library_id) REFERENCES target.dim_machine_library(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_machine_section_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_machine
add CONSTRAINT FK_dim_cost_estimation_machine_section_id FOREIGN KEY (section_id) REFERENCES target.dim_section(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_machine_subsection_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_machine
add CONSTRAINT FK_dim_cost_estimation_machine_subsection_id FOREIGN KEY (subsection_id) REFERENCES target.dim_subsection(id);


--target.dim_cost_estimation_tariff
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_tariff_project_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_tariff
add CONSTRAINT FK_dim_cost_estimation_tariff_project_id FOREIGN KEY (project_id) REFERENCES target.dim_project(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_tariff_section_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_tariff
add CONSTRAINT FK_dim_cost_estimation_tariff_section_id FOREIGN KEY (section_id) REFERENCES target.dim_section(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_tariff_subsection_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_tariff
add CONSTRAINT FK_dim_cost_estimation_tariff_subsection_id FOREIGN KEY (subsection_id) REFERENCES target.dim_subsection(id);



IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_tariff_tariff_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_tariff
add CONSTRAINT FK_dim_cost_estimation_tariff_tariff_id FOREIGN KEY (tariff_id) REFERENCES target.dim_tariff(id);



--target.dim_element

IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_element_project_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_element
add CONSTRAINT FK_dim_element_project_id FOREIGN KEY (project_id) REFERENCES target.dim_project(id);



--target.dim_spec_material
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK__dim_spec___subse__2B0A656D' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_spec_material
add CONSTRAINT FK__dim_spec___subse__2B0A656D FOREIGN KEY (subsection_id) REFERENCES target.dim_subsection(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_spec_material_element_id' AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_spec_material
add CONSTRAINT FK_dim_spec_material_element_id FOREIGN KEY (element_id) REFERENCES target.dim_element(id);


--target.dim_subsection
IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_subsection_element_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_subsection
add CONSTRAINT FK_dim_subsection_element_id FOREIGN KEY (element_id) REFERENCES target.dim_element(id);


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_subsection_section_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_subsection
add CONSTRAINT FK_dim_subsection_section_id FOREIGN KEY (section_id) REFERENCES target.dim_section(id);


-- 25/01/23
-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'icr' AND
--         CONSTRAINT_NAME   = 'FK_icr_basket_commodities_commodity_id'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE icr.basket_commodities
-- add CONSTRAINT FK_icr_basket_commodities_commodity_id FOREIGN KEY (commodity_id) REFERENCES icr.dim_commodities(commodity_id)


-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'icr' AND
--         CONSTRAINT_NAME   = 'FK_icr_basket_commodities_basket_id'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE icr.basket_commodities
-- add CONSTRAINT FK_icr_basket_commodities_basket_id FOREIGN KEY (basket_id) REFERENCES icr.basket(id)


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_target_commodities_commodity_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.commodities
add CONSTRAINT FK_target_commodities_commodity_id FOREIGN KEY (commodity_id) REFERENCES [target].[dim_commodities] ([id])


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_project_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.commodities
add CONSTRAINT FK_cost_estimation_formula_project_id FOREIGN KEY (project_id) REFERENCES [target].[dim_project] ([id])



IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_project_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_formula_project_id FOREIGN KEY (project_id) REFERENCES [target].[dim_project] ([id])


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_section_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_formula_section_id FOREIGN KEY (section_id) REFERENCES [target].[dim_section] ([id])


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_formula_subsection_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_formula_subsection_id FOREIGN KEY (subsection_id) REFERENCES [target].[dim_subsection] ([id])




IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_cost_estimation_summary_project_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.cost_estimation_formula
add CONSTRAINT FK_cost_estimation_summary_project_id FOREIGN KEY (project_id) REFERENCES [target].[dim_project] ([id])

-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'target' AND
--         CONSTRAINT_NAME   = 'FK_target_dim_article_vendor'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE target.dim_article
-- add CONSTRAINT FK_target_dim_article_vendor FOREIGN KEY (vendor) REFERENCES [target].[dim_vendor] ([id])



IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_commodities_section_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_commodities
add CONSTRAINT FK_dim_cost_estimation_commodities_section_id FOREIGN KEY (section_id) REFERENCES [target].[dim_section] ([id])


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_dim_cost_estimation_commodities_project_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_cost_estimation_conversion
add CONSTRAINT FK_dim_cost_estimation_commodities_project_id FOREIGN KEY (project_id) REFERENCES [target].[dim_project] ([id])


-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'target' AND
--         CONSTRAINT_NAME   = 'FK_dim_cost_estimation_tariff_project_id'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE target.dim_cost_estimation_tariff
-- add CONSTRAINT FK_dim_cost_estimation_tariff_project_id FOREIGN KEY (project_id) REFERENCES [target].[dim_project] ([id])


-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'target' AND
--         CONSTRAINT_NAME   = 'FK_dim_element_project_id'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE target.dim_element
-- add CONSTRAINT FK_dim_element_project_id FOREIGN KEY (project_id) REFERENCES [target].[dim_project] ([id])

IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_target_dim_project_article_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_project
add CONSTRAINT FK_target_dim_project_article_id FOREIGN KEY (article_id) REFERENCES [target].[dim_article] ([id])

-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'target' AND
--         CONSTRAINT_NAME   = 'FK_dim_spec_material_element_id'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE target.dim_spec_material
-- add CONSTRAINT FK_dim_spec_material_element_id FOREIGN KEY (element_id) REFERENCES [target].[dim_element] ([id])


IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_target_dim_project_cost_details_element_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_project_cost_details
add CONSTRAINT FK_target_dim_project_cost_details_element_id FOREIGN KEY (element_id) REFERENCES [target].[dim_element] ([id])




IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_target_dim_project_cost_details_subsection_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.dim_project_cost_details
add CONSTRAINT FK_target_dim_project_cost_details_subsection_id FOREIGN KEY (subsection_id) REFERENCES [target].[dim_subsection] ([id])

IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_target_forecast_article'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.forecast
add CONSTRAINT FK_target_forecast_article FOREIGN KEY (article) REFERENCES [target].[dim_article] ([id])



IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_retail_aur_article'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.retail_aur
add CONSTRAINT FK_retail_aur_article FOREIGN KEY (article) REFERENCES [target].[dim_article] ([id])

IF NOT EXISTS (
    SELECT NULL 
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE
        CONSTRAINT_SCHEMA = 'target' AND
        CONSTRAINT_NAME   = 'FK_target_tariff_tariff_id'  AND
        CONSTRAINT_TYPE   = 'FOREIGN KEY'
) ALTER TABLE target.tariff
add CONSTRAINT FK_target_tariff_tariff_id FOREIGN KEY (tariff_id) REFERENCES [target].[dim_tariff] ([id])

-- IF NOT EXISTS (
--     SELECT NULL 
--     FROM information_schema.TABLE_CONSTRAINTS
--     WHERE
--         CONSTRAINT_SCHEMA = 'target' AND
--         CONSTRAINT_NAME   = 'FK_target_vendor_funding_vendor_id'  AND
--         CONSTRAINT_TYPE   = 'FOREIGN KEY'
-- ) ALTER TABLE target.vendor_funding
-- add CONSTRAINT FK_target_vendor_funding_vendor_id FOREIGN KEY (vendor_id) REFERENCES [target].[dim_vendor] ([id])



