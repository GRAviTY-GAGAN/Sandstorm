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
let signup__password = document.getElementById("signup__password");
let signup__name = document.getElementById("signup__name");
let signup__email = document.getElementById("signup__email");
let signup__confirmPassword = document.getElementById(
  "signup__confirmPassword"
);
let existingUsers = [];
let currentUser = localStorage.getItem("currrentUser") || null;
signup__form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userObj = {
    id: signup__email.value,
    pass: signup__password.value,
    name: signup__name.value,
    history: [],
  };
  if (signup__password.value == signup__confirmPassword.value) {
    fetch(`${baseURL}/existingUsers`)
      .then((req) => req.json())
      .then((res) => {
        existingUsers = [...res];
        let flag = false;
        flag = existingUsers.some((item) => {
          if (item.id == signup__email.value) {
            flag = true;
            return flag;
          }
          flag = false;
          return flag;
        });
        if (flag) {
          alert("User already exists");
        } else {
          alert("User Successfully Created");
          addUser(userObj);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Please check your password");
  }
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
      window.location.href = "login.html";
      //   currentUser = res.name;
      //   localStorage.setItem("currentUser", currentUser);
    })
    .catch((err) => {
      console.log(err);
    });
  fetch(`${baseURL}/existingUsers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: data.id }),
  })
    .then((req) => req.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
