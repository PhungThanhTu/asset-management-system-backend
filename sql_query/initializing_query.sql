drop database AssetsManagement 
create database AssetsManagement
go

use AssetsManagement
go

-- tables


-- login

create table Account
(
	id int identity(1,1) primary key,
	username varchar(50),
	password varchar(50)
)
go
-- contracts and devices
create table Supplier
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	address nvarchar(50),
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

-- Đơn vị chỉ có 2 loại, đó là Quản lí và Sử dụng, các thiết bị mới nhập về luôn là từ phòng quản lí
create table Division
(
	id int identity(1,1) primary key,
	name nvarchar(50),
	type nvarchar(20),
	constraint chk_type
	CHECK (type in ('Using','Managing'))
)
go

create table device_unit
(
	id int identity(1,1) primary key,
	u_name nvarchar(20),
	note nvarchar(50)
)
go
-- đặt tên sao cho không trùng keyword của mssql
create table device_type
(
	id int identity(1,1) primary key,
	t_name nvarchar(20),
	note nvarchar(50)
)
go

create table Device_Set
(
	id int identity(1,1) primary key,
	name nvarchar(20)
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
	set_id int not null,
	current_value int

	foreign key (contract_id) references Contracts(id),
	foreign key (holding_division) references Division(id),
	foreign key (unit) references device_unit(id),
	foreign key (type) references device_type(id),
	foreign key (set_id) references Device_Set(id)
)
go

-- contract trigger
	-- when insert a contract, its initial price is zero
create trigger on_insert_contract on Contracts for insert
as
begin
	declare @contract_id int
	select @contract_id = id from inserted

	update Contracts set price = 0 where id = @contract_id
	PRINT('Inserted contract price is set to 0')
end
	-- will calculate sum of all products in one contract
create trigger on_insert_update_devices on Devices for insert,update
as
begin
	declare @contract_id int
	declare @sum_money money
	select @contract_id = contract_id from inserted
	select @sum_money = sum(price) from Devices where contract_id = @contract_id
	
	update Contracts set price = @sum_money where id = @contract_id
end

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


-- 


create table Repairer
(
	id int identity(1,1) primary key,
	name nvarchar(50)
)
go








create table Personnel
(
	id int identity(1,1) primary key,
	name nvarchar(20),
	position varchar(20),
	division int not null

	foreign key (division) references Division(id)
)
go



create table Inventory
(
	id int identity(1,1) primary key,
	date date
)
go

create table Detailed_Inventory
(
	remaining_value int,
	inventory int,
	device int

	foreign key (inventory) references Inventory(id),
	foreign key (device) references Device(id),
	primary key (inventory,device)
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
	date date
)
go

create table Detailed_Liquidation
(
	liquidation int,
	device int

	foreign key (liquidation) references Liquidation(id),
	foreign key (device) references Device(id),
	primary key (liquidation,device)
)
go

create table Detailed_Liquidation_Personnel
(
	liquidation int,
	personnel int

	foreign key (liquidation) references Liquidation(id),
	foreign key (personnel) references Personnel(id),
	primary key (liquidation,personnel)
)
go

create table Transfers
(
	id int identity(1,1) primary key,
	sender int,
	receiver int

	foreign key (sender) references Division(id),
	foreign key (receiver) references Division(id)
)
go

create table Detailed_Transfers
(
	transfers int,
	device int

	foreign key (transfers) references Transfers(id),
	foreign key (device) references Device(id),
	primary key (transfers,device)
)
go

create table Fix
(
	id int identity(1,1) primary key,
	decide_id int,
	date date,
	repairer int,
	total real null
)
go

create table Detailed_Fix
(
	fix int,
	device int,
	fee real

	foreign key (fix) references Fix(id),
	foreign key (device) references Device(id),
	primary key (fix,device)
)
go

Select Sum(fee) as "Tong chi phi" FROM Detailed_Fix GROUP BY fix
ALTER TABLE Fix
ADD CONSTRAINT CHK_Total CHECK (total = 'Tong chi phi')

create table Worth
(
	id int identity(1,1) primary key,
	date date
)

create table Deatiled_Worth
(
	worth int,
	device int,
	status nvarchar(50)

	foreign key (worth) references Worth(id),
	foreign key (device) references Device(id),
	primary key (worth,device)
)
go