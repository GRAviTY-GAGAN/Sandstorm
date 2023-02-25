let baseURL = "http://localhost:3000";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__cartLength = document.getElementById("home__cartLength");
let home__purchase = document.getElementById("home__purchase");
let login__signup = document.getElementById("login__signup");

login__signup.addEventListener("click", () => {
  window.location.href = "signup.html";
});

home__purchase.addEventListener("click", () => {
  window.location.href = "purchase.html";
});

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

home__searchBar.addEventListener("click", () => {
  window.location.href = "products.html";
});

home__cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

window.addEventListener("load", () => {
  home__cartLength.innerText = cart.length;
});

// navbar End------------------------------------------------------------------------

// login form start -------------------------------------------------------------------------

let login__form = document.getElementById("login__form");
let login__username = document.getElementById("login__username");
let login__password = document.getElementById("login__password");

login__form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(login__username.value, login__password.value);
});

// login form end -------------------------------------------------------------------------
