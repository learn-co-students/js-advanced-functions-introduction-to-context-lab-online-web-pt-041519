// Your code here
function createEmployeeRecord(arr){
    return{
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrs){
    return arrs.map(arr =>  createEmployeeRecord(arr));
}

function createTimeInEvent(employeeObj, dateStr){
    let [date, hour] = dateStr.split(" ");
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStr){
    let [date, hour] = dateStr.split(" ");

    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date){
    let timeIn = employeeObj.timeInEvents.find( timeArr => timeArr.date === date);
    let timeOut = employeeObj.timeOutEvents.find( timeArr => timeArr.date === date);

    let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObj, date){
    let wages = hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;

    return wages;
}

function allWagesFor(employeeObj){
    let dates = employeeObj.timeInEvents.map( t => t.date);
    let allWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employeeObj, date), 0);
   
    return allWages;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employeeObj => employeeObj.firstName === firstName);
}

function calculatePayroll(srcArray){
    return srcArray.reduce((total, employeeObj) => total + allWagesFor(employeeObj), 0);
}