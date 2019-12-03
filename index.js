// Your code here

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, dateTime){
    let [date, hour] = dateTime.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    let clockIn = employeeRecord.timeInEvents.find(employee => employee.date === date);
    let clockOut = employeeRecord.timeOutEvents.find(employee => employee.date === date);
    return (clockOut.hour - clockIn.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, date){
    let pay = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return pay;
}

function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map(e => e.date);
    // console.log(dates)
    let pay = dates.reduce((i, date) => i + wagesEarnedOnDate(employeeRecord, date), 0);
    // console.log(pay)
    return pay;
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((i, employee) => i + allWagesFor(employee), 0);
}
function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName);
}