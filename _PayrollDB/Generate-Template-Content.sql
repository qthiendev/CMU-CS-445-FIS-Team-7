-- Insert dữ liệu vào bảng 'Pay Rates':
INSERT INTO `Pay Rates` (`idPay Rates`, `Pay Rate Name`, `Value`, `Tax Percentage`, `Pay Type`, `Pay Amount`, `PT - Level C`)
VALUES
(1, 'Hourly', 10.00, 5.00, 1, 20.00, 15.00),
(2, 'Salary', 20.00, 10.00, 2, 30.00, 25.00);
-- Insert dữ liệu vào bảng 'Employee':
INSERT INTO `Employee` (`idEmployee`, `Employee Number`, `Last Name`, `First Name`, `SSN`, `Pay Rate`, `Pay Rates_idPay Rates`, `Vacation Days`, `Paid To Date`, `Paid Last Year`)
VALUES
(1, 2001, 'Nguyen', 'Thi Huong', 1234567890, 'Hourly', 1, 10, 20, 15),
(2, 2002, 'Tran', 'Van Tuan', 2345678901, 'Salary', 2, 15, 25, 20),
(3, 2003, 'Le', 'Thi Lan', 3456789012, 'Hourly', 1, 12, 22, 18),
(4, 2004, 'Pham', 'Minh Anh', 4567890123, 'Salary', 2, 20, 30, 25),
(5, 2005, 'Hoang', 'Van Duc', 5678901234, 'Hourly', 1, 10, 20, 15),
(6, 2006, 'Vu', 'Thi Mai', 6789012345, 'Salary', 2, 15, 25, 20),
(7, 2007, 'Dang', 'Trong Thang', 7890123456, 'Hourly', 1, 12, 22, 18),
(8, 2008, 'Bui', 'Thi Kim Chi', 8901234567, 'Salary', 2, 20, 30, 25),
(9, 2009, 'Do', 'Quang Huy', 9012345678, 'Hourly', 1, 10, 20, 15),
(10, 2010, 'Ngo', 'Thi Hong', 1234567891, 'Salary', 2, 15, 25, 20);