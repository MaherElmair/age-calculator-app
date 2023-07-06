let dayInput = document.getElementById("day_input");
let monthInput = document.getElementById("month_input");
let yearInput = document.getElementById("year_input");

let btn = document.getElementById("btn")
let form = document.getElementById("form");


let yearsResult = document.getElementById("years_result")
let monthsResult = document.getElementById("months_result")
let daysResult = document.getElementById("days_result")



function error(req, message) {
    const formControl = req.parentElement;
    const span = formControl.querySelector("span");
    span.innerText = message || "Error";
    req.className = "error";
    span.className = "error-text";
}

function success(req, message) {
    const formControl = req.parentElement;
    const span = formControl.querySelector("span");
    span.innerText = message || "Done";
    req.className = "success";
    span.className = "success-text";
}



function age() {
    var dayInputValue = dayInput.value;
    var monthInputValue = monthInput.value;
    var yearInputValue = yearInput.value;

    var date = new Date();
    var dayNow = date.getDate();
    var monthNow = 1 + date.getMonth(); // add 1 because getMonth() is 0-indexed
    var yearNow = date.getFullYear();
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (dayInputValue > dayNow) {
        dayNow = dayNow + month[monthNow - 1];
        monthNow = monthNow - 1;
    }
    if (monthInputValue > monthNow) {
        monthNow = monthNow + 12;
        yearNow = yearNow - 1;
    }
    var dayValue = dayNow - dayInputValue;
    var monthValue = monthNow - monthInputValue;
    var yearValue = yearNow - yearInputValue;


    if (dayInput.className === "success" &&
        monthInput.className === "success" &&
        yearInput.className === "success") {
        yearsResult.innerHTML = yearValue;
        monthsResult.innerHTML = monthValue;
        daysResult.innerHTML = dayValue;
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const dateYearValue = yearInput.value.trim();
    const dateMonthValue = monthInput.value.trim();
    const dateDayValue = dayInput.value.trim();

    //Javascript reGex  
    const regYear = /[12]\d{3}/;
    // const regMonth = /(0[1-9]|1[0-2])/;
    // const regDay = /(0[1-9]|[12]\d|3[01])/;

    var now = new Date();
    var yearNow = now.getFullYear();

    if (dateDayValue === "") {
        error(dayInput, "This field is incomplete");
    } else if (dateDayValue <= 0 || dateDayValue >= 32) {
        error(dayInput, "This Field is not Valid");
    } else {
        success(dayInput);
    }

    if (dateMonthValue === "") {
        error(monthInput, "This field is incomplete");
    } else if (dateMonthValue <= 0 || dateMonthValue >= 13) {
        error(monthInput, "This Field is not Valid");
    } else {
        success(monthInput);
    }

    if (dateYearValue === "") {
        error(yearInput, "This field is incomplete");
    } else if (!dateYearValue.match(regYear)) {
        error(yearInput, "This Field is not Valid");
    } else if (dateYearValue >= yearNow) {
        error(yearInput, "This Field is not Valid");
    } else {
        success(yearInput);
    }


    age()
})

