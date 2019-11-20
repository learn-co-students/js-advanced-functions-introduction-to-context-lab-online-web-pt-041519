// Fn returns employee obj populated from arr
let createEmployeeRecord = function(arr) {
    let emp = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        // Initializes empty timeIn and timeOut arrs
        timeInEvents: [],
        timeOutEvents: []
    }
    return emp
}

// Fn returns arr of employee objs from input arr (map employee objs)
let createEmployeeRecords = function(arr) {
    let allEmps = arr.map(emp => createEmployeeRecord(emp))
    return allEmps
  }

// Fn creates timeIn obj, adds it to employee obj, returns updated employee obj
let createTimeInEvent = function(empRec, timeStamp) {
    // Date format is YYYY-MM-DD 24HR
    // Separate date and hour
    let [date, time] = timeStamp.split(' ')
    // Populate timeIn obj with date and hour
    let timeInToday = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    }
    // Populate timeIn key of employee obj with timeInToday
    empRec.timeInEvents.push(timeInToday)
    return empRec
}

// Fn creates timeOut obj, adds it to employee obj, returns updated employee obj
let createTimeOutEvent = function(empRec, timeStamp) {
    // Date format is YYYY-MM-DD 24HR
    // Separate date and hour
    let [date, time] = timeStamp.split(' ')
    // Populate timeOut obj with date and hour
    let timeOutToday = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    }
    // Populate timeIn key of employee obj with timeInToday
    empRec.timeOutEvents.push(timeOutToday)
    return empRec
}

// Fn calculates and returns total hours worked by input employee based on input date
let hoursWorkedOnDate = function(empRec, date) {
    // Find timeIn and timeOut that match input date
    let timeIn = empRec.timeInEvents.find(el => el.date === date)
    let timeOut = empRec.timeOutEvents.find(el => el.date === date)
    // Calculate total hours worked (24HR format, divide by 100 for num of hrs)
    let totalHrs = (timeOut.hour - timeIn.hour) / 100
    return totalHrs
}

// Fn calculates and returns total daily wages for input employee based on input date
let wagesEarnedOnDate = function(empRec, date) {
    // Calculate employee's daily pay, get hours using hoursWorkedOnDate()
    let dailyWage = hoursWorkedOnDate(empRec, date) * empRec.payPerHour 
    return dailyWage
}

// Fn aggregates and returns total wages for input employee
let allWagesFor = function(empRec) {
    // Cb fn calculates employee's total pay by aggregataing wagesEarnedOnDate()
    const reducer = (total, day) => total + wagesEarnedOnDate(empRec, day.date)
    // Reduce to employee's total wages using reducer as the fn, starting at 0
    return empRec.timeInEvents.reduce(reducer, 0)
}

// Fn aggregates and returns total wages for input arr of employees
let calculatePayroll = function(empArr) {
    // Cb fn calculates each employee's total pay by aggregating allWagesFor()
    const reducer = (total, emp) => total + allWagesFor(emp)
    // Reduce to total wages for arr of employees using reducer as the fn, starting at 0
    return empArr.reduce(reducer, 0)
}

// Fn finds and returns first employee in input arr who's first name matches input name
let findEmployeeByFirstName = function(srcArr, empName) {
    return srcArr.find(emp => emp.firstName === empName)
}