const date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

var currentMonth = month; // current month displayed
var currentYear = year; // current year displayed

const newDivText = document.createTextNode('');
document.getElementById('month_year').appendChild(newDivText);

// Main function
myfunction(day, month, year, currentMonth, currentYear);

// AddEventListeners
document.getElementById('previous').addEventListener('click',() => {
    month = month-1;
    if (month === -1){
        month = 11;
        year = year -1;
    }
    
    const days = document.getElementById('days');
    while (days.firstChild) {
        days.removeChild(days.lastChild);
    }
    myfunction(day, month, year, currentMonth, currentYear);

})

document.getElementById('next').addEventListener('click', () => {
    month = month + 1;
    if (month === 12) {
        month = 0;
        year = year + 1;
    }

    const days = document.getElementById('days');
    while (days.firstChild) {
        days.removeChild(days.lastChild);
    }
    myfunction(day, month, year, currentMonth, currentYear);

})

// Main function
function myfunction(day, month, year, currentMonth, currentYear) {
    let d = new Date(year, month, 1, 0, 0, 0, 0);
    let dayOfWeek = d.getDay();

    findMOnthBefore(dayOfWeek, month, year);  // Find previous month

    findMOnth(month, year); // Find current month

    const Array = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
    const nameOfMonth = Array[month];

    document.getElementById('month_year').firstChild.data = nameOfMonth + ' ' + year;
    if (currentMonth === month && currentYear === year){
        document.getElementById('days').children[day + dayOfWeek - 1].style.borderColor = 'tomato'; //points today
    }


}



// Adds days of current month
function addNodesToDates(number) {
    for (let i = 1; i <= number; i++) {
        document.getElementById('days').innerHTML += `<div class='day'>${i}</div>`;
    }

}

// Adds days of previous month
function addDaysBeforeFirst(number, dayOfWeek) {
    for (let i = number - dayOfWeek+1; i <= number; i++) {
        document.getElementById('days').innerHTML += `<div class='day dayBefore'>${i}</div>`;
    }
}

// Find previous month
function findMOnthBefore(dayOfWeek, month, year) {
    if (dayOfWeek !== 0) {
        if ([0, 2, 4, 6, 7, 9, 11].includes(month - 1)) {
            addDaysBeforeFirst(31, dayOfWeek)
        } else if ([3, 5, 8, 10].includes(month - 1)) {
            addDaysBeforeFirst(30, dayOfWeek)
        } else if (month - 1 === 1 && year % 4 === 0) {
            addDaysBeforeFirst(29, dayOfWeek)
        } else {
            addDaysBeforeFirst(28, dayOfWeek)
        }
    }
}

// Find current month
function findMOnth(month, year) {
    if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
        addNodesToDates(31);
    } else if ([3, 5, 8, 10].includes(month)) {
        addNodesToDates(30);
    } else if (month === 1 && year % 4 === 0) {
        addNodesToDates(29);
    } else {
        addNodesToDates(28);
    }
}