let clockFrame = document.querySelector(".js-clock"),
    clockTitle = clockFrame.querySelector(".js-clockTitle"),
    dateTitle = clockFrame.querySelector(".js-dateTitle");

let weekdayList = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let day = now.getDay();
    let month = now.getMonth();
    let date = now.getDate();
    let year = now.getFullYear();

    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    dateTitle.innerHTML = `${weekdayList[day]}, ${monthList[month]} ${date}, ${year}`;
}

function monthDiff_passed(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
}

function paintPassedMonth() {
    let now = new Date();
    let start = new Date(2020, 1, 1);
    let passed_month = monthDiff_passed(start, now);
    let passed = document.querySelector(".passed"),
        passedSpan = passed.querySelector("span");
    
    passedSpan.innerHTML = passed_month +"개월";
}

function monthDiff_remained(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function paintRemainMonth() {
    let now = new Date();
    let fin = new Date(2022, 12, 31);
    let left_month = monthDiff_remained(now, fin);
    let remain_month = document.querySelector(".remain_month"),
        month = remain_month.querySelector("span");

    month.innerHTML = left_month +"개월";
}
// 날짜 및 시간

let goal = document.querySelector(".js-goal"),
    goal_input = goal.querySelector("input"),
    goal_span = goal.querySelector("span");

let DISPLAY_CN = "display";

let goal_LS = "goal";


function saveItem(name, item) {
    localStorage.setItem(name, item)
}

function paintValue() {
    let current_goal = localStorage.getItem(goal_LS);

    if (current_goal !== null) {
        paintGoal(current_goal);
    } else {
        goal.addEventListener("submit", function(event) {
            event.preventDefault();
            let new_goal = goal_input.value;
            if (isNaN(new_goal)) {
                alert("금액은 숫자만 입력가능합니다.")
                return null;
            } else {
                paintValue(new_goal);
                saveItem(goal_LS, new_goal);
            }
        })
    }
}
// function saveItem and paintValue

function paintGoal(num) {
    goal_input.classList.add(DISPLAY_CN);
    goal_span.classList.remove(DISPLAY_CN);
    goal_span.innerHTML = num +"만원";
}
// function paintGoal

let DEPOSIT_LS = "deposit";
let dep = [];

function getDeposit() {
    let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
    dep = current_deposit;

    if (current_deposit !== null) {
        paintDeposit();
    } else {

    }
}

function paintDeposit() {
    let first = document.querySelector(".first"),
        first_jan = first.querySelector(".jan"),
        first_feb = first.querySelector(".feb"),
        first_mar = first.querySelector(".mar"),
        first_apr = first.querySelector(".apr"),
        first_may = first.querySelector(".may"),
        first_jun = first.querySelector(".jun"),
        first_jul = first.querySelector(".jul"),
        first_aug = first.querySelector(".aug"),
        first_sep = first.querySelector(".sep"),
        first_oct = first.querySelector(".oct"),
        first_nov = first.querySelector(".nov"),
        first_dec = first.querySelector(".dec");

    let second = document.querySelector(".second"),
        second_jan = second.querySelector(".jan"),
        second_feb = second.querySelector(".feb"),
        second_mar = second.querySelector(".mar"),
        second_apr = second.querySelector(".apr"),
        second_may = second.querySelector(".may"),
        second_jun = second.querySelector(".jun"),
        second_jul = second.querySelector(".jul"),
        second_aug = second.querySelector(".aug"),
        second_sep = second.querySelector(".sep"),
        second_oct = second.querySelector(".oct"),
        second_nov = second.querySelector(".nov"),
        second_dec = second.querySelector(".dec");

    let last = document.querySelector(".last"),
        last_jan = last.querySelector(".jan"),
        last_feb = last.querySelector(".feb"),
        last_mar = last.querySelector(".mar"),
        last_apr = last.querySelector(".apr"),
        last_may = last.querySelector(".may"),
        last_jun = last.querySelector(".jun"),
        last_jul = last.querySelector(".jul"),
        last_aug = last.querySelector(".aug"),
        last_sep = last.querySelector(".sep"),
        last_oct = last.querySelector(".oct"),
        last_nov = last.querySelector(".nov"),
        last_dec = last.querySelector(".dec");

    let month_array = [
        first_jan, first_feb, first_mar, first_apr, first_may, first_jun, first_jul, first_aug, first_sep, first_oct, first_nov, first_dec,
        second_jan, second_feb, second_mar, second_apr, second_may, second_jun, second_jul, second_aug, second_sep, second_oct, second_nov, second_dec,
        last_jan, last_feb, last_mar, last_apr, last_may, last_jun, last_jul, last_aug, last_sep, last_oct, last_nov, last_dec
    ]

    for (i = 0; i < dep.length; i++) {
        month_array[i].innerHTML = dep[i];
    }

}

function addDeposit() {
    let ave_form = document.querySelector(".js-ave_form"),
        ave_txt = ave_form.querySelector(".txt"),
        ave_btn = ave_form.querySelector(".btn");

    ave_form.addEventListener("submit", function(event) {
        let currentValue = ave_txt.value;

        if (isNaN(currentValue)) {
            alert("금액은 숫자만 입력가능합니다.")
            return null;
        } else {
            dep.push(currentValue);
            ave_txt.value = "";
            saveItem(DEPOSIT_LS, JSON.stringify(dep));
        }
    })

    ave_btn.addEventListener("click", function(event) {
        let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
        dep = current_deposit;
        dep.pop();
        saveItem(DEPOSIT_LS, JSON.stringify(dep));
        location.reload(true);
        })
}


// monthly data

function init() {
    getTime();
    setInterval(getTime, 1000);

    paintValue();

    paintPassedMonth();
    paintRemainMonth();

    getDeposit();
    addDeposit();

    
}

init();