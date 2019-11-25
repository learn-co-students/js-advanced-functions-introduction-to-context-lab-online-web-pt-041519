
// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let employeeRecord = {
    "firstName": firstName,
    "familyName": familyName,
    "title": title,
    "payPerHour": payPerHour,
    "timeInEvents": [],
    "timeOutEvents": []
    }

    return employeeRecord
}

twoRecords = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

function createEmployeeRecords(twoRecords) {
    return twoRecords.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateHourStamp) {
    employeeRecord["timeInEvents"].push({
        "type": "TimeIn",
        "hour": parseInt(dateHourStamp.split(" ")[1], 10),
        "date": dateHourStamp.split(" ")[0]
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateHourStamp) {
    employeeRecord["timeOutEvents"].push({
        "type": "TimeOut",
        "hour": parseInt(dateHourStamp.split(" ")[1], 10),
        "date": dateHourStamp.split(" ")[0]
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord) {
    let timeOutHoursArray = employeeRecord["timeOutEvents"].map(el => el["hour"])
    let timeInHoursArray = employeeRecord["timeInEvents"].map(el => el["hour"])
    let totalHoursWorked = []

    for (let i = 0; i < timeOutHoursArray.length; i++){
        totalHoursWorked.push((timeOutHoursArray[i] - timeInHoursArray[i])/100)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue

    return totalHoursWorked.reduce(reducer)
}

function wagesEarnedOnDate(employeeRecord) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord)
    let wages = employeeRecord["payPerHour"] * hoursWorked
    return wages
}

function allWagesFor(employeeRecord) {
    return hoursWorkedOnDate(employeeRecord) * employeeRecord["payPerHour"]
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(el => el["firstName"] === firstName)
}


function calculatePayroll(employeeRecordsArray) {
    let allWagesArray = EmployeeRecordsArray.map(record => allWagesFor(record))
    let payroll = allWagesArray.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue
    })
    return payroll
}

function calculatePayroll(employeeRecordsArray) {
    let allWagesArray = employeeRecordsArray.map(record => wagesEarnedOnDate(record))
    console.log(allWagesArray)
    let payroll = allWagesArray.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue
    })
    return payroll
}
