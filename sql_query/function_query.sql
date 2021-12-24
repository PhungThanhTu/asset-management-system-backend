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


