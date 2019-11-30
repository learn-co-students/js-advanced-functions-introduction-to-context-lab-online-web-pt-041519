function createEmployeeRecord(array) {  
    const createEmployee = Object.assign({}, {
        firstName: array[0],
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    })
    return createEmployee
}

const createEmployeeRecords = function(array) {
    const createEmployees = array.map(a => createEmployeeRecord(a))
    return createEmployees
}
 
// when provided an employee record and Date/Time String
function createTimeInEvent(employeeRecord, timeInPunch) {
    // console.log(employeeRecord) is the employees record that we'll add the time punch to
    // console.log(timeInPunch) is the time punch received as 2014-02-28 1400
    const [date, hour] = timeInPunch.split(' ')
    // Add an Object with keys to the timeInEvents Array on the record Object
    const addTimeInPunch = {
        type: "TimeIn", 
        hour: parseInt(hour), 
        date: date 
    }

    // adds a timeIn event Object to an employee's record of timeInEvents
    employeeRecord.timeInEvents.push(Object.assign({}, addTimeInPunch))
    
    // returns the updated record
    return employeeRecord
}


function createTimeOutEvent(employeeRecord, timeOutPunch) {
    const [date, hour] = timeOutPunch.split(' ')

    const addTimeOutPunch = {
        type: "TimeOut", 
        hour: parseInt(hour), 
        date: date 
    }
    
    employeeRecord.timeOutEvents.push(Object.assign({}, addTimeOutPunch))
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    const timeInRecord = employeeRecord.timeInEvents.find(e => e.date === dateWorked)
    const timeOutRecord = employeeRecord.timeOutEvents.find(e => e.date === dateWorked)

    const hoursWorked = (timeOutRecord.hour - timeInRecord.hour) / 100
    
    return hoursWorked
}