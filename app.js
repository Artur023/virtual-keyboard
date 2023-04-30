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
textarea.setAttribute("disabled", "");
textarea.setAttribute("placeholder", "Введите текcт с виртуальной клавиатуры");
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
for (let row of dataKey) {
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
      text(event);
    }
  }
}

function handlerKeyUp(event) {
  for (const button of allButtons) {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  }
  forShiftUp(event);
}
//функция для исчезания подсветки при клике
function handlerClick(event) {
  setTimeout(() => {
    handlerKeyUp();
  }, 150);
}

//функция добавления в в textarea
function text(item) {
  if (item.key === "Backspace" || item.target.innerHTML === "Backspace") {
    textarea.innerHTML = textarea.innerHTML.slice(
      0,
      textarea.innerHTML.length - 1
    );
  } else if (item.key === "Enter" || item.target.innerHTML === "Enter") {
    textarea.append("\n");
  } else if (item.key === "Shift" || item.target.innerHTML === "Shift") {
    item.preventDefault();
    forShiftDown(item);
  } else if (item.key === "Alt" || item.target.innerHTML === "Alt") {
    textarea.innerHTML = textarea.innerHTML;
  } else if (item.key === "Meta" || item.target.innerHTML === "Meta") {
    textarea.innerHTML = textarea.innerHTML;
  } else if (item.key === "fn" || item.target.innerHTML === "fn") {
    textarea.innerHTML = textarea.innerHTML;
  } else if (item.key === "CapsLock" || item.target.innerHTML === "CapsLock") {
    forShiftDown(item)
  } else if (item.key === "Control" || item.target.innerHTML === "Control") {
    item.preventDefault();
    textarea.innerHTML = textarea.innerHTML;
  } else if (item.key === "Tab" || item.target.innerHTML === "Tab") {
    item.preventDefault();
    textarea.append("  ");
  } else {
    if (item.key) {
      textarea.append(item.key);
    } else {
      textarea.append(item.target.innerHTML);
    }
  }
}

function forShiftDown(event) {
  for (const dataRow of dataKey) {
    for (const dataButton of dataRow) {
      for (const button of allButtons) {
        if (dataButton.key.en === button.innerHTML) {
          button.innerHTML = dataButton.shift.en;
        }
      }
    }
  }
}

function forShiftUp(event) {
  if (event.key === "Shift" || event.key === "CapsLock") {
    for (const dataRow of dataKey) {
      for (const dataButton of dataRow) {
        for (const button of allButtons) {
          if (dataButton.shift.en === button.innerHTML) {
            button.innerHTML = dataButton.key.en;
          }
        }
      }
    }
  }
}
// TODO проблеммы с удалением &,<,>из textarea
let arrButtonShift = [];
for (const button of allButtons) {
  if (button.classList.contains("key-shift")) {
    arrButtonShift.push(button);
  }
}
