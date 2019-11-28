// Your code here
const createEmployeeRecord = (arr) => {
  let employeeRecord = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []

  }
  return employeeRecord
}

const createEmployeeRecords = (empData) => {
  return empData.map(function(emp){
    return createEmployeeRecord(emp)
  })
}

const createTimeInEvent = (emp, dateStamp) => {

  let [date, hour] = dateStamp.split(" ")
  emp.timeInEvents.push(
    {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date 
    }
  )
  return emp
}

const createTimeOutEvent = (emp, dateStamp) => {

  let [date, hour] = dateStamp.split(" ")
  emp.timeOutEvents.push(
    {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    }
  )
  return emp
}

const hoursWorkedOnDate = (emp, date) => {
  let inTime = emp.timeInEvents.find(function(event){
    return event.date === date
  })
  let outTime = emp.timeOutEvents.find(function(event){
    return event.date === date
  })
  return (outTime.hour - inTime.hour) / 100
}

const wagesEarnedOnDate = (emp, date) => {
  let dailyWages = hoursWorkedOnDate(emp, date) * emp.payPerHour
  return dailyWages
}

const allWagesFor = (emp) => {
  const reducer = (total, day) => total + wagesEarnedOnDate(emp, day.date)
  return emp.timeInEvents.reduce(reducer, 0)
}

const calculatePayroll = (empArray) => {
  const reducer = (total, emp) => total + allWagesFor(emp)
  return empArray.reduce(reducer, 0)
}

const findEmployeeByFirstName = (arr, name) => {
  return arr.find(emp => emp.firstName === name)
}
