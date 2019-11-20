
// Return employee object from input record array
let createEmployeeRecord = function(recordArr) {
  // Populate object from array
  let employee = {
    firstName: recordArr[0],
    familyName: recordArr[1],
    title: recordArr[2],
    payPerHour: recordArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

// Return array of employee objects from input array of arrays
let createEmployeeRecords = function(arr) {
  // Map employee objects to array
  let employees = arr.map(employee => createEmployeeRecord(employee))
  return employees
}

// Return employee record with new Time In
let createTimeInEvent = function(employeeObj, date) {
  // Split "2014-02-28 1400" into components needed for date object
  let [day, hour] = date.split(" ")

  // Create new TimeIn
  let timeInObj = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: day
  }

  // Add TimeIn to employee record
  employeeObj.timeInEvents.push(timeInObj)
  return employeeObj
}

// Return employee record with new Time Out
let createTimeOutEvent = function(employeeObj, date) {
  // Split "2014-02-28 1400" into components needed for date object
  let [day, hour] = date.split(" ")

  // Create new TimeIn
  let timeOutObj = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: day
  }

  // Add TimeIn to employee record
  employeeObj.timeOutEvents.push(timeOutObj)
  return employeeObj
}

// Return hours worked
let hoursWorkedOnDate = function(employeeObj, date) {
  // Find TimeIn and TimeOut based on date
  let timeIn = employeeObj.timeInEvents.find(t => t.date === date)
  let timeOut = employeeObj.timeOutEvents.find(t => t.date === date)

  // Subract TimeOut from TimeIn and divide by 100 to get total hours worked
  let hoursWorked = (timeOut.hour - timeIn.hour)/100
  return hoursWorked
}

// Return wages earned
let wagesEarnedOnDate = function(employeeObj, date) {
  let pay = hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour
  return pay
}

// Return total pay for employee
let allWagesFor = function(employeeObj) {
  // Calculate total for wages earned for each date
  const reducer = (total, timeIn) => total + wagesEarnedOnDate(employeeObj, timeIn.date)

  // Activate reducer for timeInEvents, starting at 0
  return employeeObj.timeInEvents.reduce(reducer, 0)
}

// Return employee object from input first name; return undefined if no match
let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(record => record.firstName === firstName)
}

// Return total pay for all employees
let calculatePayroll = function(employeesArray) {
  // Calculate total wages for each employee
  const reducer = (total, employee) => total + allWagesFor(employee)

  // Activate reducer for each employee, starting at 0
  return employeesArray.reduce(reducer, 0)
}