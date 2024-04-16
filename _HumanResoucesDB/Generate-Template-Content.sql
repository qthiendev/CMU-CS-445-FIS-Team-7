-- Ensure queried the 'Generate.sql' before.
-- This is origin data for testing
-- Create and modify by Trinh Quy Thien 
-- Last modified [13/03/2024 01:50]

USE [HumanResourceDB]

DELETE FROM [dbo].[EMPLOYMENT_WORKING_TIME]
DELETE FROM [dbo].[JOB_HISTORY]
DELETE FROM [dbo].[EMPLOYMENT]
DELETE FROM [dbo].[PERSONAL]
DELETE FROM [dbo].[BENEFIT_PLANS]

INSERT INTO [dbo].[BENEFIT_PLANS] ([BENEFIT_PLANS_ID], [PLAN_NAME], [DEDUCTABLE], [PERCENTAGE_COPAY])
VALUES 
(1, 'Plan A', 500, 20),
(2, 'Plan B', 1000, 15),
(3, 'Plan C', 1500, 10),
(4, 'Plan D', 2000, 5);

INSERT INTO [dbo].[PERSONAL] ([PERSONAL_ID],
	[CURRENT_FIRST_NAME],
	[CURRENT_LAST_NAME],
	[CURRENT_MIDDLE_NAME],
	[BIRTH_DATE],
	[SOCIAL_SECURITY_NUMBER],
	[DRIVERS_LICENSE],
	[CURRENT_ADDRESS_1],
	[CURRENT_ADDRESS_2],
	[CURRENT_CITY],
	[CURRENT_COUNTRY],
	[CURRENT_ZIP],
	[CURRENT_GENDER],
	[CURRENT_PHONE_NUMBER],
	[CURRENT_PERSONAL_EMAIL],
	[CURRENT_MARITAL_STATUS],
	[ETHNICITY],
	[SHAREHOLDER_STATUS],
	[BENEFIT_PLAN_ID])
VALUES 
(101, 'John', 'Doe', 'A', '1980-01-01', 'XXX-XX-XXXX', 'D1234567', '123 Main St', '', 'New York', 'USA', '10001', 'M', '123-456-7890', 'john.doe@example.com', 'Single', 'Caucasian', 0, 1),
(102, 'Jane', 'Smith', 'B', '1985-02-02', 'XXX-XX-XXXX', 'S2345678', '456 Elm St', 'Apt 7B', 'Los Angeles', 'USA', '90001', 'F', '234-567-8901', 'jane.smith@example.com', 'Married', 'Asian', 1, 2),
(103, 'Alice', 'Johnson', 'C', '1990-03-03', 'XXX-XX-XXXX', 'J3456789', '789 Pine St', '', 'Chicago', 'USA', '60601', 'F', '345-678-9012', 'alice.johnson@example.com', 'Divorced', 'African', 0, 3),
(104, 'Bob', 'Brown', 'D', '1995-04-04', 'XXX-XX-XXXX', 'B4567890', '012 Oak St', 'Unit 3C', 'Houston', 'USA', '77001', 'M', '456-789-0123', 'bob.brown@example.com', 'Widowed', 'Hispanic', 1, 4);

INSERT INTO [dbo].[EMPLOYMENT] ([EMPLOYMENT_ID], 
	[EMPLOYMENT_CODE],
	[EMPLOYMENT_STATUS],
	[HIRE_DATE_FOR_WORKING],
	[WORKERS_COMP_CODE],
	[TERMINATION_DATE],
	[REHIRE_DATE_FOR_WORKING],
	[LAST_REVIEW_DATE],
	[NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH],
	[PERSONAL_ID])
VALUES
(1, 'E001', 'FullTime', '2024-01-01', 'WC001', '9999-12-31', '9999-12-31', '2024-04-01', 20, 101),
(2, 'E002', 'PartTime', '2024-02-01', 'WC002', '9999-12-31', '9999-12-31', '2024-04-01', 20, 102),
(3, 'E003', 'PartTime', '2024-01-01', 'WC003', '2024-03-31', '9999-12-31', '2024-03-01', 20, 103),
(4, 'E004', 'FullTime', '2024-01-01', 'WC004', '2024-02-28', '2024-04-01', '2024-04-01', 20, 104);

INSERT INTO [dbo].[EMPLOYMENT_WORKING_TIME] ([EMPLOYMENT_WORKING_TIME_ID],
	[EMPLOYMENT_ID],
	[YEAR_WORKING],
	[MONTH_WORKING],
	[NUMBER_DAYS_ACTUAL_OF_WORKING_PER_MONTH],
	[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH])
VALUES
(1, 1, '2024', 03, 20, 2),
(2, 1, '2024', 03, 18, 2),
(3, 2, '2024', 03, 22, 1),
(4, 2, '2024', 03, 21, 1),
(5, 3, '2024', 03, 20, 2),
(6, 3, '2024', 03, 20, 2),
(7, 4, '2024', 03, 22, 1),
(8, 4, '2024', 03, 21, 1);

INSERT INTO [dbo].[JOB_HISTORY] ([JOB_HISTORY_ID],
	[EMPLOYMENT_ID],
	[DEPARTMENT],
	[DIVISION],
	[FROM_DATE],
	[THRU_DATE],
	[JOB_TITLE],
	[SUPERVISOR],
	[LOCATION],
	[TYPE_OF_WORK])
VALUES 
(1, 1, 'Sales', 'North America', '2024-01-01', '2024-12-31', 'Sales Representative', 'John Doe', 'New York', 1),
(2, 2, 'Marketing', 'Asia', '2024-02-01', '2024-12-31', 'Marketing Associate', 'Jane Smith', 'Tokyo', 1),
(3, 3, 'Human Resources', 'Europe', '2024-03-01', '2024-12-31', 'HR Specialist', 'Alice Johnson', 'London', 0),
(4, 4, 'Finance', 'South America', '2024-04-01', '2024-12-31', 'Financial Analyst', 'Bob Brown', 'Sao Paulo', 1);