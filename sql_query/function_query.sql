drop table Device_set
drop table Account
drop table Contracts
drop table Device
drop table Division
drop table Personnel
drop table Repairer
drop table Supplier
drop table Types
drop table Unit
drop table Devices

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
select * from Division
select * from device_unit
select * from device_type

select Devices.id,Devices.name,Devices.price, Devices.specification, Devices.production_year, Devices.implement_year, Devices.status,
Devices.annual_value_lost,Devices.contract_id,Division.name as holding_division,Division.type as division_type, device_unit.u_name as unit, device_type.t_name as type,
device_type.note as note, Devices.current_value
												from Devices,Division,device_unit,device_type where
														Devices.holding_division = Division.id and
														Devices.unit = device_unit.id and
														Devices.type = device_type.id
														
SELECT IDENT_CURRENT('Contracts') as id

truncate table Devices


--- Devices
DECLARE @json nvarchar(max) = N'[
	{
		"name": "Case Corsair provjp",
		"price": 350000,
		"specification":"Xung nhịp 2.5 GHz",
		"production_year":2014,
		"implement_year":2014,
		"status": "New",
		"annual_value_lost": 0.1,
		"contract_id": 7,
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



DECLARE @json nvarchar(max) = N'{
		"transfer":{
			
			"sender": 2,
			"receiver": 1,
			"transfer_date": "2020-04-15"
		},
		"devices" : [
		{
			"id" : 1
		},
		{
			"id": 2
		}
		]		
}'
go

-- new transfer using json
CREATE PROCEDURE createNewTransfer @json nvarchar(max)
as
insert into Transfers (sender,receiver,transfer_date)
					select sender,receiver,transfer_date 
					from openjson(@json,'$.transfer') with
					(
						sender int '$.sender',
						receiver int '$.receiver',
						transfer_date date '$.transfer_date'
					)

DECLARE @new_transfer_id int 
SELECT @new_transfer_id = IDENT_CURRENT('Transfers') 


insert into Detailed_Transfers (transfers,device) 
			select @new_transfer_id as transfers,id as device from openjson(@json,'$.devices') with
(
	id int '$.id'
)

update Devices 
SET Devices.holding_division = ( select receiver from openjson(@json,'$.transfer') with
								(
									sender int '$.sender',
									receiver int '$.receiver',
									transfer_date date '$.transfer_date'
								))
FROM Devices 
	JOIN openjson(@json,'$.devices') with
(
	id int '$.id'
)	newdevices
ON Devices.id = newdevices.id
go






select * from Devices
select Transfers.id,S.name as sender_name, R.name as receiver_name,Transfers.transfer_date from Transfers,Division S,Division R
			where Transfers.sender = S.id and Transfers.receiver = R.id

select id,name,specification,price from Detailed_Transfers,Devices where 
												Detailed_Transfers.device = Devices.id
												and Detailed_Transfers.transfers = 1


--- check devices

DECLARE @check nvarchar(max) = N'{
		"check": {
			"check_date" : "2014-05-12"	
		},
		"detail" :[
			{
				"id": 1,
				"division" : 1,
				"status" : "Used",
				"current_value" : 130000
			},
			{
				"id": 2,
				"division" : 1,
				"status" : "Used",
				"current_value" : 150000
			}
		]
}'

go
-- check device status using json
CREATE PROCEDURE checkDeviceStatus @check nvarchar(max)
as
--- insert check log table
insert into Check_log (check_date)
					select check_date 
					from openjson(@check,'$.check') with
					(
						check_date date '$.check_date'
					)
-- insert check log detail
DECLARE @new_log_id int
SELECT @new_log_id = IDENT_CURRENT('Check_log') 

insert into Check_log_detail (check_log_id,device,division,status,current_value)
			select @new_log_id as check_log_id,device,division,status,current_value from openjson(@check,'$.detail') with
(
	device int '$.id',
	division int '$.division',
	status nvarchar(50) '$.status',
	current_value money '$.current_value'
) 

-- update device information
UPDATE Devices
SET    status = device_data.status,
       current_value = device_data.current_value
FROM   Devices
JOIN   OPENJSON(@check, '$.detail')
       WITH (
	   id int '$.id',
	   status nvarchar(50) '$.status',
	   current_value money '$.current_value'
	   ) device_data
       ON Devices.id = device_data.id
go

select * from Devices
select * from Check_log
select * from Check_log_detail


------- inventory JSON request body

DECLARE @inventory nvarchar(max)
set @inventory = '{
	"personnel" : [
		{
			"id": 1
		},
		{
			"id": 2
		}
	],
	"check_detail" : {
		"check": {
			"check_date" : "2014-05-12"	
		},
		"detail" :[
			{
				"id": 1,
				"division" : 1,
				"status" : "Need Liquidating",
				"current_value" : 130000
			},
			{
				"id": 2,
				"division" : 1,
				"status" : "Used",
				"current_value" : 150000
			},
			{
				"id": 3,
				"division" : 1,
				"status" : "Used",
				"current_value" : 150000
			},
			{
				"id": 4,
				"division" : 1,
				"status" : "Need Liquidating",
				"current_value" : 150000
			},
			{
				"id": 5,
				"division" : 1,
				"status" : "Used",
				"current_value" : 150000
			}
		]
	}
}'



declare @check_detail nvarchar(max)
select @check_detail = JSON_QUERY(@inventory,'$.check_detail')
 

EXEC checkDeviceStatus @check = @check_detail


declare @curr_check_id int

select @curr_check_id = IDENT_CURRENT('Check_log')

insert into Inventory values (@curr_check_id)

declare @curr_inv_id int
select @curr_inv_id  = IDENT_CURRENT('Inventory')

insert into Detailed_Inventory_Personnel (inventory,personnel)
	select @curr_inv_id as inventory,id as personnel from openjson(@inventory,'$.personnel') with
(
	id int '$.id'
)

select device as id,name,Check_log_detail.division,Check_log_detail.status,Check_log_detail.current_value from Check_log_detail,Devices where Devices.id = Check_log_detail.device and check_log_id = 7
   

--- get inventory list
select Inventory.id, check_date as inventory_date from Inventory, Check_log where Inventory.check_log = Check_log.id
--- get inventory result detail
select device as id,name,Check_log_detail.division,Check_log_detail.status,Check_log_detail.current_value from Check_log_detail,Devices,Inventory where Devices.id = Check_log_detail.device and  Inventory.check_log = Check_log_detail.check_log_id and Inventory.id = 1
--- get inventory personnel detail
select Personnel.id as id,Personnel.name, position, Division.name as division from Detailed_Inventory_Personnel,Personnel,Division where personnel = Personnel.id and Division.id = Personnel.division and Detailed_Inventory_Personnel.inventory = 1