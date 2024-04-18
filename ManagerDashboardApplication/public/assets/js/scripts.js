const btnList = document.querySelector(".btn.btn-list");
const subnav = document.querySelector(".sub-nav");
const arrow = document.querySelector(".bx-chevron-down");

btnList.addEventListener("click", () => {
  arrow.classList.toggle("rotate");
  subnav.classList.toggle("active");
});
