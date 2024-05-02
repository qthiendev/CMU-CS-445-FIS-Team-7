const submit = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");
const notification = document.getElementById("notification");
const box_pass = document.querySelector(".box-pass");
box_pass.addEventListener("click", () => {
  if (password.type == "password") {
    password.type = "text";
    box_pass.classList.add("box-pass-2");
  } else {
    password.type = "password";
    box_pass.classList.remove("box-pass-2");
  }
});