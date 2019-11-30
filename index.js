// Your code here

function createEmployeeRecord(array){
    return {
        firstName: array[0], 
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays){
   return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(obj, date){
    obj.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
    })
    return obj
}

function createTimeOutEvent(obj, date){
    obj.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(date.split(' ')[1], 10), 
        date: date.split(' ')[0]
    })
    return obj
}

function hoursWorkedOnDate(obj, date){
    let workDateIn = obj.timeInEvents.find(function(e) {
       return e.date === date
    })

    let workDateOut = obj.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (workDateOut.hour - workDateIn.hour)/100
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
}

function allWagesFor(obj){
   let datesWorked = obj.timeInEvents.map(function(e) {
       return e.date
   })

   let payed = datesWorked.reduce(function(memo, e){
       return memo += wagesEarnedOnDate(obj, e)
   }, 0)

   return payed
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(emp) {
        return emp.firstName === firstName
    })
}

function calculatePayroll(array){
    return array.reduce(function(memo, e){
        return memo += allWagesFor(e)
    }, 0)
}