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
let arrSimpleButton = [
  
];
document.body.addEventListener("keypress", handler);
function handler(event) {
  arrSimpleButton.push(event.code);
  console.log(event);
}
for (let i = 0; i < arrSimpleButton.length; i++) {
  const element = arrSimpleButton[i];

  let div = document.createElement('div')
  div.classList.add('simple-button')
  div.innerHTML = element
  keyboard.append(div)
}
