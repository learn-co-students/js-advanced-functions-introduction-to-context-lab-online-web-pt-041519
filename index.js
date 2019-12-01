 

// Your code here

//array = []

//Loads Array elements into corresponding Object properties. 
//Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
let createEmployeeRecord = function(array) {
  // Populate object from array
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

// Return array of employee objects from input array of arrays
let createEmployeeRecords = function(array) {
  // Map employee objects to array
  let employees = array.map(employee => createEmployeeRecord(employee))
  return employees
}

// Return employee record with new Time In
let createTimeInEvent = function(employee, stampdate) {
  // Split "2014-02-28 1400" into components needed for date object
  let [day, hour] = stampdate.split(" ")

  // Create new TimeIn
  let newTimeIn = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: day
  }

  // Add TimeIn to employee record
  employee.timeInEvents.push(newTimeIn)
  return employee
}

// Return employee record with new Time Out
let createTimeOutEvent = function(employee, date) {
  // Split "2014-02-28 1400" into components needed for date object
  let [day, hour] = date.split(" ")

  // Create new TimeIn
  let newTimeOut = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: day
  }

  // Add TimeIn to employee record
  employee.timeOutEvents.push(newTimeOut)
  return employee 
}

let hoursWorkedOnDate = function(empoloyeeRecord, checkDate){ 
    let timeInE = empoloyeeRecord.timeInEvents.find( element => element.date === checkDate)

    let timeOutE = empoloyeeRecord.timeOutEvents.find(element => element.date === checkDate )

    let hours = (timeOutE.hour - timeInE.hour) / 100
    return hours
}

//Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine 
//amount owed. Amount should be returned as a number.

let wagesEarnedOnDate = function(employeeRecord, date){
    //hrs from previous hoursWorkedoNdate function
    let wages = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return wages
}
//start here

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record
// used as context. 
//Amount should be returned as a number. HINT: You will need to find the available dates somehow...
let allWagesFor = function(employeeRecord) {
    const total = (total, day) => total + wagesEarnedOnDate(employeeRecord, day.date)
    return employeeRecord.timeInEvents.reduce(total, 0)
}


// Test the firstName field for a match with the firstName argument
let findEmployeeByFirstName = function(array, name) {
    return array.find(employee => employee.firstName === name)
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in 
//the record used as context. Amount should be returned as a number.
let calculatePayroll = function(array) { 
    const total = (total, employee) => total + allWagesFor(employee) 
    return array.reduce(total, 0) 
}

