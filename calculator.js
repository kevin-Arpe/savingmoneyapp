let goal = document.querySelector(".js-goal"),
    goal_input = goal.querySelector("input"),
    goal_span = goal.querySelector("span");

let DISPLAY_CN = "display";

let goal_LS = "goal";


function saveItem(item) {
    localStorage.setItem(goal_LS, item)
}

function paintGoal(num) {
    goal_input.classList.add(DISPLAY_CN);
    goal_span.classList.remove(DISPLAY_CN);
    goal_span.innerHTML = num +"만원";
}

function getGoal() {
    let current_goal = localStorage.getItem(goal_LS);

    goal_input.classList.remove(DISPLAY_CN);
    goal_span.classList.add(DISPLAY_CN);

    if (current_goal !== null) {
        paintGoal(current_goal);
    } else {

    }
}

function handleSubmit(event) {
    event.preventDefault();
    let new_goal = goal_input.value;

    if (isNaN(new_goal)) {
        alert("금액은 숫자만 입력가능합니다.")
        return null;
    } else {
        paintGoal(new_goal);
        saveItem(new_goal);
    }
}

function init() {
    getGoal();
    goal.addEventListener("submit", handleSubmit);
}

init();