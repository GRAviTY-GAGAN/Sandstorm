let currentUser = localStorage.getItem("currentUser") || null;
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];
let baseURL = "http://localhost:3000";
let currentUserId = localStorage.getItem("currentUserId") || null;
let purchaseHistory = [];

window.addEventListener("load", () => {
  home__cartLength.innerText = cart.length;

  fetch(`${baseURL}/users/${currentUserId}`)
    .then((req) => req.json())
    .then((res) => {
      console.log(res.history);
      purchaseHistory = [...res.history];
      updatePurchasePage();
    });
});

// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__cartLength = document.getElementById("home__cartLength");
let home__purchase = document.getElementById("home__purchase");
let home__login = document.getElementById("home__login");
let purchase__historyCont = document.getElementById("purchase__historyCont");

function updatePurchasePage() {
  if (purchaseHistory.length == 0) {
    purchase__historyCont.innerHTML = "";
    let notify = document.createElement("h2");
    notify.innerText = "Your Purchases will be shown here!!";
    notify.style.textAlign = "center";
    notify.style.fontWeight = "400";
    purchase__historyCont.append(notify);
  }
}

if (currentUser) {
  home__login.innerText = `Hi, ${currentUser}`;
} else {
  home__login.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

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

// window.addEventListener("load", () => {
//   home__cartLength.innerText = cart.length;
// });

// navbar End------------------------------------------------------------------------

// adminForm Start -----------------------------------------------------------

adminAccess.addEventListener("click", () => {
  adminFormCont.style.display = "block";
});

adminFormClose.addEventListener("click", () => {
  adminFormCont.style.display = "none";
});

adminLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let adminDetails = {
    id: adminFormUsername.value,
    password: adminFormPassword.value,
  };

  verifyAdminLoginDetails(adminDetails);
});

async function verifyAdminLoginDetails(data) {
  try {
    let request = await fetch(`${baseURL}/admin/${data.id}`);
    let response = await request.json();
    // console.log(response);
    // console.log(data.id, data.password);
    if (data.password == response.password && data.id == response.id) {
      alert("Login Successful");
      window.location.href = "admin.html";
    } else {
      alert("Something Went Wrong Try Again!");
    }
  } catch (error) {
    console.log(error);
  }
}

// adminForm End-----------------------------------------------------------
