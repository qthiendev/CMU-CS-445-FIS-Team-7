drop table if exists `mydb`.`Employee`;
drop table if exists `mydb`.`Pay Rates`;

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
	`Employee Number` int UNSIGNED not null,
	`Last Name` nvarchar(45) not null,
	`First Name` nvarchar(45) not null,
	`SSN` decimal(10,0) not null,
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
