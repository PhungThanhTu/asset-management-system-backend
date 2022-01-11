use AssetsManagement
go

---------- INITIALIZE 
-- account
INSERT into Account (username,password) values('user',123456)
INSERT into Account (username,password) values('phungthanhtu','yasuo')

select * from Account
-- done get,post

-- Supplier --
INSERT INTO Supplier (name,address,phone) VALUES (N'Thế giới di động',N'khu phố 1, P. Tân Tạo, Q. Bình Tân, TP. HCM','18001061')
INSERT INTO Supplier (name,address,phone) VALUES (N'FPT Shop',N'261 - 263 Khánh Hội, P2, Q4, TP. Hồ Chí Minh','1800 6601')
INSERT INTO Supplier (name,address,phone) VALUES (N'Tin học ngôi sao',N'474 Điện Biên Phủ, P. 17, Q. Bình Thạnh, TP.HCM','08 99000001')
INSERT INTO Supplier (name,address,phone) VALUES (N'GearVN',N'78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình','1800 6975')
-----------------------------done get,post,patch,delete

-- unit
INSERT INTO device_unit (u_name,note) values (N'Bộ',N'Dùng để sử dụng')
INSERT INTO device_unit (u_name,note) values (N'Cái',N'Dùng để sửa chữa, thay thế')
------------------------------done get
-- type

INSERT INTO device_type (t_name,note) values (N'Case build sẵn',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Laptop',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Linh kiện',N'Dễ vỡ, cẩn thận trong vận chuyển')
INSERT INTO device_type (t_name,note) values (N'Khác',N'Dễ vỡ, cẩn thận trong vận chuyển')


select * from device_type
------------------------------------done get
-- Division
-- lưu ý, mọi thiết bị đều được mặc định thuộc về phòng quản trị thiết bị, muốn đưa cho các phòng ban khác phải
-- thông qua đơn chuyển giao
-- chỉ có phòng quản trị thiết bị là phòng ban duy nhất có loại phòng 'managing' còn lại đều là 'using'
insert into Division (name,type) values (N'Phòng quản trị thiết bị','Managing')
insert into Division (name,type) values (N'Phòng máy khoa CNPM','Using')
-------------------------------- done get

INSERT INTO Repairer (name,phone,address) values ('iFixit','035222222',N'KTX Khu B Đông Hòa Dĩ An Bình Dương')
INSERT INTO Repairer (name,phone,address) values ('Capcuumaytinh','035225662',N'Thành phố Thủ Đức')

select * from Repairer

INSERT INTO Personnel (name,position,division) values (N'Nguyễn Văn A',N'Trưởng phòng',1)
INSERT INTO Personnel (name,position,division) values (N'Hoàng Ngọc B',N'Phó phòng',1)
INSERT INTO Personnel (name,position,division) values (N'Nguyễn Trần Văn',N'Hiệu trưởng',1)
INSERT INTO Personnel (name,position,division) values (N'Bùi Minh Thịnh',N'Cán bộ 1',1)
INSERT INTO Personnel (name,position,division) values (N'Trương Xuân Tâm',N'Quản lí',2)
INSERT INTO Personnel (name,position,division) values (N'Lê Thanh Tuấn',N'Phó Quản lí',2)
INSERT INTO Personnel (name,position,division) values (N'Nguyễn Đức Thành Phát',N'Cán bộ',2)





