-- Get suppliers information for Top Selection
SELECT DISTINCT shipper_id, shipper_company_name, shipper_tier, lat, lng, country, iso2 FROM cortevadev2.Product_Network_VCN pnv;

-- Get list of countries for Top Selection
SELECT DISTINCT country, iso2 FROM cortevadev2.Product_Network_VCN pnv;