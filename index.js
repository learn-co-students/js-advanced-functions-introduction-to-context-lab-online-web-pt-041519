// Your code here
function createEmployeeRecord(arr) {
  const employee = Object.assign({}, { firstName: arr[0], familyName: arr[1], title: arr[2], payPerHour: arr[3], timeInEvents: [], timeOutEvents: []})
  return employee
}

function createEmployeeRecords(arr) {
	const employees = arr.map(function(e) {
		return createEmployeeRecord(e)
	})
	return employees
}

function createTimeInEvent(e, time) {
	let timeInHour = time.split(" ")[1]
	let timeInDate = time.split(" ")[0]
	e.timeInEvents.push(Object.assign({}, { type: "TimeIn", hour: parseInt(timeInHour), date: timeInDate}))
	return e
}

function createTimeOutEvent(e, time) {
	let timeOutHour = time.split(" ")[1]
	let timeOutDate = time.split(" ")[0]
	e.timeOutEvents.push(Object.assign({}, { type: "TimeOut", hour: parseInt(timeOutHour), date: timeOutDate}))
	return e
}

function hoursWorkedOnDate(e, date) {
	const clockIn = e.timeInEvents.filter(function(i) {
		return i.date === date
	})
	const clockOut = e.timeOutEvents.filter(function(o) {
		return o.date === date
	})
	return (clockOut[0].hour - clockIn[0].hour) / 100
}

function wagesEarnedOnDate(e, date) {
	const hoursWorked = hoursWorkedOnDate(e, date)
	return hoursWorked * e.payPerHour
}

function allWagesFor(e) {
	let clockIns = e.timeInEvents.map(function(i) {
		return i.date;
	})
	let clockOuts = e.timeOutEvents.map(function(o) {
		return o.date;
	})
	let matchedDates = clockIns.filter(function(el) {
		return clockOuts.includes(el)
	})
	let wageArray = matchedDates.map(function(date) {
		return wagesEarnedOnDate(e, date)
	})
	let totalWages = wageArray.reduce(function(acc, i) {
		return acc + i;
	})
	return totalWages;
}

function calculatePayroll(employees) {
	let employeesWages = employees.map(function(el) {
		return allWagesFor(el);
	})
	let total = employeesWages.reduce(function(acc, i) {
		return acc + i;
	})
	return total;
}

function findEmployeeByFirstName(records, name) {
	let employee = records.filter(function(el) {
		return el.firstName === name;
	})
	return employee[0]
}


