let currentUser = localStorage.getItem("currentUser") || null;
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];
// let baseURL = "http://localhost:3000";
let baseURL = `https://nordstorm-db-json.onrender.com`;
let currentUserId = localStorage.getItem("currentUserId") || null;
let purchaseHistory = [];

window.addEventListener("load", () => {
  home__cartLength.innerText = cart.length;

  fetch(`${baseURL}/users/${currentUserId}`)
    .then((req) => req.json())
    .then((res) => {
      console.log(res.history);
      purchaseHistory = [...res.history.reverse()];
      updatePurchasePage(purchaseHistory);
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
let home__logoutCont = document.getElementById("home__logoutCont");
let home__logoutBtn = document.getElementById("home__logoutBtn");

home__logoutBtn.addEventListener("click", () => {
  if (currentUser) {
    currentUser = null;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
    alert("logged out Successfully!");
    window.location.reload();
  }
});

if (currentUser) {
  home__login.addEventListener("mouseenter", () => {
    home__logoutCont.style.display = "block";
  });

  home__nav.addEventListener("mouseleave", () => {
    home__logoutCont.style.display = "none";
  });
}

function updatePurchasePage(data) {
  if (purchaseHistory.length == 0) {
    purchase__historyCont.innerHTML = "";
    let notify = document.createElement("h2");
    notify.innerText = "Your Purchases will be shown here!!";
    notify.style.textAlign = "center";
    notify.style.fontWeight = "400";
    purchase__historyCont.append(notify);
  } else {
    purchase__historyCont.innerHTML = "";
    data.forEach((element) => {
      let historyCard = document.createElement("div");
      historyCard.id = "purchase__historyCard";

      let date = document.createElement("p");
      date.id = "purchase__purchaseDate";
      date.innerText = element.date;

      let product = document.createElement("div");
      product.id = "purchase__productCard";

      element.prducts.forEach((item) => {
        let productCard = document.createElement("div");
        productCard.id = "purchase__productCardSubCont";

        let imgCont = document.createElement("div");
        imgCont.id = "purchase__productImgCont";
        let img = document.createElement("img");
        img.src = item.image;

        imgCont.append(img);

        let productDetailsCont = document.createElement("div");

        let title = document.createElement("h3");
        title.innerText = item.title;

        let des = document.createElement("p");
        des.innerText = item.description;

        let gender = document.createElement("p");
        gender.innerText = "Gender: " + item.gender;

        let price = document.createElement("p");
        price.innerText = "Price: ₹ " + item.price;

        let qty = document.createElement("p");
        qty.innerText = "Qty: " + item.qty;

        let size = document.createElement("p");
        size.innerText = "Size: " + item.size;

        productDetailsCont.append(title, des, gender, size, price, qty);
        productCard.append(imgCont, productDetailsCont);
        product.append(productCard);
      });

      let total = document.createElement("p");
      total.id = "purchase__purchaseTotal";
      total.innerText = "Total: ₹" + element.orderTotal;

      historyCard.append(date, product, total);
      purchase__historyCont.append(historyCard);
    });
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
