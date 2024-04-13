-- Inserting Pay Rates
INSERT INTO `mydb`.`Pay Rates` (`idPay Rates`, `Pay Rate Name`, `Value`, `Tax Percentage`, `Pay Type`, `Pay Amount`, `PT - Level C`)
VALUES
(1, 'Hourly Rate', 15.00, 10, 1, 0, 0),
(2, 'Monthly Salary', 3000.00, 5, 2, 0, 0);

-- Inserting Employees
INSERT INTO `mydb`.`Employee` (`idEmployee`, `Employee Number`, `Last Name`, `First Name`, `SSN`, `Pay Rate`, `Pay Rates_idPay Rates`, `Vacation Days`, `Paid To Date`, `Paid Last Year`)
VALUES
(1, 1001, 'Nguyen', 'Thanh Nhan', 1234567890, 'Hourly Rate', 1, 10, 0, 0),
(2, 1002, 'Nguyen', 'Thi Thanh', 2345678901, 'Monthly Salary', 2, 15, 0, 0),
(3, 1003, 'Tran', 'Van Nam', 3456789012, 'Hourly Rate', 1, 12, 0, 0),
(4, 1004, 'Le', 'Thi Hoa', 4567890123, 'Monthly Salary', 2, 20, 0, 0),
(5, 1005, 'Pham', 'Van Hieu', 5678901234, 'Hourly Rate', 1, 8, 0, 0),
(6, 1006, 'Hoang', 'Thi Mai', 6789012345, 'Hourly Rate', 1, 14, 0, 0),
(7, 1007, 'Vu', 'Van Dung', 7890123456, 'Monthly Salary', 2, 18, 0, 0),
(8, 1008, 'Do', 'Thi Thu', 8901234567, 'Hourly Rate', 1, 10, 0, 0),
(9, 1009, 'Nguyen', 'Van Hoa', 9012345678, 'Hourly Rate', 1, 16, 0, 0),
(10, 1010, 'Tran', 'Thi An', 1239876543, 'Monthly Salary', 2, 22, 0, 0),
(11, 1011, 'Le', 'Van Thang', 2348765432, 'Hourly Rate', 1, 10, 0, 0);