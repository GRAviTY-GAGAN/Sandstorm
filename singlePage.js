// let addtobag = document.getElementById('addtobag');
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartLength = document.getElementById("home__cartLength");
cartLength.innerText = cart.length;

let arr = JSON.parse(localStorage.getItem("productDetails")) || [];

window.addEventListener("load", () => {
  arr = JSON.parse(localStorage.getItem("productDetails")) || [];
  cartLength.innerText = cart.length;
  check(arr);
});

// localStorage.setItem(
//   "productDetails",
//   JSON.stringify([
//     {
//       id: 1677007835470,
//       image:
//         "https://n.nordstrommedia.com/id/sr3/3651d2d0-3842-4883-98f4-652a05668c6d.jpeg?h=365&w=240&dpr=2",
//       title: "Kids' Blazer Mid '77 Sneaker",
//       description:
//         "Old-school basketball is alive and scoring in a '70s-reissue high-top sporting a kid-size fit and an autoclaved sole that keeps the vintage vibes hustling.",
//       price: 5797,
//       gender: "Boy",
//       category: "",
//       rating: 11,
//     },
//   ])
// );

let api = "https://nordstorm-db-json.onrender.com/products";

let checkSizeSelected = "";

let singlePageProductDetailsMainDiv = document.getElementById(
  "singlePageProductDetailsMainDiv"
);

let home__searchBar = document.getElementById("home__searchBar");
home__searchBar.addEventListener("click", () => {
  window.location.href = "products.html";
});

let left = document.getElementById("left");
let right = document.getElementById("right");
// fetch(api)
// .then((req)=>req.json())
// .then((data)=>{

// })

function check(data) {
  console.log(data);
  singlePageProductDetailsMainDiv.innerHTML = "";
  data.forEach((element) => {
    // if(element.id==arr.id || 1){

    let img = document.createElement("img");
    img.src = element.image;
    let p = document.createElement("h1");
    p.innerText = element.title;

    left.append(img);

    let description = document.createElement("p");
    description.innerText = element.description;

    let rating = document.createElement("p");
    rating.innerText = "Rating " + element.rating;

    let price = document.createElement("h1");
    price.innerText = "INR " + element.price;

    let add = document.createElement("button");
    add.innerText = "Add To Bag";

    add.addEventListener("click", (e) => {
      e.preventDefault();
      Cart1(element);
      console.log(23);
    });

    let select = document.createElement("select");
    let option1 = document.createElement("option");
    option1.innerText = "CHOOSE SIZE";

    let option2 = document.createElement("option");
    option2.innerText = "S";

    let option3 = document.createElement("option");
    option3.innerText = "M";

    let option4 = document.createElement("option");
    option4.innerText = "L";

    select.append(option1, option2, option3, option4);
    select.addEventListener("change", () => {
      checkSizeSelected = select.value;
    });

    right.append(p, price, description, rating, select, add);

    singlePageProductDetailsMainDiv.append(left, right);
  });
}

function Cart1(para) {
  // for (let i of cart) {
  //   if (i.id == para.id) {
  //     alert("product alredy in cart");
  //     return false;
  //   }
  // }
  let falg = false;

  falg = cart.some((item) => {
    if (item.id == para.id) {
      falg = true;
      return falg;
    }
    falg = false;
    return falg;
  });

  if (checkSizeSelected == "") {
    alert("Please Select The Size");
  } else if (falg == true) {
    alert("product already in cart");
  } else {
    para.size = checkSizeSelected;
    para.qty = 1;
    cart.push(para);
    alert("Product added to cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    cartLength.innerText = cart.length;
  }
}

// Navbar link to cart start----------------------------------------------------------
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

home__cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

// Navbar link to cart end----------------------------------------------------------
