drop table if exists `mydb`.`Employee`;
drop table if exists `mydb`.`Pay Rates`;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM `mydb`.`Employee`;
DELETE FROM `mydb`.`Pay Rates`;

INSERT INTO `mydb`.`Pay Rates` (`idPay Rates`, `Pay Rate Name`, `Value`, `Tax Percentage`, `Pay Type`, `Pay Amount`, `PT - Level C`)
VALUES
(1,'Intern Basic Salary',4000000,5,1,3800000,1),
(2,'Junior Basic Salary',9000000,5,1,8550000,2),
(3,'Middle Basic Salary',15000000,10,1,13500000,3),
(4,'Sennior Basic Salary',21000000,10,1,18900000,4);

-- Inserting Employees
INSERT INTO `mydb`.`Employee` (`idEmployee`, `Employee Number`, `Last Name`, `First Name`, `SSN`, `Pay Rate`, `Pay Rates_idPay Rates`, `Vacation Days`, `Paid To Date`, `Paid Last Year`)
VALUES
(1,1,'Tran','Bach',7211224589,'10',4,11,8,1),
(2,2,'Tran','Ai',7203727354,'10',4,11,8,1),
(3,3,'Nguyen','Chi',7203727374,'10',4,0,20,1),
(4,4,'Dang','Hai',7211226501,'10',4,11,20,1),
(5,5,'Nguyen','Thao',7211239932,'10',4,5,20,1),
(6,6,'Le','Thao',7214753567,'10',4,5,20,1),
(7,7,'Trinh','Thien',7211235459,'10',4,4,5,1),
(8,8,'Le','Danh',7211122274,'10',4,4,5,1),
(9,9,'Nguyen','Nhan',7211200260,'10',4,4,5,1),
(10,10,'Ngo','Nhi',7205126897,'10',3,4,5,1),
(11,11,'Dinh','Tu',7204801106,'10',3,19,5,1),
(12,12,'Tran','Quynh',7204729844,'10',3,22,5,1),
(13,13,'Truong','Thi',7201202169,'10',3,1,1,1),
(14,14,'Tran','Duyen',7201235390,'10',3,3,1,1),
(15,15,'Vo','Yen',7201201584,'5',2,3,1,1),
(16,16,'Le','Hue',7202143711,'5',2,3,1,1),
(17,17,'Le','Thinh',7211242274,'5',2,3,1,1),
(18,18,'Dang','Nho',7211201219,'5',1,0,1,1),
(19,19,'Luu','Truong',7211240491,'5',1,0,1,1),
(20,20,'Tran','Thinh',7211245057,'5',1,0,1,1);