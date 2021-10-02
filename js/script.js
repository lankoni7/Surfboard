const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");

hamburger.addEventListener("click", function () {
  menu.classList.toggle("menu_full-screen");
  hamburger.classList.toggle("hamburger_close");
});
