let ave_form = document.querySelector(".js-ave_form"),
    ave_txt = ave_form.querySelector(".txt"),
    ave_btn = ave_form.querySelector(".btn");

let DEPOSIT_LS = "deposit";
let dep = [];

function sum_fir() {
    let over_20 = 0;
    let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
    let current_length = current_deposit.length;

    if (current_length < 12) {
        for (i = 0; i < current_length; i++) {
            over_20 += parseInt(current_deposit[i]);
        }
    } else {
        for (i = 0; i < 12; i ++) {
            over_20 += parseInt(current_deposit[i]);
        }
    }
    return over_20;
}

function sum_sec() {
    let over_21 = 0;
    let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
    let current_length = current_deposit.length;

    if (current_length < 24) {
        for (i = 0; i < current_length; i++) {
            over_21 += parseInt(current_deposit[i]);
        }
    } else {
        for (i = 0; i < 24; i++) {
            over_21 += parseInt(current_deposit[i]);
        }
    }
    return over_21;
}

function sum_las() {
    let over_22 = 0;
    let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
    let current_length = current_deposit.length;

    if (current_length < 36) {
        for (i = 0; i < current_deposit.length; i++) {
            over_22 += parseInt(current_deposit[i]);
        }
    }
    return over_22;
}

function sum() {
    let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
    let current_length = current_deposit.length;

    let first = document.querySelector(".first"),
        total_first = first.querySelector(".totalY"),
        second = document.querySelector(".second"),
        total_second = second.querySelector(".totalY"),
        last = document.querySelector(".last"),
        total_last = last.querySelector(".totalY");  
    
    let total_20 = sum_fir();
    total_first.innerHTML = total_20;

    let total_21 = 0;
    let total_22 = 0;

    if (sum_sec() > total_20) {
        total_21 = sum_sec() - total_20;
    } else {
        total_21 = 0;
    }
    total_second.innerHTML = total_21;

    if (sum_las() > total_21) {
        total_22 = sum_las() - total_21 - total_20;
    } else {
        total_22 = 0;
    }
    total_last.innerHTML = total_22;

    return total_20, total_21, total_22;
}

function paintDeposit(value) {
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
    ];

    for (i = 0; i < value.length; i++) {
        month_array[i].innerHTML = value[i];
    }
}

function saveDeposit() {
    localStorage.setItem(DEPOSIT_LS, JSON.stringify(dep));
}

function getDeposit() {
    let current_value = localStorage.getItem(DEPOSIT_LS);
    let parsed_value = JSON.parse(current_value);
    console.log(Array.isArray(current_value));
    console.log(Array.isArray(parsed_value));
    // string으로 저장된 array를 어떻게 되돌려야 하는지 확인 및 기억해 둘 것!!
    
    if (current_value !== null) {
        paintDeposit(parsed_value);
    }
}

function submitHandler(event) {
    event.preventDefault();
    let current_deposit = localStorage.getItem(DEPOSIT_LS);
    let parsed_deposit = JSON.parse(current_deposit);
    dep = parsed_deposit;

    let new_deposit = ave_txt.value;
    ave_txt.value = "";
    dep.push(new_deposit);
    saveDeposit();
    
    if (isNaN(new_deposit)) {
        alert("저축액은 숫자만 입력이 가능합니다.");
    } else {
        paintDeposit(dep);
    }
}

function clickHandler(event) {
    let current_deposit = JSON.parse(localStorage.getItem(DEPOSIT_LS));
    dep = current_deposit;
    dep.pop();
    saveDeposit();
    location.reload();
}

function init() {
    getDeposit();
    ave_form.addEventListener("submit", submitHandler);
    ave_btn.addEventListener("click", clickHandler);
    sum();
}

init();