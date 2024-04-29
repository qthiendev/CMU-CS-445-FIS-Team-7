drop database if exists `mydb`;
create database `mydb`;

create table `mydb`.`Pay Rates` (
	`idPay Rates` int not null,
	`Pay Rate Name` nvarchar(40) not null,
	`Value` decimal not null,
	`Tax Percentage` decimal not null,
	`Pay Type` int not null,
	`Pay Amount` decimal not null,
	`PT - Level C` decimal not null,
	primary key (`idPay Rates`)
);

create table `mydb`.`Employee`(
	`idEmployee` int not null,
	`Employee Number` nvarchar(45) not null,
	`Last Name` nvarchar(45) not null,
	`First Name` nvarchar(45) not null,
	`SSN` decimal(18,0) not null,
	`Pay Rate` nvarchar(40) null,
	`Pay Rates_idPay Rates` int not null,
	`Vacation Days` int null,
	`Paid To Date` decimal(2) null,
	`Paid Last Year` decimal(2) null,
    primary key (`Employee Number`, `Pay Rates_idPay Rates`),
	unique index `Employee Number_UNIQUE` (`Employee Number` ASC) VISIBLE,
    index `fk_Employee_Pay Rates_idx` (`Pay Rates_idPay Rates` ASC) VISIBLE,
    constraint `fk_Employee_Pay Rates` 
		foreign key (`Pay Rates_idPay Rates`) 
		references `mydb`.`Pay Rates` (`idPay Rates`)
        on delete no action
        on update no action
);

set SQL_SAFE_UPDATES = 0;

INSERT INTO `mydb`.`Pay Rates` (`idPay Rates`, `Pay Rate Name`, `Value`, `Tax Percentage`, `Pay Type`, `Pay Amount`, `PT - Level C`)
VALUES
(1,'Junior Developer Basic Salary',9900066,3,1,9603064,1),
(2,'Middle Developer Basic Salary',23006009,10,1,20705408,2),
(3,'Sennior Developer Basic Salary',37001337,10,1,33301203,3),
(4,'Accountant Basic Salary',9100000,3,1,8827000,4),
(5,'Chief Accountant Basic Salary',33044055,10,1,29739650,5),
(6,'Researcher Basic Salary',17006868,10,1,15306181,6),
(7,'Chief ResearcherBasic Salary',25007554,10,1,22506799,7);

-- Inserting Employees
INSERT INTO `mydb`.`Employee` (`idEmployee`, `Employee Number`, `Last Name`, `First Name`, `SSN`, `Pay Rate`, `Pay Rates_idPay Rates`, `Vacation Days`, `Paid To Date`, `Paid Last Year`)
VALUES
(1,'Gc863zrkxXsvpo1W','Trinh','Thien',27211235459,'1513691.1',3,1,5,1),
(2,'keDzKyIHZ7wCspN5','Tran','Thinh',27211245057,'1513691.1',3,1,5,1),
(3,'uBdzCEUGhODNoHJe','Luu','Truong',27211240491,'1513691.1',3,0,5,1),
(4,'LjaMZdQq47GIO0o5','Dang','Nho',27211201219,'1513691.1',3,2,5,1),
(5,'H1GspxOentPmYLK7','Nguyen','Nhan',27211200260,'1513691.1',3,1,5,1),
(6,'aPvmcqfUQiMdpkgl','Tran','Duyen',27201235390,'1351802.3',5,0,5,1),
(7,'mkCyUcTVXRN9S3q5','Tran','Bach',27211224589,'1023036.3',7,4,5,1),
(8,'r5RhxqKTwogn3mXD','Tran','Ai',27203727354,'401227.3',4,4,5,1),
(9,'0rNeZvaG1kJyKw5I','Nguyen','Chi',27203727374,'401227.3',4,0,5,1),
(10,'8Is0OQYE1JdHriw2','Dang','Hai',27211226501,'695735.5',6,3,5,1),
(11,'PVhWDQCHvswmITc3','Le','Thao',27214753567,'1513691.1',3,1,5,1),
(12,'TqC4v2UxJ8oFAl0M','Le','Danh',27211122274,'695735.5',6,22,5,1),
(13,'5Pxu2IVwLnEdvBQS','Ngo','Nhi',27205126897,'941154.9',2,0,5,1),
(14,'AHbxTpq6Xwuke8FW','Dinh','Tu',27204801106,'941154.9',2,0,5,1),
(15,'NoYP5Z2QWBTMbrjl','Nguyen','Trang',27201240484,'1850066.9',3,1,1,1),
(16,'Xst5MFyBxAHRK4Zv','Ho','Hieu',27211225652,'1850066.9',3,0,1,1),
(17,'QJXykxVYmahScv6i','Truong','Huu',27211238894,'1850066.9',3,0,1,1);