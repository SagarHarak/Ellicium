IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'TR' AND name = 'update_parent_project_code_logic')
BEGIN
   exec('CREATE TRIGGER update_parent_project_code_logic
ON
target.dim_project
after
UPDATE
	AS
    IF (
	Update
		(parent_project_id) )
BEGIN
		UPDATE
	target.dim_project
SET
	parent_project_code = (
	SELECT
		dp2.project_code
	FROM
		target.dim_project dp2,
		inserted i
	WHERE
		dp2.id = i.parent_project_id)
FROM
	Inserted i
WHERE
	target.dim_project.id = i.id
END;')
END





IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'TR' AND name = 'project_code_logic')
BEGIN
exec(' CREATE TRIGGER project_code_logic ON target.dim_project AFTER INSERT AS '+
' BEGIN '+
' UPDATE target.dim_project SET project_code = CONVERT( VARCHAR, i.article_id ) + ''-'' + country_table.iso2 + ''-'' + CONVERT( VARCHAR, R.new_code ) FROM inserted i, '+
' (
SELECT target.dim_country.NAME, iso2 '+
' FROM target.dim_country, inserted i '+
' WHERE target.dim_country.NAME = i.country
) AS country_table, (
'+
' SELECT '+
' CASE '+
' WHEN COUNT( * ) >1 '+
' THEN (
'+
' SELECT MAX( CAST( RIGHT( project_table.project_code, Patindex(
''%[^0-9]%'', REVERSE( project_table.project_code ) ) -1 ) AS INT )
) +1 '+
' FROM target.dim_project AS project_table, inserted i '+
' WHERE project_table.country = i.country '+
' AND project_table.article_id = i.article_id
) '+
' ELSE ''1'' '+
' END AS new_code '+
' FROM target.dim_project, inserted i '+
' WHERE target.dim_project.country = i.country '+
' AND target.dim_project.article_id = i.article_id
) AS R '+
' WHERE i.id = target.dim_project.id; '+

' END ')
END





IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'TR' AND name = 'default_project_logic')
  BEGIN
 exec('CREATE TRIGGER default_project_logic
ON
target.dim_project
after
INSERT
	AS
BEGIN
		DECLARE @count INT
SELECT
	@count = COUNT(*)
FROM
	target.dim_project,
	Inserted i
WHERE
	(target.dim_project.article_id = i.article_id
		AND target.dim_project.country = i.country)

IF @count = 1
BEGIN
UPDATE
	target.dim_project
SET
	is_final = 1
from
	Inserted i
where
	target.dim_project.id = i.id
END
END
;')
END




IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'TR' AND name = 'project_code_logic_country_update')
  BEGIN
  exec(' CREATE TRIGGER project_code_logic_country_update ON target.dim_project AFTER UPDATE AS IF( UPDATE (
country
) ) BEGIN UPDATE target.dim_project SET project_code = ''project-code'' FROM inserted i WHERE i.id = target.dim_project.id; '+

' UPDATE target.dim_project SET project_code = CONVERT( VARCHAR, i.article_id ) + ''-'' + country_table.iso2 + ''-'' + CONVERT( VARCHAR, R.new_code ) FROM inserted i, '+
' (
SELECT target.dim_country.NAME, iso2 '+
' FROM target.dim_country, inserted i '+
' WHERE target.dim_country.NAME = i.country
) AS country_table, (
'+
' SELECT '+
' CASE '+
' WHEN COUNT( * ) >1 '+
' THEN (
'+
' SELECT MAX( CAST( RIGHT( project_table.project_code, Patindex(
''%[^0-9]%'', REVERSE( project_table.project_code ) ) -1 ) AS INT )
) +1 '+
' FROM target.dim_project AS project_table, inserted i '+
' WHERE project_table.country = i.country '+
' AND project_table.article_id = i.article_id
) '+
' ELSE ''1'' '+
' END AS new_code '+
' FROM target.dim_project, inserted i '+
' WHERE target.dim_project.country = i.country '+
' AND target.dim_project.article_id = i.article_id
) AS R '+
' WHERE i.id = target.dim_project.id; '+

' END ; ')
END

