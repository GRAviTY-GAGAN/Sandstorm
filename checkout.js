let deliveryAddData = JSON.parse(localStorage.getItem("deliveryAddress")) || {};
//console.log(deliveryAddData)
let delMethod = "";
let deliveryMethodethodName;
let deliveryMethodethodCharges;
let deliveryMethodethodTimeTaken;
let dutyANdTaxesPrice;
let cartTotal;
// let cartAddedProd = JSON.parse(localStorage.getItem("cart")) || []
let methodToggle = JSON.parse(localStorage.getItem("method-toggle")) || "";
let currentUser = localStorage.getItem("currentUser") || null;
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];
let baseURL = "http://localhost:3000";
let currentUserId = localStorage.getItem("currentUserId") || null;
let checkout__totalSectionItemValue = document.getElementById(
  "checkout__totalSectionItemValue"
);
let checkout__totalSectionDutiesValue = document.getElementById(
  "checkout__totalSectionDutiesValue"
);
let checkout___totalSectionTotalValue = document.getElementById(
  "checkout___totalSectionTotalValue"
);
let taxes = 3097;
let shippingPrice = 599;
let cartLength = cart.length;
checkout__totalSectionItemValue.innerText = cartLength;

window.addEventListener("load", () => {
  cart = JSON.parse(localStorage.getItem(currentUser)) || [];
  methodToggle = JSON.parse(localStorage.getItem("method-toggle")) || "";
  currentUser = localStorage.getItem("currentUser") || null;
  currentUserId = localStorage.getItem("currentUserId") || null;
  showCartItem(cart);
  calculatetotal();
});

showCartItem(cart); //

let promocode = document.getElementById("promocode");
// getting contionue button
let btnCheckout = document.getElementById("checkoutbtn");

// addevent listner section
btnCheckout.addEventListener("click", (e) => {
  e.preventDefault();
  sendData();
  alert("Your Detail is Saved Succesfully");
  window.location.href = "./detailform.html";
});
function sendData() {
  let deliveryAddressObj = {
    email: document.getElementById("email").value,
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    address: document.getElementById("address").value,
    address2: document.getElementById("address2").value,
    postal: document.getElementById("Postalcode").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    method: deliveryMethodethodName,
    deliveryTime: deliveryMethodethodTimeTaken,
    deliveryCharges: deliveryMethodethodCharges,
  };

  let totalDetails = {
    item: cartLength,
    shipping: 599,
    dutyAndTaxes: dutyANdTaxesPrice,
    total: cartTotal,
  };

  window.localStorage.setItem("totalDetails", JSON.stringify(totalDetails));

  window.localStorage.setItem(
    "deliveryAddress",
    JSON.stringify([deliveryAddressObj])
  );
  console.log(deliveryAddressObj, "ADEDED");
}

// toggle the method value

document.querySelectorAll('input[name="drone"]').forEach((elem) => {
  elem.addEventListener("change", function (event) {
    taxes = event.target.value;

    checkout__totalSectionDutiesValue.innerText = event.target.value;
    calculatetotal();
    // totalSection(cart, data);
    if (event.target.dataset.name == "standard-1") {
      deliveryMethodethodName = "standard-1";
      deliveryMethodethodCharges = "No additional import charges at delivery";
      deliveryMethodethodTimeTaken = "11–21 business days";
      dutyANdTaxesPrice = 4097;
    } else if (event.target.dataset.name == "standard-2") {
      deliveryMethodethodName = "standard-2";
      deliveryMethodethodCharges = "Import charges collected upon delivery";
      deliveryMethodethodTimeTaken = "11–21 business days";
      dutyANdTaxesPrice = 3098;
    } else if (event.target.dataset.name == "express-1") {
      deliveryMethodethodName = "express-1";
      deliveryMethodethodCharges = "Import charges collected upon delivery";
      deliveryMethodethodTimeTaken = "06-11 business days";
      dutyANdTaxesPrice = 6085;
    } else if (event.target.dataset.name == "express-2") {
      deliveryMethodethodName = "express-2";
      deliveryMethodethodCharges = "Import charges collected upon delivery";
      deliveryMethodethodTimeTaken = "06-11 business days";
      dutyANdTaxesPrice = 5085;
    }
  });
});

// appending the cartdadded product
function showCartItem(data) {
  let itemShow = document.querySelector("#item");
  itemShow.innerHTML = null;

  data.forEach((ele) => {
    let divcard = document.createElement("div");

    let divCont = document.createElement("div");

    let image = document.createElement("img");
    image.src = ele.image;

    let desc = document.createElement("p");
    desc.textContent = ele.description.substring(20, 0);

    let title = document.createElement("h4");
    title.textContent = ele.title;

    let price = document.createElement("h4");
    price.textContent = ` Rs.${ele.price}`;

    let cate = document.createElement("p");
    cate.textContent = ele.category;

    let gender = document.createElement("p");
    gender.textContent = ele.gender;

    let qty = document.createElement("p");
    qty.textContent = ` Qty: ${ele.qty}`;

    let size = document.createElement("p");
    size.textContent = `Size :${ele.size}`;

    divCont.append(title, desc, gender, qty, price, size);
    divcard.append(image, divCont);

    itemShow.append(divcard);
  });
}

function calculatetotal() {
  let sum = 0;
  sum = cart.reduce((acc, item) => {
    return (acc += item.price * item.qty);
  }, sum);
  //   console.log(sum, "TOTAL");
  checkout___totalSectionTotalValue.innerText = "";
  checkout___totalSectionTotalValue.innerText =
    Number(sum) + Number(shippingPrice) + Number(taxes);
  cartTotal = Number(sum) + Number(shippingPrice) + Number(taxes);
}

function sumItem(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].qty;
  }
  total = sum;
  localStorage.setItem("totalitem", JSON.stringify(total));
  return total;
}
