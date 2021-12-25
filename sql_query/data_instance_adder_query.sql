use AssetsManagement
go
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
-- Contracts --

-- remember, date format is YYYY-mm-dd
INSERT INTO Contracts (import_date,price,supplier) VALUES ('2014-10-14',0,1)
INSERT INTO Contracts (import_date,price,supplier) VALUES ('2021-12-16',0,4)

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
INSERT INTO device_type (t_name,note) values (N'HDD',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'SSD',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Main',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Quạt',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Loa',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'CPU',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'GPU',N'Dễ vỡ, cẩn thận trong vận chuyển')
------------------------------------done get
-- Division
-- lưu ý, mọi thiết bị đều được mặc định thuộc về phòng quản trị thiết bị, muốn đưa cho các phòng ban khác phải
-- thông qua đơn chuyển giao
-- chỉ có phòng quản trị thiết bị là phòng ban duy nhất có loại phòng 'managing' còn lại đều là 'using'
insert into Division (name,type) values (N'Phòng quản trị thiết bị','Managing')
insert into Division (name,type) values (N'Phòng máy khoa CNPM','Using')









-- fix bug format
SELECT getdate() as date
GO




select * from Division
-- Device_Set --
INSERT INTO Device_Set (name) VALUES (N'PC văn phòng')
INSERT INTO Device_Set (name) VALUES (N'PC ASUS ROG Strix')





-- Device --
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'Màn hình samsung',750000)
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'CPU intel pentium 4',350000)
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'Chuột OEM',70000)
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'Bàn phím OEM',135000)
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'Case',700000)
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'Nguồn',300000)
INSERT INTO Device (contract,set_id,name,price) VALUES (1,1,N'Main',300000)

INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Case Asus Rog Strix Helios GX 601',7900000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Main Asus Rog Strix B365-G GAMING',2000000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Nguồn Asus Rog Strix 650W',3800000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'GPU RTX 3060Ti',22000000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'CPU Intel core i5 11400F',6000000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'RAM Samsung DDR4 16GB',2000000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'SSD Samsung EVO 970 Plus',3100000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Quạt tản nhiệt CPU cooler master t40',300000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Quạt tản nhiệt CPU cooler master t40',300000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Quạt tản nhiệt CPU cooler master t40',300000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Bàn phím AKKO 3087 vs DS Midnight',1200000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Chuột Microsoft Arc Mouse',2400000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Màn hình Asus ROG Strix XG27WQ 2K 165Hz',12000000)
INSERT INTO Device (contract,set_id,name,price) VALUES (2,2,N'Dàn loa Sony 5.1 HT-S20R 400W',4000000)

select * from Device