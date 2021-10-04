const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");

hamburger.addEventListener("click", function () {
  menu.classList.toggle("menu_full-screen");
  hamburger.classList.toggle("hamburger_close");
});

const leftBtn = document.querySelector(".arrow_left");
const rightBtn = document.querySelector(".arrow_right");
const slider = document.querySelector(".slider");
const slide = document.querySelector(".slide");
const slides = document.querySelectorAll(".slide");
const slideWidth = window.getComputedStyle(slides[0]).width;
console.log(slideWidth);

const step = parseFloat(slideWidth);
const minRight = 0;
const maxRight = (slides.length - 1) * step;
console.log(maxRight);
let currentRight = 0;

slider.style.right = currentRight;

rightBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentRight < maxRight) {
    currentRight += step;
    slider.style.right = `${currentRight}px`;
  }
});

leftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentRight > minRight) {
    currentRight -= step;
    slider.style.right = `${currentRight}px`;
  }
});
