const buttons = document.querySelectorAll(".modeToggle");
const cadastro = document.querySelector(".cadastro");
const login = document.querySelector(".login");

let isMode = false;

buttons.forEach((button) => {
  button.addEventListener('click', function() {
    isMode = !isMode;

    if (isMode) {
      login.style.display = "none";
      cadastro.style.display = "block";
    } else {
      login.style.display = "block";
      cadastro.style.display = "none";
    }
  });
});


const buttonIndex = document.querySelector("#logo")

buttonIndex.addEventListener('click', function() {
    window.location.href = '/V3RSE/index.html';
})