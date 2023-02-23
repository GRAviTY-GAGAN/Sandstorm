let products__productsCont = document.getElementById("products__productsCont");
let products__typeExpand = document.getElementById("products__typeExpand");
let products__typeCollaps = document.getElementById("products__typeCollaps");
let products__genderExpand = document.getElementById("products__genderExpand");
let products__genderCollaps = document.getElementById(
  "products__genderCollaps"
);
let products__productTypeFilter = document.getElementById(
  "products__productTypeFilter"
);
let products__genderFilter = document.getElementById("products__genderFilter");

let productDetails = JSON.parse(localStorage.getItem("productDetails")) || [];

products__genderExpand.addEventListener("click", () => {
  products__genderExpand.style.display = "none";
  products__genderCollaps.style.display = "block";
  products__genderFilter.style.height = "fit-content";
});

products__genderCollaps.addEventListener("click", () => {
  products__genderExpand.style.display = "block";
  products__genderCollaps.style.display = "none";
  products__genderFilter.style.height = "56px";
});

products__typeExpand.addEventListener("click", () => {
  products__typeExpand.style.display = "none";
  products__typeCollaps.style.display = "block";
  products__productTypeFilter.style.height = "fit-content";
});

products__typeCollaps.addEventListener("click", () => {
  products__typeExpand.style.display = "block";
  products__typeCollaps.style.display = "none";
  products__productTypeFilter.style.height = "56px";
});

let baseURL = "http://localhost:3000";
let productsData = [];

// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

home__searchBar.addEventListener("click", () => {
  window.location.href = "Singlepage.html";
});

home__cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

// navbar End------------------------------------------------------------------------

window.addEventListener("load", () => {
  fetch(`${baseURL}/products`)
    .then((req) => req.json())
    .then((res) => {
      console.log(res);
      productsData = [...res];
      displayProducts(productsData);
    });
});

function displayProducts(data) {
  products__productsCont.innerHTML = "";
  console.log("hello");
  data.forEach((item) => {
    let productCard = document.createElement("div");
    productCard.classList = "product__productCard";
    productCard.addEventListener("click", () => {
      productDetails = [];
      productDetails.push(item);
      localStorage.setItem("productDetails", JSON.stringify(productDetails));
      window.location.href = "Singlepage.html";
    });

    let imgCont = document.createElement("div");
    imgCont.id = "products__ImgCont";

    let img = document.createElement("img");
    img.src = item.image;

    imgCont.append(img);

    let detailsSubCont = document.createElement("div");
    detailsSubCont.id = "products__detailsSubCont";

    let title = document.createElement("p");
    title.innerText = item.title;

    let desc = document.createElement("p");
    desc.innerText = item.description.substring(0, 50) + "...";

    let price = document.createElement("p");
    price.innerText = `INR ${item.price}`;

    let rating = document.createElement("p");
    rating.innerText = `Rating (${item.rating})`;

    detailsSubCont.append(title, desc, price, rating);
    productCard.append(imgCont, detailsSubCont);
    products__productsCont.append(productCard);
  });
}

// Footer code starts-----------------------------------------------

// adminForm Start -----------------------------------------------------------

let adminAccess = document.getElementById("adminAccess");

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

// Footer Code Ends------------------------------------------------
