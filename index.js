// Your code here
let createEmployeeRecord = function(srcArray) {
  // the tests seem to describe an object
  return {
    firstName: srcArray[0],
    familyName: srcArray[1],
    title: srcArray[2],
    payPerHour: srcArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(arr) {
    return arr.map(function(el){
      return createEmployeeRecord(el)
    })
}

let createTimeInEvent = function(employee, time) {
  let [date, hour] = time.split(' ')

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

let createTimeOutEvent = function(employee, time) {
  let [date, hour] = time.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

let hoursWorkedOnDate = function(employee, onDate){
  // find date
  let inDate = employee.timeInEvents.find(el => el.date === onDate)
  let outDate = employee.timeOutEvents.find(el => el.date === onDate)

  return (outDate.hour - inDate.hour) / 100
  // employee.timeOutEvents - employee.timeInEvents)
}

let wagesEarnedOnDate = function(employee, onDate) {
  let wages = hoursWorkedOnDate(employee, onDate)*employee.payPerHour
  return wages
}

let allWagesFor = function(employee) {
  let dates = employee.timeInEvents.map(el => el.date)

  let totalWages = dates.reduce(function(total, date) {
    return total + wagesEarnedOnDate(employee, date)
  }, 0)
  return totalWages
}

let calculatePayroll = function(empArr) {
    return empArr.reduce(function(total, date) {
        return total + allWagesFor(date)
    }, 0)
}

let findEmployeeByFirstName = function(srcArr, name) {
  return srcArr.find(el => el.firstName === name)
}
