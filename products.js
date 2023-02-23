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
let products__genderInputs = document.querySelectorAll(
  'input[data-name = "gender"]'
);
let products__typeInputs = document.querySelectorAll(
  'input[data-name = "type"]'
);
// console.log(products__genderInputs, products__typeInputs);
let products__genderFilter = document.getElementById("products__genderFilter");

let productDetails = JSON.parse(localStorage.getItem("productDetails")) || [];
let selectedGenders = [];
let selectedTypes = [];
let filteredGendersFromMainData = [];
let filteredTypesFromMainData = [];

products__genderInputs.forEach((item) => {
  item.addEventListener("change", () => {
    checkSelectedGenderInputs();
  });
});

// products__genderInputs.forEach((input) => {
//   if (input.checked) {
//     selectedGenders.push(input.value);
//   }
// });

// products__typeInputs.forEach((input) => {
//   if (input.checked) {
//     selectedTypes.push(input.value);
//   }
// });

function checkSelectedGenderInputs() {
  selectedGenders = [];
  products__genderInputs.forEach((input) => {
    if (input.checked) {
      selectedGenders.push(input.value);
    }
  });
  // console.log(selectedGenders, "selectedGenders");
  if (selectedGenders.length > 0) {
    filterSelectedGenders(selectedGenders);
    filterSelectedTypes(selectedTypes);
  } else if (selectedTypes.length > 0) {
    filterSelectedTypes(selectedTypes);
  } else {
    displayProducts(productsData);
  }
}

function filterSelectedGenders(selectedGenders) {
  filteredGendersFromMainData = [];

  let dataForFilteringGenders = [];

  filteredTypesFromMainData.length > 0
    ? (dataForFilteringGenders = [...filteredTypesFromMainData])
    : (dataForFilteringGenders = [...productsData]);

  console.log(dataForFilteringGenders, "gen");
  console.log(selectedGenders, "genSe");
  selectedGenders.forEach((gender) => {
    // filterForEachGender(gender);
    productsData.forEach((data) => {
      if (data.gender == gender) {
        filteredGendersFromMainData.push(data);
      }
    });
  });

  console.log(filteredGendersFromMainData, "fil");
  displayProducts(filteredGendersFromMainData);

  // if (filteredGendersFromMainData.length > 0) {
  //   displayProducts(filteredGendersFromMainData);
  // } else {
  //   displayProducts(productsData);
  // }
}

products__typeInputs.forEach((item) => {
  item.addEventListener("change", () => {
    checkSelectedTypeInputs();
    checkSelectedGenderInputs();
  });
});

function checkSelectedTypeInputs() {
  selectedTypes = [];
  products__typeInputs.forEach((input) => {
    if (input.checked) {
      selectedTypes.push(input.value);
    }
  });
  checkSelectedGenderInputs();
  console.log(selectedGenders, "selectedGen");

  console.log(selectedTypes, "selectedTypes");
  // if (selectedTypes.length > 0) {
  filterSelectedTypes(selectedTypes);
  // } else if (selectedGenders.length > 0) {
  //   filterSelectedGenders(selectedGenders);
  // } else {
  //   displayProducts(productsData);
  // }
}

function filterSelectedTypes(selectedTypes) {
  filteredTypesFromMainData = [];
  let dataForFilteringTypes = [];

  filteredGendersFromMainData.length > 0 && selectedGenders.length > 0
    ? (dataForFilteringTypes = [...filteredGendersFromMainData])
    : (dataForFilteringTypes = [...productsData]);

  // console.log(dataForFilteringTypes, "che");

  selectedTypes.forEach((type) => {
    dataForFilteringTypes.forEach((data) => {
      if (data.category == type) {
        filteredTypesFromMainData.push(data);
      }
    });
  });
  // console.log(filteredTypesFromMainData, "che after fil");
  if (filteredTypesFromMainData.length > 0) {
    displayProducts(filteredTypesFromMainData);
  }
}

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
let searchTimerId = null;

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

// home__searchBar.addEventListener("click", () => {
//   // window.location.href = "products.html";
//   searchProducts();
// });

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
  fetch(`${baseURL}/products`)
    .then((req) => req.json())
    .then((res) => {
      console.log(res, "res");
      productsData = [...res];
      displayProducts(productsData);
    });
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  home__cartLength.innerText = cart.length;
});

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
