



create table Account
(
	id int identity(1,1) primary key,
	username varchar(50),
	password varchar(50)
)
go

create table Supplier
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	address nvarchar(100),
	phone varchar(50)
)
go

create table Contracts
(
	id int identity(1,1) primary key,
	supplier int,
	price money,
	import_date date
	foreign key (supplier) references Supplier(id)
)
go

create table device_unit
(
	id int identity(1,1) primary key,
	u_name nvarchar(20),
	note nvarchar(50)
)
go

create table device_type
(
	id int identity(1,1) primary key,
	t_name nvarchar(20),
	note nvarchar(50)
)
go

create table Division
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	type nvarchar(20),
	constraint chk_type
	CHECK (type in ('Using','Managing'))
)
go

create table Devices
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	price money,
	specification nvarchar(50),
	production_year int,
	implement_year int,
	status nvarchar(50),
	annual_value_lost float,
	contract_id int not null,
	holding_division int,
	unit int,
	type int,
	current_value money

	foreign key (contract_id) references Contracts(id),
	foreign key (holding_division) references Division(id),
	foreign key (unit) references device_unit(id),
	foreign key (type) references device_type(id),
)
go


create trigger on_insert_contract on Contracts for insert
as
begin
	declare @contract_id int
	select @contract_id = id from inserted

	update Contracts set price = 0 where id = @contract_id
	PRINT('Inserted contract price is set to 0')
end
go

create trigger on_insert_update_devices on Devices for insert,update
as
begin
	declare @contract_id int
	declare @sum_money money
	select @contract_id = contract_id from inserted
	select @sum_money = sum(price) from Devices where contract_id = @contract_id
	
	update Contracts set price = @sum_money where id = @contract_id
end
go

create trigger current_value_based_on_year on Devices for update
as
	begin
		declare @id int
		select @id = id from inserted
		update Devices set current_value = price - price * (YEAR(GETDATE()) - implement_year)*annual_value_lost
		update Devices set Devices.status = 'Need Liquidating' where  current_value/price <= 0.5 and status in('Used')
	end
go

go

create trigger on_delete_devices on Devices for delete
as
begin
	declare @contract_id int
	declare @sum_money money
	select @contract_id = contract_id from deleted
	select @sum_money = sum(price) from Devices where contract_id = @contract_id

	update Contracts set price = @sum_money where id = @contract_id
end
-- division trigger
	-- when insert a device, its set id is 1 and division id is 1

create table Transfers
(
	id int identity(1,1) primary key,
	sender int,
	receiver int,
	transfer_date date,

	foreign key (sender) references Division(id),
	foreign key (receiver) references Division(id)
)
go

create table Transfers
(
	id int identity(1,1) primary key,
	sender int,
	receiver int,
	transfer_date date,

	foreign key (sender) references Division(id),
	foreign key (receiver) references Division(id)
)

create table Detailed_Transfers
(
	transfers int,
	device int

	foreign key (transfers) references Transfers(id),
	foreign key (device) references Devices(id),
	primary key (transfers,device)
)
go
--- done

create table Check_log
(
	id int identity(1,1) primary key,
	check_date date,
)
create table Check_log_detail
(
	check_log_id int,
	device int,
	division int,
	status nvarchar(50),
	current_value money

	foreign key (check_log_id) references Check_log(id),
	foreign key(device) references Devices(id),
	foreign key (division) references Division(id),
	primary key (check_log_id,device)
)
go
create trigger on_insert_checklog_detail on Check_log_detail for insert
as
	begin
	-- declare
		declare @log_id int
		declare @device_id int
		declare @check_year int
		declare @implement_year int
		declare @current_value money
		declare @annual_value_lost float
		declare @price money
	-- select
		select @log_id = check_log_id from inserted
		select @device_id = device from inserted
		select @check_year =  YEAR(check_date) from Check_log where id = @log_id
		select @price = price from Devices where id = @device_id
		select @implement_year = implement_year from Devices where id = @device_id
		select @annual_value_lost = annual_value_lost from Devices where id = @device_id
		select @current_value = @price - @price*(@check_year-@implement_year)*@annual_value_lost
		update Check_log_detail set current_value = @current_value where check_log_id = @log_id and device = @device_id
	end
go

create table Personnel
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	position nvarchar(50),
	division int not null

	foreign key (division) references Division(id)
)
go

create table Inventory
(
	id int identity(1,1) primary key,
	check_log int,

	foreign key (check_log) references Check_log(id)
)
go

create table Detailed_Inventory_Personnel
(
	inventory int,
	personnel int

	foreign key (inventory) references Inventory(id),
	foreign key (personnel) references Personnel(id),
	primary key (inventory,personnel)
)
go

create table Liquidation
(
	id int identity(1,1) primary key,
	check_log int,
	foreign key (check_log) references Check_log(id)
)
go

create table Detailed_liquidation_personnel
(
	liquidation int,
	personnel int

	foreign key (liquidation) references Liquidation(id),
	foreign key (personnel) references Personnel(id),
	primary key (liquidation,personnel)
)
go

create table Repairer
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	phone varchar(20),
	address nvarchar(100)
)
go

create table Repair_bill
(
	id int identity(1,1) primary key,
	repairer int,
	repair_date date,
	sum_money money,

	foreign key (repairer) references Repairer(id)
)

create table Repair_bill_detail
(
	bill int,
	device int,
	price money

	foreign key (bill) references Repair_bill(id),
	foreign key (device) references Devices(id),
	primary key (bill,device)
)
go

create trigger on_repair on Repair_bill_detail for insert,update
as
begin
	declare @bill int
	declare @sum_money money
	select @bill = bill from inserted
	select @sum_money = sum(price) from Repair_bill_detail where bill = @bill
	
	update Repair_bill set sum_money = @sum_money where id = @bill
end
go






