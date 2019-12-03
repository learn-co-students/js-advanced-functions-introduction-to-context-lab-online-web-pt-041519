// Takes an array with 3 strings and a number
// (firstName, familyName, title, payRate/hr)
// returns Javascript Object with the following keys:
// firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
// timeInEvents & timeOutEvents should be initialized with []
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}   


// Accepts an array of many employee's info
// Returns an array of employee records (objects)
// use #createEmployeeRecord on each employee's info array.
function createEmployeeRecords(allEmployeeInfo) {
    return allEmployeeInfo.map(record => createEmployeeRecord(record))
}


// Accepts an employee record (object) and a date/time stamp (string)
// returns the employee record with the following added:
// an object in the timeInEvents array with the following keys:
// type (set to "TimeIn"), hour, and date
function createTimeInEvent(employeeRecord, timeStamp) {
    let punchIn = {
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(11, 15), 10),
        date: timeStamp.slice(0, 10)
    }
    employeeRecord.timeInEvents.push(punchIn)
    return employeeRecord;
}


// Accepts an employee record (object) and a date/time stamp (string)
// returns the employee record with the following added:
// an object in the timeOutEvents array with the following keys:
// type (set to "TimeOut"), hour, and date
function createTimeOutEvent(employeeRecord, timeStamp) {
    let punchOut = {
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(11, 15), 10),
        date: timeStamp.slice(0, 10)
    }
    employeeRecord.timeOutEvents.push(punchOut)
    return employeeRecord;
}


// Accepts an employee record (object) and a date (string)
// Returns the hours worked (number) on that date
// (subtract timeInEvent from timeOutEvent)
function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date)

    return (timeOut.hour - timeIn.hour)/100
}


// Accepts an employee record (object) and a date (string)
// Returns the pay owed (number)
// use #hoursWorkedOnDate * employee's pay rate
function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}


// Accepts an employee record (object)
// Returns total pay owed for all dates (number)
// use #wagesEarnedOnDate to calculate total for each date, then reduce
function allWagesFor(employeeRecord) {
    let allDates = employeeRecord.timeInEvents;

    return allDates.reduce(function (totalPay, dateObj) {
        return totalPay + wagesEarnedOnDate(employeeRecord, dateObj.date)
    }, 0)

    // LONG WAY
    // let total = 0;
    // for (let ea of allDates) {
    //     total += wagesEarnedOnDate(employeeRecord, ea.date)
    // }
    // return total;
}


// Accepts an array of employeeRecords (array), and a name (string)
// Returns record matching the first name, or undefined
function findEmployeeByFirstName(employeeRecords, name) {
    return employeeRecords.find(employee => employee.firstName === name)
}


// Accepts an array of employeeRecords
// Returns the sum of all employees wages for all dates as a number
// use #wagesEarnedOnDate for every employee, for every date.
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(totalPay, employee) {
        return totalPay + allWagesFor(employee)
    }, 0)
}