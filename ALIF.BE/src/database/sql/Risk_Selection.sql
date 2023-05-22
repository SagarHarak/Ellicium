-- Get risk configuration information in Risk Selection
SELECT * FROM ${SQLSCHEMA}.tbl_risk_configuration trc

-- Update risk configuration information (value) in Risk Selection
UPDATE ${SQLSCHEMA}.tbl_risk_configuration SET value = @value WHERE id = @id