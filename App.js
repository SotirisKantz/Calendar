const date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

var currentMonth = month;
var currentYear = year;

const newDivText = document.createTextNode('');
document.getElementById('month_year').appendChild(newDivText);

myfunction(day, month, year, currentMonth, currentYear);

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



/*
na ftiaxsw:
1: o xrhsths na epilegei mhna xrono kai na allazei
2: modal event add
3: modal event delete
4: modal day (displays all events)*/

function myfunction(day, month, year, currentMonth, currentYear) {
    let d = new Date(year, month, 1, 0, 0, 0, 0);
    let dayOfWeek = d.getDay();

    //const DaysBeforeFirst = ((day - dayOfWeek) % 7) - 1; // number of days before the first of the month
    //const numberBefore = 7 - dayOfWeek - 1;

    findMOnthBefore(dayOfWeek, month, year);

    findMOnth(month, year);

    const Array = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
    const nameOfMonth = Array[month];

    

    //document.getElementsByClassName('month_year').innerText = month + ' ' + year;
    document.getElementById('month_year').firstChild.data = nameOfMonth + ' ' + year;
    if (currentMonth === month && currentYear === year){
        document.getElementById('days').children[day + dayOfWeek].style.borderColor = 'tomato';
    }


}




function addNodesToDates(number) {
    for (let i = 1; i <= number; i++) {
        document.getElementById('days').innerHTML += `<div class='day'>${i}</div>`;
        /*var newDiv = document.getElementById('dates').createElement('div');
        newDiv.className = 'date';
        newDiv.data = i;*/
    }

}

function addDaysBeforeFirst(number, dayOfWeek) {
    for (let i = number - dayOfWeek+1; i <= number; i++) {
        document.getElementById('days').innerHTML += `<div class='day dayBefore'>${i}</div>`;
    }
}

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