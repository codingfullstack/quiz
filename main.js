import questions from "./data.js";
// console.log(questions);

const next = document.getElementById("next");
const check = document.getElementById("check");
const content = document.getElementById("content");
const container = document.getElementById("container");
let minutes;
let second;
let time;
let interval;
let count;
let i = 0;

const p = document.createElement("h3");
p.setAttribute("id", "h3");
p.innerText = "Sveiki atvyke, norite pradėti testą?";
content.appendChild(p);

document.getElementById("start").addEventListener('click', () => {
    timeItem();
    startInterval();
    p.remove();
    next.style.display = "inline";
    check.style.display = "inline";
    document.getElementById("start").remove();
    getQuestion(i);
    questions[i].answers.forEach(getAnswers)
    createBox();
});


function createBox() {
    let box;
    for (let s = 0; s < questions.length; s++) {
        box = document.createElement("div");
        box.setAttribute("class", "item");
        box.style.display = "inline";
        box.style.padding = "6px 12px";
        box.classList.add("text-danger", "border", "border-1", "border-dark", "rounded", "m-1");
        container.appendChild(box);
    }
}

function getAnswers(item) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", questions[i].id);
    input.setAttribute("value", item.isCorrect);
    input.setAttribute("id", item.text)
    const label = document.createElement("label");
    label.setAttribute("for", item.text)
    label.innerText = item.text;
    div.append(input, label);
    content.append(div);
};


function getQuestion(i) {
    const h4 = document.createElement("h4");
    h4.innerText = i + 1 + ". " + questions[i].question;
    content.appendChild(h4);
};


next.addEventListener("click", () => {
    count.remove();
    timeItem();
    startInterval();
    check.disabled = false;
    next.disabled = true;
    i++
    content.textContent = '';
    if (i == questions.length - 1) {
        next.value = "Pateikti";
        getQuestion(i);
        questions[i].answers.forEach(getAnswers)
    } else if (i == questions.length) {
        const p = document.createElement("h3");
        p.setAttribute("id", "h3");
        p.innerText = "Testą atlikote Jūs surinkote " + "" + points + " taškus";
        content.appendChild(p);
        next.remove();
        check.remove();
    } else {
        getQuestion(i);
        questions[i].answers.forEach(getAnswers)
    }

});
let points = 0;
function boxItem(number, value) {

    let items = document.getElementsByClassName("item");
    let x;


    for (let i = 0; i <= number; i++) {
        x = items[i];
    }

    const y = document.createElement("span");
    y.style.maxWidth = "0px";
    console.log();
    y.innerText = i + 1;
    x.append(y)
    y.style.color = "black";
    if (value === "true") {
        x.style.backgroundColor = "#83d75d";
    } else {
        x.style.backgroundColor = "#e06666"
    }

    console.log(x)
}

check.addEventListener('click', () => {
    stopTimer();
    let form = document.forms[0];
    let value;
    let k;
    for (k = 0; k < form.length; k++) {
        if (form[k].checked) {
            value = form[k].value;
        }
    }
    console.log(value)
    console.log(typeof value)
    if (value != undefined) {
        if (second >= 1) {
            if (value === "true") {
                points++;
                console.log("atsakymas geras");
                console.log(points);
                next.disabled = false
                check.disabled = true;
            } else {
                next.disabled = false;
                check.disabled = true;
                console.log("atsakymas blogas");
            }
            boxItem(i, value);
        }
    }
});

// timer
let StartTimer = 0.50;
time = StartTimer * 60;

function timeItem() {
    count = document.createElement("div");
    count.innerText = "0 : 30";
    count.style.margin = "1%";
    count.style.fontSize = "22px";
    count.style.fontWeight = "bold";
    card.append(count);
}

function timer() {
    minutes = Math.floor(time / 60);
    second = time % 60;
    count.innerHTML = `${minutes} : ${second}`;
    if (second == 0) {
        minutes = 0;
        second = 0;
        count.style.color = "red";
    } else {
        time--;
    }
}

function stopTimer() {
    clearInterval(interval);
    time = StartTimer * 60
}

function startInterval() {
    interval = setInterval(function () {
        timer();
    }, 1000);
}


