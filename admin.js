let addProductBtn = document.getElementById("addProductBtn");
let adminFormContClose = document.getElementById("adminFormContClose");
let adminProductFormCont = document.getElementById("adminProductFormCont");
let adminProductForm = document.getElementById("adminProductForm");
let productImage = document.getElementById("productImage");
let productTitle = document.getElementById("productTitle");
let productDesc = document.getElementById("productDesc");
let productPrice = document.getElementById("productPrice");
let productGender = document.getElementById("productGender");
let productCategory = document.getElementById("productCategory");
let productRating = document.getElementById("productRating");
let adminProductsCont = document.getElementById("adminProductsCont");
let postProductBtn = document.getElementById("postProductBtn");
let patchProductBtn = document.getElementById("patchProductBtn");

let baseURL = "http://localhost:3000";

let adminProductsData = [];

let idToBeEdited = null;

patchProductBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let editedProductDetails = {
    image: productImage.value,
    title: productTitle.value,
    description: productDesc.value,
    price: Number(productPrice.value),
    gender: productGender.value,
    category: productCategory.value,
    rating: Number(productRating.value),
  };
  console.log(editedProductDetails, "eidted", idToBeEdited);
  patchAndUpdateProduct(editedProductDetails);
});

window.addEventListener("load", () => {
  fetch(`${baseURL}/products`)
    .then((req) => req.json())
    .then((res) => {
      adminProductsData = [...res];
      console.log(adminProductsData, "res");
      displayProductsAdmin(adminProductsData);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add Product Form start ------------------------------------------------
addProductBtn.addEventListener("click", () => {
  adminProductFormCont.style.display = "block";
  patchProductBtn.style.display = "none";
});

adminFormContClose.addEventListener("click", () => {
  adminProductFormCont.style.display = "none";
  productImage.value = "";
  productTitle.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productGender.value = "";
  productCategory.value = "";
  productRating.value = "";
});

adminProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let productObj = {
    id: Number(new Date().getTime()),
    image: productImage.value,
    title: productTitle.value,
    description: productDesc.value,
    price: Number(productPrice.value),
    gender: productGender.value,
    category: productCategory.value,
    rating: Number(productRating.value),
  };
  //   console.log(productObj);

  addProduct(productObj);
});

function addProduct(data) {
  fetch(`${baseURL}/products`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((req) => req.json())
    .then((res) => console.log(res, "res"))
    .catch((err) => console.log(err));
}

// Add Product Form start ------------------------------------------------

function displayProductsAdmin(data) {
  adminProductsCont.innerHTML = "";

  data.forEach((el) => {
    let productCard = document.createElement("div");
    productCard.classList = "adminProductCard";

    let imgCont = document.createElement("div");
    imgCont.classList = "productImageCont";

    let img = document.createElement("img");
    img.src = el.image;

    imgCont.append(img);

    let productTitleAndDetails = document.createElement("div");

    let title = document.createElement("h3");
    title.textContent = "Name: " + el.title;

    let desc = document.createElement("p");
    desc.textContent = "Description: " + el.description;

    let price = document.createElement("p");
    price.textContent = "Price: " + el.price;

    let category = document.createElement("p");
    category.textContent = "Category: " + el.category;

    let gender = document.createElement("p");
    gender.textContent = "Gender: " + el.gender;

    let rating = document.createElement("p");
    rating.textContent = "Rating: " + el.rating;

    let btns = document.createElement("div");
    btns.classList = "adminAddAndDeleteBtns";

    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.addEventListener("click", () => {
      populateEditProduct(el);
    });

    let delet = document.createElement("button");
    delet.innerText = "Delete";
    delet.addEventListener("click", () => {
      deleteProduct(el, el.id);
    });

    btns.append(edit, delet);

    productTitleAndDetails.append(
      title,
      price,
      desc,
      gender,
      category,
      rating,
      btns
    );

    productCard.append(imgCont, productTitleAndDetails);
    adminProductsCont.append(productCard);
  });
}

function populateEditProduct(data) {
  console.log(data);
  adminProductFormCont.style.display = "block";
  patchProductBtn.style.display = "block";
  postProductBtn.style.display = "none";

  idToBeEdited = data.id;
  productImage.value = data.image;
  productTitle.value = data.title;
  productDesc.value = data.description;
  productPrice.value = data.price;
  productGender.value = data.gender;
  productCategory.value = data.category;
  productRating.value = data.rating;
}

function patchAndUpdateProduct(editedProductDetails) {
  fetch(`${baseURL}/products/${idToBeEdited}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedProductDetails),
  })
    .then((req) => req.json())
    .then((res) => {
      console.log(res, "res");
      idToBeEdited = null;
    })
    .catch((err) => console.log(err));
}

function deleteProduct(el, id) {
  // console.log(el, id);
  fetch(`${baseURL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((req) => req.json())
    .then((res) => {
      console.log(res, "res");
    })
    .catch((err) => console.log(err));
}
