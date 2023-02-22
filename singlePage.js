// let addtobag = document.getElementById('addtobag');

localStorage.setItem('productDetails', JSON.stringify([{
    "id": 1676919854916,
    "image": "https://n.nordstrommedia.com/id/sr3/d0ea61e8-d726-4a07-9cb9-b52949a2ecaf.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
    "title": "Madrid Big Buckle Slide Sandal",
    "description": "An oversized buckle cinches the angled bridge strap of a sandal built on the legendary Birkenstock footbed for time-tested comfort and on-trend style.",
    "price": 12486,
    "gender": "Women",
    "category": "Footware",
    "rating": 5
  }]));

//   let productDetails = JSON.parse(localStorage.getItem('productDetails'))||[];
//   console.log(productDetails);

//   let cartData = JSON.parse(localStorage.getItem('cartData')) || []

//   addtobag.addEventListener('click', ()=> {
//     cartData.push(productDetails);
//     localStorage.setItem('cartData', JSON.stringify(cartData))
//   })


let api="https://nordstorm-db-json.onrender.com/products"

let arr=JSON.parse(localStorage.getItem('productDetails'))||[];
let main=document.getElementById("mainsec")

let cart=JSON.parse(localStorage.getItem("cart"))||[]

let left=document.getElementById("left")
let right=document.getElementById("right")
// fetch(api)
// .then((req)=>req.json())
// .then((data)=>{
    
// })

check(arr)

function check(data){
    console.log(data);
   main.innerHTML=""
data.forEach(element => {
    // if(element.id==arr.id || 1){

        let singlePageProductDetailsMainDiv = document.createElement('div');
   

    let img=document.createElement("img")
    img.src=element.image
    let p=document.createElement("h1")
    p.innerText=element.title

    left.append(img)

    let description=document.createElement("p")
    description.innerText=element.description

    let rating=document.createElement("p")
    rating.innerText= "Rating " + element.rating


    let price = document.createElement("h1")
    price.innerText= "INR " +  element.price

    let add = document.createElement("button")
    add.innerText= "Add To Bag"

    add.addEventListener("click",(e)=>{
        e.preventDefault()
        Cart1(element)
        console.log(23)
    })

    let select=document.createElement("select")
let option1=document.createElement("option")
option1.innerText="CHHOSE SIZE"

let option2=document.createElement("option")
option2.innerText="S"

let option3=document.createElement("option")
option3.innerText="M"

let option4=document.createElement("option")
option4.innerText="L"

select.append(option1,option2,option3,option4)
  




    right.append(p, price,description, rating ,select,add )
   
    singlePageProductDetailsMainDiv.append(left,right)
main.append(singlePageProductDetailsMainDiv)
    });
}


function Cart1(para)
{
    for(let i of cart)
    {
        if(i.id==para.id)
        {
            alert("product alredy in cart")
            return false
        }
    }
    cart.push(para)
    alert("Product added to cart")
    localStorage.setItem("cart",JSON.stringify(cart))
}