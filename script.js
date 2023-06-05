let years = document.getElementById('years');
let months = document.getElementById('months');
let days = document.getElementById('days');


function CalcAge(){
   
    let inputYear = parseInt(document.getElementById('input-year').value);
    let inputMonth = parseInt(document.getElementById('input-month').value);
    let inputDay = parseInt(document.getElementById('input-day').value);

    if (isNaN(inputYear) || isNaN(inputMonth) || isNaN(inputDay)) {
        alert("wrong");
        return;
    }
    let currYear = new Date().getFullYear();
    let currMonth = new Date().getMonth() + 1;
    let currDay = new Date().getDate();

    let ageYears = currYear - inputYear;
    let ageMonths = currMonth - inputMonth;
    let ageDays = currDay - inputDay;

    if (ageMonths < 0){
        ageYears--;
        ageMonths += 12;
    }
    if (ageDays < 0){
        let prevMonthLastDay = new Date(currYear, currMonth -1, 0).getDate();
        ageDays += prevMonthLastDay;
        ageMonths--
    }
    years.innerHTML = ageYears;
    months.innerHTML = ageMonths;
    days.innerHTML = ageDays;
}