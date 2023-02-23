// let addtobag = document.getElementById('addtobag');


localStorage.setItem('productDetails', JSON.stringify([{
  "id": 1677006870174,
  "image": "https://n.nordstrommedia.com/id/sr3/cc8dec3e-b657-4970-b818-bee1b5a58959.jpeg?h=365&w=240&dpr=2",
  "title": "Amira Tiered Cotton Midi Dress",
  "description": "Lightweight gauzy cotton is shaped into this pretty midi dress designed with a flowy tiered skirt that sways with every step you take.",
  "price": 3400,
  "gender": "Girl",
  "category": "Dress",
  "rating": 4
}]));




let api = "https://nordstorm-db-json.onrender.com/products";

let arr = JSON.parse(localStorage.getItem("productDetails")) || [];
let singlePageProductDetailsMainDiv = document.getElementById(
  "singlePageProductDetailsMainDiv"
);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let left = document.getElementById("left");
let right = document.getElementById("right");
// fetch(api)
// .then((req)=>req.json())
// .then((data)=>{

// })
let cartLength=document.getElementById("home__cartLength")
cartLength.innerText=cart.length
check(arr);

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

    right.append(p, price, description, rating, select, add);

    singlePageProductDetailsMainDiv.append(left, right);
  });
}

function Cart1(para) {
  for (let i of cart) {
    if (i.id == para.id) {
      alert("product allready in Bag");
      return false;
    }
  }
 
  cart.push({...para,quantity:1});
  cartLength=cart.length
  window.location.reload()
  console.log(cart.length)
  alert("Product added to Bag");
  localStorage.setItem("cart", JSON.stringify(cart));
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
