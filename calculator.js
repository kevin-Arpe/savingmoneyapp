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


function saveItem(name, num) {
    localStorage.setItem(name, num)
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
    goal_span.innerHTML = num +"원";
}
// function paintGoal

function init() {
    getTime();
    setInterval(getTime, 1000);

    paintValue();

    paintPassedMonth();
    paintRemainMonth();
}

init();