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
console.log(...dataKey);
let row1 = dataKey[0];
let row2 = dataKey[1];
let row3 = dataKey[2];
let row4 = dataKey[3];
let row5 = dataKey[4];

function getButton(row) {
  for (let i = 0; i < row.length; i++) {
    if (i === 0) {
      var div = document.createElement("div");
      div.classList.add("row");
      keyboard.append(div);
    }
    let classSplit = row[i].class.split(' ')
    console.log(classSplit)
    let divItem = document.createElement("div");
    divItem.classList.add(`${classSplit[0]}`,`${classSplit[1]}`);
    div.append(divItem);
    divItem.innerHTML = `${row[i].key.en}`
  }
}
getButton(row1);
getButton(row2);
getButton(row3);
getButton(row4);
getButton(row5);

