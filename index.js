// Your code here
function createEmployeeRecord(array)
{
    const employeeHash = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeHash
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp)
{
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp)
{
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, someDate)
{
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === someDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === someDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, someDate)
{
    let rawWage = hoursWorkedOnDate(employee, someDate)*employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let daysWorked = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = daysWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }