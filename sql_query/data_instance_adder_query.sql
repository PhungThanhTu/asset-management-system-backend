use AssetsManagement
go

---------- INITIALIZE 
-- account
INSERT into Account (username,password) values('user',123456)
INSERT into Account (username,password) values('phungthanhtu','yasuo!1')

-- done get,post

-- Supplier --
INSERT INTO Supplier (name,address,phone) VALUES (N'Thế giới di động',N'khu phố 1, P. Tân Tạo, Q. Bình Tân, TP. HCM','18001061')
INSERT INTO Supplier (name,address,phone) VALUES (N'FPT Shop',N'261 - 263 Khánh Hội, P2, Q4, TP. Hồ Chí Minh','1800 6601')
INSERT INTO Supplier (name,address,phone) VALUES (N'Tin học ngôi sao',N'474 Điện Biên Phủ, P. 17, Q. Bình Thạnh, TP.HCM','08 99000001')
INSERT INTO Supplier (name,address,phone) VALUES (N'GearVN',N'78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình','1800 6975')
-----------------------------done get,post,patch,delete

-- unit
INSERT INTO device_unit (u_name,note) values ('Cái','Không')
------------------------------done get
-- type
INSERT INTO device_type (t_name,note) values (N'Màn hình',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Chuột',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Bàn phím',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Vỏ case',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Nguồn',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'RAM',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Ổ cứng',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Main',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Quạt',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Loa',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'CPU',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'GPU',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'LAPTOP',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Case build sẵn',N'Dễ vỡ, cẩn thận trong vận chuyển')


select * from device_type
------------------------------------done get
-- Division
-- lưu ý, mọi thiết bị đều được mặc định thuộc về phòng quản trị thiết bị, muốn đưa cho các phòng ban khác phải
-- thông qua đơn chuyển giao
-- chỉ có phòng quản trị thiết bị là phòng ban duy nhất có loại phòng 'managing' còn lại đều là 'using'
insert into Division (name,type) values (N'Phòng quản trị thiết bị','Managing')
insert into Division (name,type) values (N'Phòng máy khoa CNPM','Using')
-------------------------------- done get
select * from Division
---- bỏ device set

---------- END INITIALIZE


-- Contracts --

-- remember, date format is YYYY-mm-dd
INSERT INTO Contracts (import_date,price,supplier) VALUES ('2014-10-14',0,1)
INSERT INTO Contracts (import_date,price,supplier) VALUES ('2021-12-16',0,4)

-----------------------------done get,post,patch,delete

INSERT INTO Repairer (name,phone,address) values ('iFixit','035222222','KTX Khu B Đông Hòa Dĩ An Bình Dương')







-- fix bug format
SELECT getdate() as date
GO




select * from device_type


select * from Devices

-- Device --
INSERT INTO Devices (name,price,specification,production_year,implement_year,status,annual_value_lost,contract_id,unit,type,set_id,current_value,holding_division)
values (N'Màn hình samsung',750000,N'Màn hình 720p',2012,2014,'Used',0.1,1,1,1,2,250000,1)

delete from Devices

select * from Devices