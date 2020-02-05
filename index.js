// Your code here
function createEmployeeRecord(array) {
    let record = {}
    record.firstName = array[0]
    record.familyName = array[1]
    record.title = array[2]
    record.payPerHour = array[3]
    record.timeInEvents = []
    record.timeOutEvents = []
    return record
}

function createEmployeeRecords(array) {
    return array.map(function(x) {
        return createEmployeeRecord(x)
    })
}

function createTimeInEvent(employee, string) {
    let event = {}
    event.type = "TimeIn"
    event.hour = parseInt(string.split(" ")[1])
    event.date = string.split(" ")[0]
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, string) {
    let event = {}
    event.type = "TimeOut"
    event.hour = parseInt(string.split(" ")[1])
    event.date = string.split(" ")[0]
    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, string) {
    let timeIn = employee.timeInEvents.find(function(event) {
        if(event.date == string) {
            return event
        }
    })
    let timeOut = employee.timeOutEvents.find(function(event) {
        if(event.date == string) {
            return event
        }
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, string){
    return hoursWorkedOnDate(employee, string) * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => {return event.date})
    return dates.reduce(function(total, day){
        return total + wagesEarnedOnDate(employee, day);
    }, 0)

}

function calculatePayroll(employees) {
    return employees.reduce(function(total, employee) {
        return total + allWagesFor(employee)
    }, 0)
}

function findEmployeeByFirstName(employees, string) {
    return employees.find(employee => {
        if(employee.firstName == string) {
            return employee
        }
    })
}