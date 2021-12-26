drop table Account
drop table Contracts
drop table Device
drop table Division
drop table Personnel
drop table Repairer
drop table Supplier
drop table Types
drop table Unit

-- ACCOUNT
-- get all account
select * from Account
-- SUPPLIER
-- clear supplier table
truncate table Supplier
-- get all supplier
select * from Supplier

-- CONTRACTS
-- turn on auto increment
SET IDENTITY_INSERT Contracts ON
-- get all contracts
select * from Contracts
-- clear contracts table
truncate table contracts
-- delete contracts table
drop table contracts
-- DEVICE UNIT
select * from device_unit
truncate table device_unit
-- DEVICE TYPE
select * from device_type
truncate table device_type
-- DIVISION
select * from Division
truncate table Division

-- DEVICE
select * from Devices

SELECT IDENT_CURRENT('Contracts') as id

truncate table Devices

DECLARE @json nvarchar(max) = N'[
	{
		"name": "Case Corsair provjp",
		"price": 350000,
		"specification":"Xung nhịp 2.5 GHz",
		"production_year":2014,
		"implement_year":2014,
		"status": "New",
		"annual_value_lost": 0.1,
		"contract_id": 1,
		"unit": 1,
		"type": 12,
		"set_id": 1,
		"current_value": 15000000,
		"holding_division": 2
	}
]'

INSERT INTO Devices (name,price,specification,production_year,implement_year,status,annual_value_lost,contract_id,unit,type,set_id,current_value,holding_division) 
            SELECT name,price,specification,production_year,implement_year,status,annual_value_lost,contract_id,unit,type,set_id,current_value,holding_division
            FROM OpenJson(@json) WITH( 
            name nvarchar(50) '$.name',
            price money '$.price',
            specification nvarchar(50) '$.specification',
			production_year int '$.production_year',
			implement_year int '$.implement_year',
			status nvarchar(50) '$.status',
			annual_value_lost float '$.annual_value_lost',
			contract_id int '$.contract_id',
			unit int '$.unit',
			type int '$.type',
			set_id int '$.set_id',
			current_value money '$.current_value',
			holding_division int '$.holding_division'
			)

