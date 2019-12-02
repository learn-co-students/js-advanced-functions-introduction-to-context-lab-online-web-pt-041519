// Your code here
function createEmployeeRecord(arr){
  let record = {
      firstName: arr[0], 
      familyName: arr[1], 
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [], 
      timeOutEvents: []
  } 
  return record
}

let createEmployeeRecords = (arr) =>{
    return arr.map((emp)=> createEmployeeRecord(emp))
}

const createTimeInEvent = (record, dateTime) => {
    let date = dateTime.slice(0,10)
    let hour = parseInt(dateTime.slice(11))
    record.timeInEvents.push({date: date, type: "TimeIn", hour: hour})
    return record
}

const createTimeOutEvent = (record, dateTime) => {
    let date = dateTime.slice(0,10)
    let hour = parseInt(dateTime.slice(11))
    record.timeOutEvents.push({date: date, type: "TimeOut", hour: hour})
    return record
}

const hoursWorkedOnDate = (record, date) => {
    let timeIn = record.timeInEvents.find( e => e.date === date).hour
    let timeOut = record.timeOutEvents.find( e => e.date === date).hour 
    return ((timeOut - timeIn) / 100)
}

const wagesEarnedOnDate = (record, date) =>{
    let hoursWorked = hoursWorkedOnDate(record, date)
    return (hoursWorked * record.payPerHour)
}

const allWagesFor = (record) =>{
    let dates = record.timeInEvents.map(e => e.date)
    let check = dates.reduce((total, date)=>{
         return total + wagesEarnedOnDate(record, date,)
    }, 0)
    return check
}

const calculatePayroll = (array) => {
    return array.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0)
}

const findEmployeeByFirstName = (array, name) => {
    return array.find( ele => ele.firstName === name)
}
