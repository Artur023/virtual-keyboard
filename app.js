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

let flag = false;
let caps = false;
let meta = false;

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
      if (event.key === "Alt") {
        flag = true;
      }
      changeLang(event);
      if (event.target.innerHTML === "CapsLock" && caps === false) {
        caps = true;
      }
      if (event.target.innerHTML === "CapsLock" && caps === true) {
        caps = false;
      }
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
  flag = false;
}
//функция для исчезания подсветки при клике
function handlerClick(event) {
  if (event.target.innerHTML !== "CapsLock") {
    setTimeout(() => {
      handlerKeyUp();
    }, 150);
  }
}

//функция добавления в в textarea
function text(item) {
  if (item.key === "Backspace" || item.target.innerHTML === "Backspace") {
    textarea.innerHTML = textarea.innerHTML.slice(
      0,
      textarea.innerHTML.length - 1
    );
    clear(item);
  } else if (item.key === "Enter" || item.target.innerHTML === "Enter") {
    textarea.append("\n");
  } else if (item.key === "Shift" || item.target.innerHTML === "Shift") {
    item.preventDefault();
    forShiftDown(item);
    if (item.target.innerHTML === "Shift") {
      setTimeout(() => {
        forShiftUp(item);
      }, 100);
    }
  } else if (item.key === "Alt" || item.target.innerHTML === "Alt") {
    textarea.innerHTML = textarea.innerHTML;
  } else if (
    item.key === "Meta" ||
    item.target.innerHTML === "Meta" ||
    item.key === "cmd" ||
    item.target.innerHTML === "cmd"
  ) {
    textarea.innerHTML = textarea.innerHTML;
    meta = true;
  } else if (item.key === "fn" || item.target.innerHTML === "fn") {
    textarea.innerHTML = textarea.innerHTML;
  } else if (item.key === "CapsLock" || item.target.innerHTML === "CapsLock") {
    forShiftDown(item);
  } else if (item.key === "Control" || item.target.innerHTML === "Ctrl") {
    item.preventDefault();
    textarea.innerHTML = textarea.innerHTML;
  } else if (item.key === "Tab" || item.target.innerHTML === "Tab") {
    item.preventDefault();
    textarea.append("    ");
  } else {
    if (item.key === "ArrowLeft") {
      textarea.append("◄");
      return;
    } else if (item.key === "ArrowRight") {
      textarea.append("►");
      return;
    } else if (item.key === "ArrowUp") {
      textarea.append("▲");
      return;
    } else if (item.key === "ArrowDown") {
      textarea.append("▼");
      return;
    }
    if (item.key) {
      // textarea.append(item.code);
      inner(item.code);
    } else {
      if (item.target.innerHTML === " ") {
        textarea.append(" ");
      }
      textarea.append(item.target.innerText);
    }
  }
}
// Функция для вставки именно текста с в клавы
function inner(code) {
  if (code === "Space") {
    textarea.append(" ");
  }
  for (const button of allButtons) {
    if (button.classList[1] === code) {
      textarea.append(button.innerText);
    }
  }
}

function forShiftDown(event) {
  for (const dataRow of dataKey) {
    for (const dataButton of dataRow) {
      for (const button of allButtons) {
        if (
          dataButton.key.en === button.innerHTML &&
          dataButton.code === button.classList[1]
        ) {
          button.innerHTML = dataButton.shift.en;
        } else if (
          dataButton.key.ru === button.innerHTML &&
          dataButton.code === button.classList[1]
        ) {
          button.innerHTML = dataButton.shift.ru;
        }
      }
    }
  }
}

function forShiftUp(event) {
  if (!event) {
  } else if (
    (event !== "undefined" && event.key === "Shift") ||
    (event !== "undefined" && event.key === "CapsLock") ||
    event.target.innerHTML === "Shift"
  ) {
    for (const dataRow of dataKey) {
      for (const dataButton of dataRow) {
        for (const button of allButtons) {
          if (
            dataButton.shift.en === button.innerHTML &&
            dataButton.code === button.classList[1]
          ) {
            button.innerHTML = dataButton.key.en;
          } else if (
            dataButton.shift.ru === button.innerHTML &&
            dataButton.code === button.classList[1]
          ) {
            button.innerHTML = dataButton.key.ru;
          }
        }
      }
    }
  }
}
// TODO проблеммы с удалением &,<,>из textarea

// let arrButtonShift = [];
// for (const button of allButtons) {
//   if (button.classList.contains("key-shift")) {
//     arrButtonShift.push(button);
//   }
// }

let change = document.createElement("div");
change.classList.add("change-lang");
keyboard.after(change);
change.innerHTML =
  "Для смены языка используйте комбинацию кнопок <b>Alt + cmd</b>";

function changeLang(event) {
  if (event.key === "Meta" && flag === true) {
    forChange(event);
    meta = false;
  }
}

function forChange(event) {
  for (const dataRow of dataKey) {
    for (const dataButton of dataRow) {
      for (const button of allButtons) {
        if (
          dataButton.key.en === button.innerHTML &&
          dataButton.code === button.classList[1]
        ) {
          button.innerHTML = dataButton.key.ru;
        } else if (
          dataButton.key.ru === button.innerHTML &&
          dataButton.code === button.classList[1]
        ) {
          button.innerHTML = dataButton.key.en;
        } else if (
          dataButton.shift.ru === button.innerHTML &&
          dataButton.code === button.classList[1]
        ) {
          button.innerHTML = dataButton.shift.en;
        } else if (
          dataButton.shift.en === button.innerHTML &&
          dataButton.code === button.classList[1]
        ) {
          button.innerHTML = dataButton.shift.ru;
        }
      }
    }
  }
}
function clear(event) {
  console.log(event);
  console.log(meta);
  if (event.key === "Backspace" && meta === true) {
    textarea.innerText = "";
    meta = false;
  }
}
