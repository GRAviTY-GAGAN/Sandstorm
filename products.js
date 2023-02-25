let products__paginationPrevBtn = document.getElementById(
  "products__paginationPrevBtn"
);
let products__paginationNextBtn = document.getElementById(
  "products__paginationNextBtn"
);
let products__productsCont = document.getElementById("products__productsCont");
let products__typeExpand = document.getElementById("products__typeExpand");
let products__typeCollaps = document.getElementById("products__typeCollaps");
let products__genderExpand = document.getElementById("products__genderExpand");
let home__login = document.getElementById("home__login");

home__login.addEventListener("click", () => {
  window.location.href = "login.html";
});

let products__genderCollaps = document.getElementById(
  "products__genderCollaps"
);
let products__productTypeFilter = document.getElementById(
  "products__productTypeFilter"
);
let products__genderInputs = document.querySelectorAll(
  'input[data-name = "gender"]'
);
let products__typeInputs = document.querySelectorAll(
  'input[data-name = "type"]'
);
// console.log(products__genderInputs, products__typeInputs);
let products__genderFilter = document.getElementById("products__genderFilter");

let productDetails = JSON.parse(localStorage.getItem("productDetails")) || [];

let genderToFilter = "";
let typeToFilter = "";
products__genderInputs.forEach((input) => {
  input.addEventListener("change", () => {
    products__productsCont.style.display = "none";

    input.checked ? (genderToFilter = input.value) : (genderToFilter = "");
    console.log(genderToFilter, "gentofil");
    if (typeToFilter) {
      fetchDataForSort(
        `${baseURL}/products?gender=${genderToFilter}&category=${typeToFilter}`
      );
      products__productsCont.style.display = "grid";
    } else {
      fetchDataForSort(`${baseURL}/products?gender=${genderToFilter}`);
      products__productsCont.style.display = "grid";
    }
  });
});

products__typeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    products__productsCont.style.display = "none";

    input.checked ? (typeToFilter = input.value) : (typeToFilter = "");
    console.log(typeToFilter);
    if (genderToFilter) {
      fetchDataForSort(
        `${baseURL}/products?gender=${genderToFilter}&category=${typeToFilter}`
      );
      products__productsCont.style.display = "grid";
    } else {
      fetchDataForSort(`${baseURL}/products?category=${typeToFilter}`);
      products__productsCont.style.display = "grid";
    }
  });
});

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
let emojiArr = ["😑", "🤔", "😔", "😓", "😖", "😢", "😭", "🥺", "😟", "😒"];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__cartLength = document.getElementById("home__cartLength");
let home__search = document.getElementById("home__search");
let home__purchase = document.getElementById("home__purchase");

home__purchase.addEventListener("click", () => {
  window.location.href = "purchase.html";
});

let searchTimerId = null;
let totalDataPresent;
let pagesToWatch;

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

home__cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

function debounceSearch() {
  if (searchTimerId) {
    clearTimeout(searchTimerId);
  }
  searchTimerId = setTimeout(() => {
    searchProducts();
  }, 1500);
}

function searchProducts() {
  let searchFilteredProductData = productsData.filter((item) => {
    return item.title.toLowerCase().includes(home__search.value.toLowerCase());
  });
  if (searchFilteredProductData.length == 0) {
    products__productsCont.innerHTML = "";

    products__productsCont.style.display = "block";

    let notFoundMainCont = document.createElement("div");
    notFoundMainCont.id = "products__notFoundMainCont";

    let notFoundline1 = document.createElement("p");
    notFoundline1.id = "products__notFoundline1";
    notFoundline1.innerHTML = `No Products Were Found <span>${
      emojiArr[Math.floor(Math.random() * 10)]
    }</span>`;

    let notFoundline2 = document.createElement("p");
    notFoundline2.id = "products__notFoundline2";
    notFoundline2.innerText = "Check the spelling or try a more general term";

    notFoundMainCont.append(notFoundline1, notFoundline2);
    products__productsCont.append(notFoundMainCont);
  } else {
    products__productsCont.style.display = "grid";
    displayProducts(searchFilteredProductData);
  }
}

// navbar End------------------------------------------------------------------------

window.addEventListener("load", () => {
  fetchData(`${baseURL}/products`);
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  home__cartLength.innerText = cart.length;
});

function fetchData(url) {
  fetch(`${url}`)
    .then((req) => {
      return req.json();
    })
    .then((res) => {
      console.log(res, "res");
      productsData = [...res];
      displayProducts(productsData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchDataForSort(url) {
  fetch(`${url}`)
    .then((req) => {
      return req.json();
    })
    .then((res) => {
      console.log(res, "res");
      productsData = [...res];
      displayProducts(productsData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayProducts(data) {
  products__productsCont.innerHTML = "";
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

// sorting start----------------------------------------------------------
let products__sort = document.getElementById("products__sort");
products__sort.addEventListener("change", () => {
  console.log(products__sort.value);
  if (products__sort.value == "") {
    sortingApplied = false;
    fetchData(`${baseURL}/products`);
    products__productsCont.style.display = "grid";
  } else {
    if (products__sort.value == "plh" || products__sort.value == "phl") {
      if (products__sort.value == "plh") {
        fetchData(`${baseURL}/products?_sort=price&_order=asc`);
        products__productsCont.style.display = "grid";
      } else if (products__sort.value == "phl") {
        fetchData(`${baseURL}/products?_sort=price&_order=desc`);
        products__productsCont.style.display = "grid";
      }
    } else {
      if (products__sort.value == "rlh") {
        fetchData(`${baseURL}/products?_sort=rating&_order=asc`);
        products__productsCont.style.display = "grid";
      } else if (products__sort.value == "rhl") {
        fetchData(`${baseURL}/products?_sort=rating&_order=desc`);
        products__productsCont.style.display = "grid";
      }
    }
  }
});

// sorting end----------------------------------------------------------
