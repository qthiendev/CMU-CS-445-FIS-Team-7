-- Ensure queried the 'Generate.sql' before.
-- This is origin data for testing
-- Create and modify by Trinh Quy Thien 
-- Last modified [13/03/2024 01:50]

USE [HumanResourceDB]

DELETE FROM [dbo].[__MigrationHistory]
DELETE FROM [dbo].[Emergency_Contacts]
DELETE FROM [dbo].[Employment]
DELETE FROM [dbo].[Job_History]
DELETE FROM [dbo].[Personal]
DELETE FROM [dbo].[Benefit_Plans]

SET IDENTITY_INSERT [dbo].[Benefit_Plans] ON
INSERT INTO [dbo].[Benefit_Plans] ([Benefit_Plan_ID], [Plan_Name], [Deductable], [Percentage_CoPay])
VALUES 
(1, N'Health Insurance', 20, 0);
SET IDENTITY_INSERT [dbo].[Benefit_Plans] OFF

INSERT INTO [dbo].[Personal] ([Employee_ID], [First_Name], [Last_Name], [Middle_Initial], [Address1], [Address2], [City], [State], [Zip], [Email], [Phone_Number], [Social_Security_Number], [Drivers_License], [Marital_Status], [Gender], [Shareholder_Status], [Benefit_Plans], [Ethnicity])
VALUES 
(1, N'Thiện', N'Trịnh', N'Quý', N'Thanh Khê', NULL, N'Đà Nẵng', NULL, 50000, N'trinhquythien.dev@gmail.com', N'0395075100', 067203000663, NULL, 'Single', 1, 0, 1, 'Kinh'),
(2, N'Thịnh', N'Trần', N'Viết', N'Thanh Khê', NULL, N'Đà Nẵng', NULL, 50000, N'tranvietthinh86@gmail.com', N'0935945480', 067203000663, NULL, 'Single', 1, 0, 1, 'Kinh'),
(3, N'Nhân', N'Nguyễn', N'Thành', N'Thanh Khê', NULL, N'Đà Nẵng', NULL, 50000, N'nguyenthanhnhan110503@gmail.com', N'0379740995', 067203000663, NULL, 'Single', 1, 0, 1, 'Kinh'),
(4, N'Nhớ', N'Đặng', N'Văn', N'Thanh Khê', NULL, N'Đà Nẵng', NULL, 50000, N'dangvannho7@gmail.com', N'0773688203', 067203000663, NULL, 'Single', 1, 0, 1, 'Kinh'),
(5, N'Trường', N'Lưu', N'Văn', N'Thanh Khê', NULL, N'Đà Nẵng', NULL, 50000, N'trinhquythien.dev@gmail.com', N'0363611957', 067203000663, NULL, 'Single', 1, 0, 1, 'Kinh');


SELECT * FROM [dbo].[__MigrationHistory]
SELECT * FROM [dbo].[Emergency_Contacts]
SELECT * FROM [dbo].[Employment]
SELECT * FROM [dbo].[Job_History]
SELECT * FROM [dbo].[Personal]
SELECT * FROM [dbo].[Benefit_Plans]