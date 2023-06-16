IF  EXISTS (SELECT * FROM sys.indexes WHERE NAME = N'unique_check') 
	DROP INDEX [unique_check] ON [dbo].[simplified_data]