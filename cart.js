// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__purchase = document.getElementById("home__purchase");
let home__login = document.getElementById("home__login");
let checkout = document.getElementById("checkout");
let currentUser = localStorage.getItem("currentUser") || null;

let cart__userName = document.getElementById("cart__userName");

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

// let baseURL = "http://localhost:3000";
let baseURL = `https://nordstorm-db-json.onrender.com`;
let currentUserId = localStorage.getItem("currentUserId") || null;
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];

if (currentUser) {
  home__login.innerText = `Hi, ${currentUser}`;
  cart__userName.innerText = `To ${currentUser}'s address`;
  cart__userName.style.wordSpacing = "6px";
} else {
  cart__userName.innerText = `To user address`;

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

checkout.addEventListener("click", () => {
  if (currentUser) {
    if (cart.length > 0) {
      window.location.href = "checkout.html";
    } else {
      alert("Please add items to the cart");
    }
  } else {
    alert("Please login first");
  }
});

// navbar End------------------------------------------------------------------------

//start to append products..............................................
cartpagedatamain = document.getElementById("cartpagedatamain");
imageofcart = document.getElementById("imageofcart");
detailofcartpoducts = document.getElementById("detailofcartpoducts");
let cartLength = document.getElementById("home__cartLength");

let itemscount = document.getElementById("totalitemcount");

cartLength.innerText = cart.length;
itemscount.innerText = cart.length;

let cartTotal = 0;

displayandShow(cart);

function displayandShow(cart) {
  itemscount.innerText = cart.length;
  cartLength.innerText = cart.length;
  cartpagedatamain.innerHTML = "";
  let totalprice = document.getElementById("total-price");
  cart.forEach((ele) => {
    let cardMainCont = document.createElement("div");
    cardMainCont.classList = "cart__singleProductCard"; //give display fle
    let imageCont = document.createElement("div");

    let img = document.createElement("img");
    img.src = ele.image;

    let qtyBtnsCont = document.createElement("div");
    qtyBtnsCont.id = "cart__qtyBtnsCont";

    let increasequantity = document.createElement("button");
    increasequantity.classList = "button";
    increasequantity.innerText = "+";

    let quantity = document.createElement("span1");
    quantity.innerText = "Qty: " + Number(ele.qty);

    let decreasequantity = document.createElement("button");
    decreasequantity.classList = "button";
    decreasequantity.innerText = "-";

    increasequantity.addEventListener("click", () => {
      itemscount.innerText = ele.qty++;
      localStorage.setItem(currentUser, JSON.stringify(cart));
      cart = JSON.parse(localStorage.getItem(currentUser));
      displayandShow(cart);
    });
    decreasequantity.addEventListener("click", (e) => {
      if (ele.qty > 1) {
        itemscount.innerText = ele.qty--;

        localStorage.setItem(currentUser, JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem(currentUser));
        displayandShow(cart);
      }
    });

    qtyBtnsCont.append(increasequantity, quantity, decreasequantity);

    imageCont.append(img, qtyBtnsCont);

    let productDetailsCont = document.createElement("div");
    productDetailsCont.id = "cart__productDetailsCont";

    let tiltle = document.createElement("h1");
    tiltle.innerText = ele.title;

    let description = document.createElement("p");
    description.innerText = ele.description;

    let rating = document.createElement("p");
    rating.classList = "p1";
    rating.innerText = "Rating " + ele.rating;

    let price = document.createElement("h1");
    price.innerText = "INR " + ele.price;

    let size = document.createElement("p");
    size.id = "cart__productSize";
    size.innerText = "Size: " + ele.size;

    let remove = document.createElement("button");
    remove.classList = "span";
    remove.innerText = "REMOVE";

    remove.addEventListener("click", (e) => {
      let filteredCart = cart.filter((element, i) => {
        return ele.id != element.id;
      });

      localStorage.setItem(currentUser, JSON.stringify(filteredCart));
      cart = JSON.parse(localStorage.getItem(currentUser));
      cartLength.innerText = cart.length;
      itemscount.innerText = cart.length;
      displayandShow(filteredCart);
    });
    productDetailsCont.append(tiltle, description, rating, price, size, remove);
    cardMainCont.append(imageCont, productDetailsCont);
    cartpagedatamain.append(cardMainCont);
  });

  let totalpricesum = 0;
  for (let i = 0; i < cart.length; i++) {
    totalpricesum += cart[i].price * cart[i].qty;
  }
  totalprice.textContent = "₹ " + totalpricesum;
  cartTotal = totalpricesum;
}

// checkout.addEventListener("click", () => {
//   if (currentUser) {
//     let userData;
//     fetch(`${baseURL}/users/${currentUserId}`)
//       .then((req) => req.json())
//       .then((res) => {
//         userData = res;
//         // console.log(userData, "userData");
//         updateUserData(userData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     let date = moment().format("MMMM Do YYYY, h:mm:ss a");
//     let orderDetails = {
//       date: date,
//       orderTotal: cartTotal,
//       prducts: [...cart],
//     };

//     function updateUserData(data) {
//       data.history.push(orderDetails);
//       console.log(data, "data");

//       fetch(`${baseURL}/users/${currentUserId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//         .then((req) => req.json())
//         .then((res) => {
//           cart = [];
//           localStorage.setItem(currentUser, JSON.stringify(cart));
//           console.log(res);
//           displayandShow(cart);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }

//   } else {
//     alert("Please login first");
//   }
// });
