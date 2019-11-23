let createEmployeeRecord = function(array) {
   return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
   }
}

let createEmployeeRecords = function(records) {
   // takes in array of employee records
   //  has to return array of those records
   return records.map(function(row) {
      return createEmployeeRecord(row)
   }) 
}

let createTimeInEvent = function(employeeRecord, event) {
   // function accepts an employee record and a string (with the time stamp)
   // employeeRecord is the original employee record from up top

   // split the event array, convert the hour to an integer
   let eventArr = event.split(' ')
   let shiftDate = eventArr[0]
   let shiftHour = parseInt(eventArr[1])

   // we now have the elements of the new time card, this needs to be pushed into the EE record
   employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: shiftDate,
      hour: shiftHour
   })

   return employeeRecord
}


let createTimeOutEvent = function(employeeRecord, event) {
   let eventArr = event.split(' ')
   let shiftDate = eventArr[0]
   let shiftEndHour = parseInt(eventArr[1])

   employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: shiftDate,
      hour: shiftEndHour
   })
   return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, desiredDate) {
   // needs to match dates on the timeIn and timeOut events
   let inEvent = employeeRecord.timeInEvents.find(function(e) {
      return e.date === desiredDate
   })

   let outEvent = employeeRecord.timeOutEvents.find(function(e) {
      return e.date === desiredDate
   })

   // subracts the EE record timeOutHour by the EE record timeInHour, return total hours
   return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employeeRecord, desiredDate) {
   let eeHourlyRate = employeeRecord.payPerHour
   // call hoursWorkdOnDate on the parameters passed in
   let totalHours = hoursWorkedOnDate(employeeRecord, desiredDate)
   // multiply the totalHours by the hourly rate
   return totalHours * eeHourlyRate
}

let allWagesFor = function(employeeRecord) {
   // needs call wageEarnedOnDate on every timeIn/timeOut object for a specific employee
   // needs to return a total (use reduce)

   let dates = employeeRecord.timeInEvents.map(function(e) {
      return e.date
   })

   let totalWages = dates.reduce(function(sum, date) {
      return sum + wagesEarnedOnDate(employeeRecord, date)
   }, 0)

   return totalWages
}

let calculatePayroll = function(employees) {
   let employeeTotals = employees.map((emp) => allWagesFor(emp))
   let totalPayroll = employeeTotals.reduce((sum, total) => sum += total)
   return totalPayroll
}

let findEmployeeByFirstName = function(employees, searchName) {
   return employees.find((employee) => employee.firstName === searchName)
}