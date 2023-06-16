CREATE procedure log.log_message_detailed
@batch_id int,
@procedure_name varchar(100) = '',
@message varchar(max)as begin
IF (XACT_STATE()) = -1
BEGIN
PRINT 'The transaction is in an uncommittable state.' +
' Rolling back transaction.'
ROLLBACK TRANSACTION;
begin transaction
END; if @message is null
set @message = '(No message)' print '[' + convert(varchar(50),getdate(),121) + '] Batch: ' + convert(varchar(50),@batch_id) + '. Message: ' + @message
insert into log.[etl_log_detailed]
(Batch_Id, [created_at], created_by, procedure_name, message)
values
(@Batch_id, getdate(), user_name(),@procedure_name, @message)end
