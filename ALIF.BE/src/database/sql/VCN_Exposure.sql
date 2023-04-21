-- KPIs
-- total_spend

SELECT sum(pnv.invoice_amount) as total_spend
from cortevadev2.Product_Network_VCN pnv
where pnv.product_id  = 1021
    and pnv.risk_level = 'Low'
    and pnv.country  ='United States'
    and pnv.risk_type ='weather'
GROUP by pnv.product_id;

--revanue at risk

SELECT sum(pnv.invoice_amount) as Revenue_at_risk
from cortevadev2.Product_Network_VCN pnv
where pnv.product_id  = 1021
    and pnv.risk_level <>'Low'
    and pnv.shipper_id = 1545
    and pnv.country  ='United States'
    and pnv.risk_type ='transport'
GROUP by pnv.product_id
;

-- supplier_at_risk

SELECT count(DISTINCT pnv.shipper_id) as supplier_at_risk
from cortevadev2.Product_Network_VCN pnv
where pnv.product_id  = 1021
    and pnv.risk_level <> 'Low'
    and pnv.country  ='United States'
    and pnv.risk_type ='transport'
--and pnv.risk_type is not null;

--product_at_risk

SELECT count(DISTINCT pnv.component_id  ) as product_at_risk
from cortevadev2.Product_Network_VCN pnv
where pnv.shipper_id = 1545
    and pnv.risk_level <> 'Low'
    and pnv.country  ='United States'
    and pnv.risk_type ='transport'
--and pnv.risk_type is not null;

--component_at_risk

SELECT count(DISTINCT pnv.component_id) as component_at_risk
from cortevadev2.Product_Network_VCN pnv
where pnv.product_id  = 1021
    and pnv.risk_level = 'High'
    and pnv.country  ='United States'
    and pnv.risk_type ='transport'
    and pnv.risk_type is not null;

SELECT count(DISTINCT pnv.component_id) as component_at_risk
FROM 
  cortevadev2.Product_Network_VCN pnv 
WHERE 
  pnv.product_id = 1021
AND pnv.risk_level != 'Low' 
AND pnv.risk_type IS NOT NULL



--key event
SELECT count( pnv.risk_type  ) as key_event
from cortevadev2.Product_Network_VCN pnv
where pnv.product_id  = 1021
    and pnv.shipper_id = 1545
    and pnv.risk_level <> 'Low'
    and pnv.country  ='United States'
    and pnv.risk_type is not null;

--key location 

SELECT count(DISTINCT ia.location_id  ) as Key_Location
from cortevadev2.Product_Network_VCN pnv
    LEFT JOIN cortevadev2.Import_Analysis ia ON pnv.shipper_id = ia.company_id
where pnv.product_id  = 1021
    and pnv.shipper_id = 1545
    and pnv.risk_level <> 'Low'
    and pnv.risk_type is not null;

-- Product Network
SELECT
    id,
    product_id,
    product_name,
    component_id,
    component_name,
    shipper_id,
    shipper_company_name,
    shipper_tier,
    consignee_id,
    consignee_company_name,
    [month],
    [year],
    invoice_quantity,
    invoice_amount,
    risk_type,
    score,
    risk_level,
    home_port_id,
    country,
    lat,
    lng
FROM
    gtosqldbdev.cortevadev2.Product_Network_VCN
WHERE 
        product_id  = 27;

-- Supplier Count By Region
select
    pnv.country ,
    count(DISTINCT pnv.shipper_id) as supplier_count
FROM
    cortevadev2.Product_Network_VCN pnv
WHERE  
        pnv.product_id  = 1021
    AND
    pnv.risk_type ='transport'
GROUP BY 
        pnv.country
order BY 
        pnv.country;

-- Risk Exposures Wise Top Suppliers 
select
    pnv.shipper_company_name,
    AVG(pnv.score) as Avg_score
FROM
    cortevadev2.Product_Network_VCN pnv
WHERE  
        pnv.product_id  = 1021
    AND
    pnv.risk_type ='transport'
GROUP BY 
        pnv.shipper_company_name
ORDER BY 
        AVG(pnv.score) DESC

-- Supplier Network
SELECT
    id,
    product_id,
    product_name,
    component_id,
    component_name,
    shipper_id,
    shipper_company_name,
    shipper_tier,
    consignee_id,
    consignee_company_name,
    [month],
    [year],
    invoice_quantity,
    invoice_amount,
    risk_type,
    score,
    risk_level,
    home_port_id,
    country,
    lat,
    lng,
    is_default
FROM
    gtosqldbdev.cortevadev2.Product_Network_VCN
WHERE 
                product_id = 1041
    AND
    shipper_id IN (1472,1578,2105)
    AND
    [year] IN (2021)
    AND
    country IN ('INDIA')


-- ++++++++++++++++++++MICRO CHARTS++++++++++++++++++
-- KPIs
-- total_spend

SELECT
    sum(pnv.invoice_amount) as total_spend,
    CASE
		WHEN pnv.[month] = 1 THEN 'JAN'
		WHEN pnv.[month] = 2 THEN 'FEB'
		WHEN pnv.[month] = 3 THEN 'MAR'
		WHEN pnv.[month] = 4 THEN 'APR'
		WHEN pnv.[month] = 5 THEN 'MAY'
		WHEN pnv.[month] = 6 THEN 'JUN'
		WHEN pnv.[month] = 7 THEN 'JUL'
		WHEN pnv.[month] = 8 THEN 'AUG'
		WHEN pnv.[month] = 9 THEN 'SEP'
		WHEN pnv.[month] = 10 THEN 'OCT'
		WHEN pnv.[month] = 11 THEN 'NOV'
		WHEN pnv.[month] = 12 THEN 'DEC'
	END AS Month,
    pnv.[year] as Year
from
    cortevadev2.Product_Network_VCN pnv
where
	pnv.product_id = 1031
    and pnv.risk_level = 'Low'
    and pnv.country  ='United States'
    and pnv.risk_type ='weather'
GROUP by
	pnv.product_id,
	pnv.[month],
	pnv.[year];

--revenue at risk

SELECT
    sum(pnv.invoice_amount) as Revenue_at_risk,
    CASE
		WHEN pnv.[month] = 1 THEN 'JAN'
		WHEN pnv.[month] = 2 THEN 'FEB'
		WHEN pnv.[month] = 3 THEN 'MAR'
		WHEN pnv.[month] = 4 THEN 'APR'
		WHEN pnv.[month] = 5 THEN 'MAY'
		WHEN pnv.[month] = 6 THEN 'JUN'
		WHEN pnv.[month] = 7 THEN 'JUL'
		WHEN pnv.[month] = 8 THEN 'AUG'
		WHEN pnv.[month] = 9 THEN 'SEP'
		WHEN pnv.[month] = 10 THEN 'OCT'
		WHEN pnv.[month] = 11 THEN 'NOV'
		WHEN pnv.[month] = 12 THEN 'DEC'
	END AS Month,
    pnv.[year] as Year
from
    cortevadev2.Product_Network_VCN pnv
where
	pnv.product_id = 1031
    and pnv.risk_level <> 'Low'
    and pnv.shipper_id = 1545
    and pnv.country  ='United States'
    and pnv.risk_type ='transport'
    and pnv.[year] = 2018
GROUP by
	pnv.product_id,
	pnv.[month],
	pnv.[year]
ORDER BY 
	pnv.[year]
;

-- supplier_at_risk

SELECT count(DISTINCT pnv.shipper_id) as supplier_at_risk,
    CASE
		WHEN pnv.[month] = 1 THEN 'JAN'
		WHEN pnv.[month] = 2 THEN 'FEB'
		WHEN pnv.[month] = 3 THEN 'MAR'
		WHEN pnv.[month] = 4 THEN 'APR'
		WHEN pnv.[month] = 5 THEN 'MAY'
		WHEN pnv.[month] = 6 THEN 'JUN'
		WHEN pnv.[month] = 7 THEN 'JUL'
		WHEN pnv.[month] = 8 THEN 'AUG'
		WHEN pnv.[month] = 9 THEN 'SEP'
		WHEN pnv.[month] = 10 THEN 'OCT'
		WHEN pnv.[month] = 11 THEN 'NOV'
		WHEN pnv.[month] = 12 THEN 'DEC'
	END AS Month
from cortevadev2.Product_Network_VCN pnv
where pnv.product_id  = 1021
    and pnv.risk_level <> 'Low'
    and pnv.country  ='United States'
    and pnv.risk_type ='transport'
    and pnv.[year] IN (2018)
GROUP by
	pnv.[month],
	pnv.[year]
;


--product_at_risk

SELECT
    count(DISTINCT pnv.component_id ) as product_at_risk,
    CASE
		WHEN pnv.[month] = 1 THEN 'JAN'
		WHEN pnv.[month] = 2 THEN 'FEB'
		WHEN pnv.[month] = 3 THEN 'MAR'
		WHEN pnv.[month] = 4 THEN 'APR'
		WHEN pnv.[month] = 5 THEN 'MAY'
		WHEN pnv.[month] = 6 THEN 'JUN'
		WHEN pnv.[month] = 7 THEN 'JUL'
		WHEN pnv.[month] = 8 THEN 'AUG'
		WHEN pnv.[month] = 9 THEN 'SEP'
		WHEN pnv.[month] = 10 THEN 'OCT'
		WHEN pnv.[month] = 11 THEN 'NOV'
		WHEN pnv.[month] = 12 THEN 'DEC'
	END AS Month,
    pnv.[year] as Year
from
    cortevadev2.Product_Network_VCN pnv
where
	pnv.shipper_id = 1545
    and pnv.risk_level <> 'Low'
    and pnv.country = 'United States'
    and pnv.risk_type = 'transport'
GROUP by
	pnv.product_id,
	pnv.[month],
	pnv.[year];
