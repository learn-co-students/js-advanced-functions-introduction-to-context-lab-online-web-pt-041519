function createEmployeeRecord(array) {  
    const employeeRecord = Object.assign({}, {
        firstName: array[0],
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    })
    return employeeRecord
}

const createEmployeeRecords = function(array) {
    const employeeRecord = array.map(a => createEmployeeRecord(a))
    return employeeRecord
}

function createTimeInEvent() {
    
}