// let adminAccess = document.getElementById("adminAccess");
// let adminFormCont = document.getElementById("adminFormCont");
// let adminLoginForm = document.getElementById("adminLoginForm");
// let adminFormClose = document.getElementById("adminFormClose");
// let adminFormUsername = document.getElementById("adminFormUsername");
// let adminFormPassword = document.getElementById("adminFormPassword");

let baseURL = "http://localhost:3000";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__cartLength = document.getElementById("home__cartLength");
let home__purchase = document.getElementById("home__purchase");
let home__login = document.getElementById("home__login");

home__login.addEventListener("click", () => {
  window.location.href = "login.html";
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

// signup form start --------------------------------------------------------------------

let signup__form = document.getElementById("signup__form");
let signup__username = document.getElementById("signup__username");
let signup__password = document.getElementById("signup__password");
let signup__name = document.getElementById("signup__name");
let signup__email = document.getElementById("signup__email");

signup__form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userObj = {
    id: signup__username.value,
    pass: signup__password.value,
    name: signup__name.value,
    email: signup__email.value,
    history: [],
    cart: [],
  };

  addUser(userObj);
});

function addUser(data) {
  //   console.log(data);
  fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((req) => req.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// signup form End------------------------------------------------------------------------
