import { dataKey } from "./dataKey.js";
let body = document.body;
let wrapper = document.createElement("main");
let textarea = document.createElement("textarea");
let keyboard = document.createElement("div");
body.classList.add("body");
wrapper.classList.add("main");
textarea.classList.add("main__textarea");
keyboard.classList.add("main__keyboard");
textarea.setAttribute("rows", "10");
body.prepend(wrapper);
wrapper.append(textarea, keyboard);

function getButton(row) {
  for (let i = 0; i < row.length; i++) {
    if (i === 0) {
      var div = document.createElement("div");
      div.classList.add("row");
      keyboard.append(div);
    }
    let classSplit = row[i].class.split(" ");
    let divItem = document.createElement("div");
    divItem.classList.add(`${classSplit[0]}`, `${classSplit[1]}`);
    //добавление третьего класса к кнопкам
    if (classSplit[2]) {
      divItem.classList.add(`${classSplit[2]}`);
    }
    div.append(divItem);
    divItem.innerHTML = `${row[i].key.en}`;
  }
}
for (const row of dataKey) {
  getButton(row);
}
//коллекция всех кнопок
let allButtons = document.querySelectorAll(".key");
//Обработчики событий на клавиатуру
document.addEventListener("keydown", handlerKeyDown);
keyboard.addEventListener("click", handlerKeyDown);

document.addEventListener("keyup", handlerKeyUp);
keyboard.addEventListener("click", handlerClick);

function handlerKeyDown(event) {
  for (const button of allButtons) {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
    if (
      button.classList.contains(`${event.code}`) ||
      button.classList.contains(event.target.className.split(" ")[1])
    ) {
      button.classList.add("active");
      text(event.key || event.target.innerHTML);
      console.log(event);
    }
  }
}
function handlerKeyUp(event) {
  for (const button of allButtons) {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  }
}
//функция для исчезания подсветки при клике
function handlerClick(event) {
  setTimeout(() => {
    handlerKeyUp();
  }, 150);
}
//функция добавления в в textarea
function text(item) {
  if (item === "Backspace") {
    textarea.innerHTML = textarea.innerHTML.slice(
      0,
      textarea.innerHTML.length - 1
    );
    console.log(textarea.innerHTML);
  } else {
    textarea.append(item);
  }
}
