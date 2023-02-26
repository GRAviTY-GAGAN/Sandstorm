let deliveryAddData = JSON.parse(localStorage.getItem("deliveryAddress")) || {}
//console.log(deliveryAddData)
let delMethod = ""
let cartAddedProd = JSON.parse(localStorage.getItem("cart")) || []
let methodToggle = JSON.parse(localStorage.getItem("method-toggle")) || ""


showCartItem(cartAddedProd)//
//totalSection(cartAddedProd,methodToggle)
// totalSection(cartAddedProd, methodToggle)

// getting the delivery input
let promocode = document.getElementById("promocode")
// getting contionue button
let btnCheckout = document.getElementById("checkoutbtn")

// addevent listner section
btnCheckout.addEventListener("click", (e) => {
    e.preventDefault()
    sendData()
    alert("Your Detail is Saved Succesfully")
    window.location.href = "./detailform.html"
})
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
        method: delMethod
    }
    window.localStorage.setItem("deliveryAddress", JSON.stringify([deliveryAddressObj]))
}
//***************************** */


function totalSection(cartAddedProd, data) {

    var cardToTal_Section = document.getElementById("cardToTalSection")
    cardToTal_Section.innerHTML = null
    
    data.forEach((ele) => {
        let div1 = document.createElement("div")
        div1.classList = "totalvalue"
        let p1 = document.createElement("p")
        p1.textContent = "ITEM"
        p2 = document.createElement("p")
        p2.textContent = sumItem(cartAddedProd)

        let div2 = document.createElement("div")
        div2.classList = "totalvalue"
        let p3 = document.createElement("p")
        p3.textContent = "SHIPPING "
        p4 = document.createElement("p")
        p4.textContent = `Rs. 599`

        let div3 = document.createElement("div")
        div3.classList = "totalvalue"
        let p5 = document.createElement("p")
        p5.textContent = "DUTIES AND TAXES"
        p6 = document.createElement("p")
        p6.textContent = ele

        let div4 = document.createElement("div")
        div4.classList = "totalvalue"
        let p7 = document.createElement("p")
        p7.textContent = "TOTAL VALUE"
        p8 = document.createElement("p")
        p8.textContent = calculatetotal(cartAddedProd, data)

        div1.append(p1, p2)
        div2.append(p3, p4)
        div3.append(p5, p6)
        div4.append(p7, p8)

        cardToTal_Section.append(div1, div2, div3, div4)
    })
}


// ***********************************
// toggle the method value

    document.querySelectorAll('input[name="drone"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {

            delMethod = event.target.value;
            console.log(delMethod)
        
            window.localStorage.setItem("method-toggle", JSON.stringify([delMethod]))
            window.localStorage.setItem("texes", JSON.stringify(delMethod))

            totalSection(cartAddedProd, methodToggle)
        });
    });

// appending the cartdadded product
function showCartItem(data) {
    let itemShow = document.querySelector("#item")
    itemShow.innerHTML = null;

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
        let size = document.createElement("p")
        size.textContent = `Size :${ele.size}`

        divCont.append(title, desc, gender, price, ratting,size)
        divcard.append(image, divCont)
        // console.log(divcard)

        itemShow.append(divcard)
    });

}



function calculatetotal(data,texas) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        sum += data[i].price * data[i].qty
    }
    let total = sum + 599 + (+texas)
    localStorage.setItem("totalcart", JSON.stringify(total))
    return total

}
function sumItem(data) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        sum += data[i].qty
    }
    total=sum
    localStorage.setItem("totalitem",JSON.stringify(total))
    return total
}
