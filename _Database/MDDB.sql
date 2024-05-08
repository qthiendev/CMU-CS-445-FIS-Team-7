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
CREATE TABLE [dbo].[ACCOUNT](
	[ACCOUNT_ID] [nvarchar](25) NOT NULL PRIMARY KEY,
	[ACCOUNT_PASSWORD] [nvarchar](26) NULL,
)