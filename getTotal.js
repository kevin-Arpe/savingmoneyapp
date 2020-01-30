let current_goal = localStorage.getItem(goal_LS),
    parsed_goal = parseInt(current_goal);

let CN_20 = document.querySelector(".first"),
    CN_21 = document.querySelector(".second"),
    CN_22 = document.querySelector(".last"),
    CN_month = document.querySelector(".remain_month");

let sum_20 = CN_20.querySelector(".totalY").innerHTML,
    sum_21 = CN_21.querySelector(".totalY").innerHTML,
    sum_22 = CN_22.querySelector(".totalY").innerHTML,
    remain_month = CN_month.querySelector("span").innerHTML;

let parsed_20 = parseInt(sum_20),
    parsed_21 = parseInt(sum_21),
    parsed_22 = parseInt(sum_22),
    parsed_month = parseInt(remain_month);

let saved_tag = document.querySelector(".saved"),
    remain_tag = document.querySelector(".remain"),
    ave_tag = document.querySelector(".ave_deposit"),

    saved_span = saved_tag.querySelector("span"),
    remain_span = remain_tag.querySelector("span"),
    month_span = ave_tag.querySelector("span");

function getTotal() {
    let deposit_total = parsed_20 + parsed_21 + parsed_22;
    let remain_total = parsed_goal - deposit_total;

    saved_span.innerHTML = deposit_total +"만원";
    remain_span.innerHTML = remain_total +"만원";
    month_span.innerHTML = remain_total / parsed_month +"만원";
}

function init() {
    getTotal();
}

init();