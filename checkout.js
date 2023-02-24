let deliveryAddData = JSON.parse(localStorage.getItem("deliveryAddress")) || {}
console.log(deliveryAddData)

let cartAddedProd = JSON.parse(localStorage.getItem("cart")) || []

showCartItem(cartAddedProd)
cartTotal(cartAddedProd)
//console.log(cartAddedProd)

// getting the delivery input
let inpemail = document.getElementById("email")
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
let address = document.getElementById("address")
let address2 = document.getElementById("address2")
let postal = document.getElementById("Postalcode")
let city = document.getElementById("city")
let state = document.getElementById("state")
let phone = document.getElementById("phone")
let loc = document.getElementById("location")

let promocode = document.getElementById("promocode")

// getting contionue button
let delMethod = ""
let btnCheckout = document.getElementById("checkoutbtn")

// addevent listner section
btnCheckout.addEventListener("click", (e) => {
    e.preventDefault()
    sendData()
})

function sendData() {
    getRadio()

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
        method: delMethod
    }

    window.localStorage.setItem("deliveryAddress", JSON.stringify([deliveryAddressObj]))
}

function getRadio() {
    let ele = document.getElementsByName("drone")
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            delMethod = ele[i].value
        }
    }
}

// appending the cartdadded product
//console.log(itemShowSection)


function showCartItem(data) {

    let itemShow = document.querySelector("#item")
    itemShow.innerHTML = null

    data.forEach((ele) => {

        let divcard = document.createElement("div")

        let divCont = document.createElement("div")

        let image = document.createElement("img")
        image.src = ele.image

        let desc = document.createElement("p")
        desc.textContent = ele.description.substring(20, 0)

        let title = document.createElement("h4")
        title.textContent = ele.title

        let price = document.createElement("h4")
        price.textContent = ` Rs.${ele.price}`

        let cate = document.createElement("p")
        cate.textContent = ele.category

        let gender = document.createElement("p")
        gender.textContent = ele.gender

        let ratting = document.createElement("h4")
        ratting.textContent = ` Rating ${ele.rating}`

        divCont.append(title, desc, gender, price, ratting)
        divcard.append(image, divCont)
        // console.log(divcard)

        itemShow.append(divcard)
    });

}

// cart total section 
function cartTotal(data) {
    console.log(data.length)
    if (data.length == 0) {
        let itemcount = document.getElementById("itemCount").textContent = 0
        document.getElementById("shippingcharge").textContent = 0
        document.getElementById("dutties").textContent = 0
        document.getElementById("totalcartvalue").textContent = 0
    }

    else if (data.length > 0) {
        let itemcount = document.getElementById("itemCount")
        itemcount.innerText = sumItem(data)
        document.getElementById("shippingcharge").textContent = `Rs. 599`
        document.getElementById("dutties").textContent = `Rs. 1589`
        document.getElementById("totalcartvalue").textContent = calculatetotal(data)
    }

}
function calculatetotal(data) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        sum += data[i].price * data[i].qty
    }
    return sum + 599 + 1589
}
function sumItem(data) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        sum += data[i].qty
    }
    return sum
}
