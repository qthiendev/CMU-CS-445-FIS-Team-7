class PersonalInformation {
    constructor(Employee_ID,
        First_Name,
        Last_Name,
        Middle_Initial,
        Address1,
        Address2,
        City,
        State,
        Zip,
        Email,
        Phone_Number,
        Social_Security_Number,
        Drivers_License,
        Marital_Status,
        Gender,
        Shareholder_Status,
        Benefit_Plans,
        Ethnicity) {
        this.Employee_ID = Employee_ID;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Middle_Initial = Middle_Initial;
        this.Address1 = Address1;
        this.Address2 = Address2;
        this.City = City;
        this.State = State;
        this.Zip = Zip;
        this.Email = Email;
        this.Phone_Number = Phone_Number;
        this.Social_Security_Number = Social_Security_Number;
        this.Drivers_License = Drivers_License;
        this.Marital_Status = Marital_Status;
        this.Gender = Gender;
        this.Shareholder_Status = Shareholder_Status;
        this.Benefit_Plans = Benefit_Plans;
        this.Ethnicity = Ethnicity;
    }
}

var queryHR = require('../api/dbQuery_HR');
var pInfo = PersonalInformation

queryHR.excute("SELECT [Email] FROM [dbo].[Personal];").then(result => {
    console.log(result)
})