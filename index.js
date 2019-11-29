// Your code here
function createEmployeeRecord(array) {
    const employee = new Object()
    employee.firstName = array[0]
    employee.familyName = array[1]
    employee.title = array[2]
    employee.payPerHour = array[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

function createEmployeeRecords(records) {
    let newRecords = records.map(array => createEmployeeRecord(array))
    return newRecords
}

function createTimeInEvent(record, date_time) {
    let [date, hour] = date_time.split(' ')
    record.timeInEvents.push({type: 'TimeIn', hour: parseInt(hour, 10), date,})
    return record
}

function createTimeOutEvent(record, date_time) {
    let [date, hour] = date_time.split(' ')
    record.timeOutEvents.push({type: 'TimeOut', hour: parseInt(hour, 10), date,})
    return record
}

function findEmployeeByFirstName(array, fName) {
    return array.find(function (elem) {
       return elem.firstName === fName
   })
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}