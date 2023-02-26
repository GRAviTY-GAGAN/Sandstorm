let deliveryLsdata = JSON.parse(localStorage.getItem("deliveryAddress")) || [];
let cartAddedProd = JSON.parse(localStorage.getItem("cart")) || [];
// let methodToggle = JSON.parse(localStorage.getItem("method-toggle")) || ""
let carttotal = JSON.parse(localStorage.getItem("totalcart")) || "";
let texas = JSON.parse(localStorage.getItem("texes")) || "";
let totalitem = JSON.parse(localStorage.getItem("totalitem")) || "";
let currentUser = localStorage.getItem("currentUser") || null;
let orderplaceBtn = document.getElementById("placeorderBtn");
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];
let baseURL = "http://localhost:3000";
let currentUserId = localStorage.getItem("currentUserId") || null;
let totalDetails = JSON.parse(localStorage.getItem("totalDetails")) || "";
let detailForm__totalSectionItemValue = document.getElementById(
  "detailForm__totalSectionItemValue"
);
let detailForm__totalSectionDutiesValue = document.getElementById(
  "detailForm__totalSectionDutiesValue"
);
let detailForm___totalSectionTotalValue = document.getElementById(
  "detailForm___totalSectionTotalValue"
);

detailForm__totalSectionItemValue.innerText = totalDetails.item;
detailForm___totalSectionTotalValue.innerText = totalDetails.total;

let taxes = 3097;
let shippingPrice = 599;
let cartLength = cart.length;
// checkout__totalSectionItemValue.innerText = cartLength;

// totalSection(carttotal, texas, totalitem);

window.addEventListener("load", () => {
  cart = JSON.parse(localStorage.getItem(currentUser)) || [];
  methodToggle = JSON.parse(localStorage.getItem("method-toggle")) || "";
  currentUser = localStorage.getItem("currentUser") || null;
  currentUserId = localStorage.getItem("currentUserId") || null;
  totalDetails = JSON.parse(localStorage.getItem("totalDetails")) || "";
  showCartItem(cart);
  //   calculatetotal();
  detailForm__totalSectionDutiesValue.innerText = totalDetails.dutyAndTaxes;
  console.log(totalDetails.dutyAndTaxes);
});

// showCartItem(cartAddedProd);

methoddel(deliveryLsdata);
ADDRESSDEATIL(deliveryLsdata);

// orderplaceBtn.addEventListener("click", () => {
//   alert("congratulation! User  Your Order is Placed Succefully,Visit Again");
//   localStorage.setItem("purchsed", JSON.stringify(cartAddedProd));
//   localStorage.removeItem("cart");
//   localStorage.removeItem("deliveryAddress");
//   window.location.href = "./index.html";
// });

function methoddel(data) {
  let delMehtod = document.getElementById("del-Method");
  delMehtod.innerHTML = null;
  data.forEach((ele) => {
    let methodName = document.createElement("h4");
    methodName.textContent = "DELIVERY METHOD:";

    let delType = document.createElement("p");
    delType.textContent = ele.method.toUpperCase();

    let imp = document.createElement("p");
    imp.textContent = ele.deliveryCharges.toUpperCase();

    let day = document.createElement("p");
    day.textContent = ele.deliveryTime.toUpperCase();

    delMehtod.append(methodName, delType, imp, day);
  });
}

function ADDRESSDEATIL(data) {
  let delADDRESS = document.getElementById("del-address");
  delADDRESS.innerHTML = null;
  data.forEach((ele) => {
    let methodName = document.createElement("h3");
    methodName.textContent = "DELIVERY ADDRESS:";
    let delName = document.createElement("p");
    delName.textContent =
      ele.fname.toUpperCase() + " " + ele.lname.toUpperCase();
    let add = document.createElement("p");
    add.textContent = ele.address.toUpperCase();
    let city = document.createElement("p");
    city.textContent = ele.city.toUpperCase();
    let state = document.createElement("p");
    state.textContent = ele.state.toUpperCase();

    let country = document.createElement("p");
    country.textContent = ele.location;

    delADDRESS.append(methodName, delName, add, city, state, country);
  });
}

function showCartItem(data) {
  let itemShow = document.querySelector("#item");
  itemShow.innerHTML = null;

  data.forEach((ele) => {
    let divcard = document.createElement("div");

    let divCont = document.createElement("div");

    let image = document.createElement("img");
    image.src = ele.image;

    let desc = document.createElement("p");
    desc.textContent = ele.description.substring(50, 0);

    let title = document.createElement("h3");
    title.textContent = ele.title;

    let price = document.createElement("h3");
    price.textContent = ` Rs.${ele.price}`;

    let cate = document.createElement("p");
    cate.textContent = ele.category;

    let size = document.createElement("p");
    size.textContent = `Size :${ele.size}`;

    let qty = document.createElement("h4");
    qty.textContent = ` Qty: ${ele.qty}`;

    divCont.append(title, desc, qty, price, size);
    divcard.append(image, divCont);
    // console.log(divcard)
    itemShow.append(divcard);
  });
}

// cart total section
// function totalSection(carttotal, texas, totalitem) {
//   var cardToTal_Section = document.getElementById("cardToTalSection");

//   cardToTal_Section.innerHTML = null;

//   let div1 = document.createElement("div");
//   div1.classList = "totalvalue";
//   let p1 = document.createElement("p");
//   p1.textContent = "ITEM";
//   p2 = document.createElement("p");
//   p2.textContent = totalitem;

//   let div2 = document.createElement("div");
//   div2.classList = "totalvalue";
//   let p3 = document.createElement("p");
//   p3.textContent = "SHIPPING ";
//   p4 = document.createElement("p");
//   p4.textContent = `Rs. 599`;

//   let div3 = document.createElement("div");
//   div3.classList = "totalvalue";
//   let p5 = document.createElement("p");
//   p5.textContent = "DUTIES AND TAXES";
//   p6 = document.createElement("p");
//   p6.textContent = `RS. ${texas}`;

//   let div4 = document.createElement("div");
//   div4.classList = "totalvalue";
//   let p7 = document.createElement("p");
//   p7.textContent = "TOTAL VALUE";
//   p8 = document.createElement("p");
//   p8.textContent = ` RS.${carttotal}`;

//   div1.append(p1, p2);
//   div2.append(p3, p4);
//   div3.append(p5, p6);
//   div4.append(p7, p8);
//   cardToTal_Section.append(div1, div2, div3, div4);
// }

// function calculatetotal() {
//   let sum = 0;
//   sum = cart.reduce((acc, item) => {
//     return (acc += item.price * item.qty);
//   }, sum);
//   //   console.log(sum, "TOTAL");
//   checkout___totalSectionTotalValue.innerText = "";
//   checkout___totalSectionTotalValue.innerText =
//     Number(sum) + Number(shippingPrice) + Number(taxes);
// }

orderplaceBtn.addEventListener("click", () => {
  if (currentUser) {
    let userData;
    fetch(`${baseURL}/users/${currentUserId}`)
      .then((req) => req.json())
      .then((res) => {
        userData = res;
        // console.log(userData, "userData");
        updateUserData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
    let date = moment().format("MMMM Do YYYY, h:mm:ss a");
    let orderDetails = {
      date: date,
      orderTotal: totalDetails.total,
      prducts: [...cart],
    };

    function updateUserData(data) {
      data.history.push(orderDetails);
      console.log(data, "data");

      fetch(`${baseURL}/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((req) => req.json())
        .then((res) => {
          cart = [];
          //   totalDetails = {};
          deliveryLsdata = [];
          localStorage.setItem(currentUser, JSON.stringify(cart));
          localStorage.setItem("totalDetails", {});
          localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(deliveryLsdata)
          );
          console.log(res);
          alert(`Hey ${currentUser} your order has been Successfully placed.`);
          // displayandShow(cart);
          window.location.href = "index.html";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    alert("Please login first");
  }
});
