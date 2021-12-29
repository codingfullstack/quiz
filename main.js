import questions from "./data.js";
// console.log(questions);

const next = document.getElementById("next");
const check = document.getElementById("check");
const content = document.getElementById("content");
const cardBody = document.getElementById("card-body");
const title = document.getElementById("title");
const maine = document.getElementById("maine");
let minutes;
let second;
let time;
let interval;
let count;
let i = 0;
let m;

for(m=0; m<questions.length;m++){
 questions[m].answers.sort(function () { return 0.5 - Math.random() });
 questions.sort(function () { return 0.5 - Math.random() });
}
document.getElementById("card-body").style.padding = "0";
document.getElementById("card").style.border = "none";
title.style.color = "#e6f3f7";
title.style.padding = "1%";
title.style.backgroundColor = "#97baa0";
maine.style.backgroundColor = "#afd1b7";
const p = document.createElement("h3");
p.setAttribute("id", "h3");
p.innerText = "Sveiki atvyke, norite pradėti testą?";
title.appendChild(p);

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
    const fotter = document.createElement("div");
    fotter.style.padding = "1%";
    fotter.style.backgroundColor = "#c4edce";
    cardBody.appendChild(fotter);
    for (let s = 0; s < questions.length; s++) {
        box = document.createElement("div");
        box.setAttribute("class", "item");
        box.style.display = "inline";
        box.style.padding = "6px 12px";
        box.classList.add("text-danger", "border", "border-1", "border-dark", "rounded", "m-1");
        fotter.appendChild(box);
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
    const h4 = document.createElement("h3");
    title.appendChild(h4);
    title.classList.add("d-flex", "flex-row-reverse", "justify-content-between");
    h4.innerText = i + 1 + ". " + questions[i].question;
    
};


next.addEventListener("click", () => {
    title.textContent = '';
    count.remove();
    if (i != 19) {
        timeItem();
        startInterval();
    }
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
        p.innerText = "Testą atlikote Jūsų surinkti taškai " + ": " + points;
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
    count.innerText = "30";
    count.style.fontSize = "22px";
    count.style.fontWeight = "bold";
    title.appendChild(count);
}

function timer() {
    minutes = Math.floor(time / 60);
    second = time % 60;
    count.innerHTML = `${second}`;
    if (second == 0) {
        minutes = 0;
        second = 0;
        count.style.color = "red";
        next.disabled = false;
    }  else {
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


