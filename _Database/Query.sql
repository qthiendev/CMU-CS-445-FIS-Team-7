﻿use HumanResourceDB
SELECT [PERSONAL_ID] as [ID], [BIRTH_DATE] AS [Birthdate]
FROM [PERSONAL]

-- even me not get it, please dont ask, just run the query
SELECT [PERSONAL_ID] AS [ID], 
	[CURRENT_LAST_NAME] + ' ' + [CURRENT_MIDDLE_NAME] + ' ' + [CURRENT_FIRST_NAME] AS [Fullname], 
	[BIRTH_DATE] AS [Birthdate], 
	DATEDIFF(DAY, GETDATE(), DATEFROMPARTS(YEAR(GETDATE()) 
		+ CASE WHEN MONTH([BIRTH_DATE]) > MONTH(GETDATE()) 
			OR (MONTH([BIRTH_DATE]) = MONTH(GETDATE()) 
			AND DAY([BIRTH_DATE]) > DAY(GETDATE())) 
		THEN 0 ELSE 1 END, 
		MONTH([BIRTH_DATE]), DAY([BIRTH_DATE]))) AS [Upcomming] 
	FROM [DBO].[PERSONAL] 
	WHERE DATEFROMPARTS(YEAR(GETDATE()) 
	+ CASE WHEN MONTH([BIRTH_DATE]) > MONTH(GETDATE()) 
	OR (MONTH([BIRTH_DATE]) = MONTH(GETDATE()) 
	AND DAY([BIRTH_DATE]) > DAY(GETDATE())) 
	THEN 0 ELSE 1 END, 
	MONTH([BIRTH_DATE]), 
	DAY([BIRTH_DATE])) 
	BETWEEN GETDATE() 
	AND DATEADD(DAY, 365, GETDATE()) 
	ORDER BY [Upcomming];

SELECT [P].[PERSONAL_ID] AS [ID], 
	([P].[CURRENT_LAST_NAME] + ' ' + [P].[CURRENT_MIDDLE_NAME] + ' ' + [P].[CURRENT_FIRST_NAME]) AS [FULLNAME], 
	[E].[HIRE_DATE_FOR_WORKING] AS [HIRE DATE], 
	DATEDIFF(DAY, GETDATE(), DATEFROMPARTS(YEAR(GETDATE()) 
		+ CASE WHEN MONTH([E].[HIRE_DATE_FOR_WORKING]) > MONTH(GETDATE()) 
			OR (MONTH([E].[HIRE_DATE_FOR_WORKING]) = MONTH(GETDATE()) 
			AND DAY([E].[HIRE_DATE_FOR_WORKING]) > DAY(GETDATE())) 
		THEN 0 ELSE 1 END, 
		MONTH([E].[HIRE_DATE_FOR_WORKING]), 
		DAY([E].[HIRE_DATE_FOR_WORKING]))) AS [UPCOMING] 
	FROM [DBO].[PERSONAL] [P], [DBO].[EMPLOYMENT] [E] 
	WHERE DATEFROMPARTS(YEAR(GETDATE()) 
		+ CASE WHEN MONTH([E].[HIRE_DATE_FOR_WORKING]) > MONTH(GETDATE()) 
			OR (MONTH([E].[HIRE_DATE_FOR_WORKING]) = MONTH(GETDATE()) 
			AND DAY([E].[HIRE_DATE_FOR_WORKING]) > DAY(GETDATE())) 
		THEN 0 ELSE 1 END, 
		MONTH([E].[HIRE_DATE_FOR_WORKING]), 
		DAY([E].[HIRE_DATE_FOR_WORKING])) 
		BETWEEN GETDATE() 
		AND DATEADD(DAY, 365, GETDATE()) 
		AND [P].[PERSONAL_ID] = [E].[PERSONAL_ID]
	GROUP BY [P].[PERSONAL_ID], [P].[CURRENT_LAST_NAME], [P].[CURRENT_MIDDLE_NAME], [P].[CURRENT_FIRST_NAME], [E].[HIRE_DATE_FOR_WORKING]
	ORDER BY [UPCOMING];

SELECT [P].[PERSONAL_ID] AS [ID], 
	[P].[CURRENT_LAST_NAME] + ' ' + [P].[CURRENT_MIDDLE_NAME] + ' ' + [P].[CURRENT_FIRST_NAME] AS [Fullname],
	CONVERT(VARCHAR, ewt.MONTH_WORKING) + '/' + CONVERT(VARCHAR, year(ewt.YEAR_WORKING)) as [Duration],
    [EWT].[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH] as [Vacation days]
FROM [DBO].[EMPLOYMENT_WORKING_TIME] [EWT],
	[DBO].[PERSONAL] [P],
	[DBO].[EMPLOYMENT] [E]

--Edit
use HumanResourceDB

UPDATE [DBO].[PERSONAL]
SET [CURRENT_FIRST_NAME] = N'Thiện',
	[CURRENT_LAST_NAME] = N'Trịnh',
	[CURRENT_MIDDLE_NAME] = N'Quý',
	[BIRTH_DATE] = CONVERT(DATETIME, '16/12/2003', 103),
	[SOCIAL_SECURITY_NUMBER] = N'27211235459',
	[DRIVERS_LICENSE] = N'884738892378',
	[CURRENT_ADDRESS_1] = N'Hải Châu I, Hải Châu',
	[CURRENT_ADDRESS_2] = N'Đăk Nông',
	[CURRENT_CITY] = N'Đà Nẵng',
	[CURRENT_COUNTRY] = N'Việt Nam',
	[CURRENT_ZIP] = 0934567891,
	[CURRENT_GENDER] = N'Male',
	[CURRENT_PHONE_NUMBER] = N'0934567891',
	[CURRENT_PERSONAL_EMAIL] = N'ypDRk6tuQa@gmail.com',
	[CURRENT_MARITAL_STATUS] = N'Married',
	[ETHNICITY] = N'Kinh',
	[SHAREHOLDER_STATUS] = 0,
	[BENEFIT_PLAN_ID] = 1
WHERE [PERSONAL_ID] = 1

UPDATE [DBO].[EMPLOYMENT]
SET [EMPLOYMENT_STATUS] = N'Full time',
	[HIRE_DATE_FOR_WORKING] = CONVERT(DATETIME, '08/03/2023', 103),
	[WORKERS_COMP_CODE] = 'FD',
	[TERMINATION_DATE] = NULL,
	[REHIRE_DATE_FOR_WORKING] = NULL,
	[LAST_REVIEW_DATE] = CONVERT(DATETIME, '08/03/2023', 103),
	[NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH] = 22
WHERE [PERSONAL_ID] = 1

SELECT [P].[PERSONAL_ID],
	[P].[CURRENT_FIRST_NAME],
	[P].[CURRENT_LAST_NAME],
	[P].[CURRENT_MIDDLE_NAME],
	[P].[BIRTH_DATE],
	[P].[SOCIAL_SECURITY_NUMBER],
	[P].[DRIVERS_LICENSE],
	[P].[CURRENT_ADDRESS_1],
	[P].[CURRENT_ADDRESS_2],
	[P].[CURRENT_CITY],
	[P].[CURRENT_COUNTRY],
	[P].[CURRENT_ZIP],
	[P].[CURRENT_GENDER],
	[P].[CURRENT_PHONE_NUMBER],
	[P].[CURRENT_PERSONAL_EMAIL],
	[P].[CURRENT_MARITAL_STATUS],
	[P].[ETHNICITY],
	[P].[SHAREHOLDER_STATUS],
	[BP].[BENEFIT_PLANS_ID],
	[BP].[PLAN_NAME],
	[BP].[DEDUCTABLE],
	[BP].[PERCENTAGE_COPAY],
	[E].[EMPLOYMENT_CODE],
	[E].[EMPLOYMENT_STATUS],
	[E].[HIRE_DATE_FOR_WORKING],
	[E].[WORKERS_COMP_CODE],
	[E].[TERMINATION_DATE],
	[E].[REHIRE_DATE_FOR_WORKING],
	[E].[LAST_REVIEW_DATE],
	[E].[NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH]
  FROM [HumanResourceDB].[dbo].[PERSONAL] P
LEFT JOIN [HumanResourceDB].[dbo].[EMPLOYMENT] E ON P.PERSONAL_ID = E.PERSONAL_ID
LEFT JOIN [HumanResourceDB].[dbo].[BENEFIT_PLANS] BP ON P.BENEFIT_PLAN_ID = BP.BENEFIT_PLANS_ID

use [HumanResourceDB]
        UPDATE [DBO].[PERSONAL]
        SET [CURRENT_FIRST_NAME] = N'Thiện',
        [CURRENT_LAST_NAME] = N'Trịnh',
        [CURRENT_MIDDLE_NAME] = N'Quý',
        [BIRTH_DATE] = CONVERT(DATETIME, '16/12/2003', 103),
        [SOCIAL_SECURITY_NUMBER] = N'27211235459',
        [DRIVERS_LICENSE] = N'884738892378',
        [CURRENT_ADDRESS_1] = N'Hải Châu I, Hải Châu',
        [CURRENT_ADDRESS_2] = N'Đăk Nông',
        [CURRENT_CITY] = N'Đà Nẵng',
        [CURRENT_COUNTRY] = N'Việt Nam',
        [CURRENT_ZIP] = 934567891,
        [CURRENT_GENDER] = N'Male',
        [CURRENT_PHONE_NUMBER] = N'0934567891',
        [CURRENT_PERSONAL_EMAIL] = N'ypDRk6tuQa@gmail.com',
        [CURRENT_MARITAL_STATUS] = N'Married',
        [ETHNICITY] = N'Kinh      ',
        [SHAREHOLDER_STATUS] = 0,
        [BENEFIT_PLAN_ID] = undefined
        WHERE [PERSONAL_ID] = 1;

SELECT idEmployee,
`Employee Number`,
`idPay Rates`,
`Pay Rate Name`,
`Value`,
`Pay Rate`,
`Paid To Date`,
`Pay Rate`,
`Pay Type`,
`Tax Percentage`,
`Pay Amount`,
`PT - Level C`
FROM mydb.`employee`
JOIN mydb.`pay rates`
ON mydb.`employee`.`Pay Rates_idPay Rates` = mydb.`pay rates`.`idPay Rates`
order by idEmployee;