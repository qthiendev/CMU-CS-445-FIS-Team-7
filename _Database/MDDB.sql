USE [master]
Go
IF  EXISTS (SELECT * FROM sys.databases WHERE name = 'ManagerDashboardDB')
alter database [ManagerDashboardDB] set single_user with rollback immediate
IF  EXISTS (SELECT * FROM sys.databases WHERE name = 'ManagerDashboardDB')
DROP DATABASE [ManagerDashboardDB]
GO
CREATE DATABASE [ManagerDashboardDB]
GO
IF  EXISTS (SELECT * FROM sys.databases WHERE name = 'ManagerDashboardDB')
USE [ManagerDashboardDB]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF  EXISTS (SELECT * FROM sys.databases WHERE name = 'ManagerDashboardDB')
DROP TABLE [dbo].[USERS]
CREATE TABLE [dbo].[USERS](
	[USER_ID] [numeric](18, 0) NOT NULL PRIMARY KEY,
	[USER_ACCOUNT] [nvarchar](50) NOT NULL UNIQUE,
	[USER_PASSWORD] [nvarchar](26) NOT NULL,
)
INSERT INTO [dbo].[USERS] ([USER_ID], [USER_ACCOUNT], [USER_PASSWORD])
VALUES
(1, N'qthiendev', N'123456'),
(2, N'tranthinh', N'123456'),
(3, N'ntn105', N'123456'),
(4, N'lvt456', N'123456'),
(5, N'nhodang', N'123456');

IF  EXISTS (SELECT * FROM sys.databases WHERE name = 'PLAN_CHANGES')
DROP TABLE [dbo].[PLAN_CHANGES]
CREATE TABLE [dbo].[PLAN_CHANGES] (
	[CHANGE_ID] [numeric](18, 0) NOT NULL PRIMARY KEY,
	[PERSONAL_ID] [numeric](18, 0) NOT NULL,
	[PREVIOUS_PLAN] [numeric](18, 0) NULL,
	[CHANGED_PLAN] [numeric](18, 0) NOT NULL,
	[CHANGED_DATE] [numeric](18, 0) NOT NULL,
)