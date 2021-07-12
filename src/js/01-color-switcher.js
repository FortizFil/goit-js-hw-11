

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyUrl = document.querySelector('body');
let timerId = null;


startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true);
  timerId = setInterval(() => {
    bodyUrl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});



stopBtn.addEventListener("click", () => {
  startBtn.removeAttribute("disabled");
  clearInterval(timerId);

});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

