function createEmployeeRecord(arr){
    let empObj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empObj
}

function createEmployeeRecords(arr) {
    
   let arrOfObj = arr.map(el => createEmployeeRecord(el))
   return arrOfObj
}

function createTimeInEvent(record, timeStamp) {
    const splitTimeStamp = timeStamp.split(' ')
    
    let recordUpdate = {
        type:"TimeIn",
        hour: parseInt(splitTimeStamp[1]),
        date: splitTimeStamp[0]
    }

     record.timeInEvents.push(recordUpdate)
     return record
}

function createTimeOutEvent(record, timeStamp) {
    const splitTimeStamp = timeStamp.split(' ')
    
    let recordUpdate = {
        type:"TimeOut",
        hour: parseInt(splitTimeStamp[1]),
        date: splitTimeStamp[0]
    }

     record.timeOutEvents.push(recordUpdate)
     return record
}

function hoursWorkedOnDate(record, date){
    let startTime = record.timeInEvents.find(el => el.date === date)
    let endTime = record.timeOutEvents.find(el => el.date === date)
    
    const hoursWorked = (endTime.hour - startTime.hour)/100
    return hoursWorked 
}

function wagesEarnedOnDate(record, date){
    let hours = hoursWorkedOnDate(record, date)
    let rate = record.payPerHour 

    let wages = hours * rate 
    return wages 
}

function allWagesFor(record){      

    const wages = (total, timeIn) => total + wagesEarnedOnDate(record, timeIn.date)

    return record.timeInEvents.reduce(wages, 0)
}

function findEmployeeByFirstName(allEmp, firstName){
    return allEmp.find(name => name.firstName === firstName)
}

function calculatePayroll(records){
    const wages = (total, record) => total + allWagesFor(record)

    return records.reduce(wages, 0)

}

