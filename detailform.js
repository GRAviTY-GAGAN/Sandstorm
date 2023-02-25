let deliveryLsdata = JSON.parse(localStorage.getItem("deliveryAddress")) || {}
let cartAddedProd = JSON.parse(localStorage.getItem("cart")) || []

showCartItem(cartAddedProd)
cartTotal(cartAddedProd)
methoddel(deliveryLsdata)
ADDRESSDEATIL(deliveryLsdata)



function methoddel(data) {
    let delMehtod = document.getElementById("del-Method")
    delMehtod.innerHTML = null;
    data.forEach((ele) => {
        if (ele.method
            == "3097") {
            let methodName = document.createElement("h4")
            methodName.textContent = "DELIVERY METHOD:"

            let delType = document.createElement("p")
            delType.textContent = "STANDARD"

            let imp = document.createElement("p")
            imp.textContent = "NO ADDITIONAL IMPORT CHARGES AT DELIVERY"

            let day = document.createElement("p")
            day.textContent = "11–21 BUSINESS DAYS"

            delMehtod.append(methodName, delType, imp, day)
        }
        else if (ele.method == "6085") {
            let methodName = document.createElement("h4")
            methodName.textContent = "DELIVERY METHOD:"
            let delType = document.createElement("p")
            delType.textContent = "EXPRESS"
            let imp = document.createElement("p")
            imp.textContent = " IMPORT CHARGES RAE COLLECTED AT DELIVERY"
            let day = document.createElement("p")
            day.textContent = "06-21 BUSINESS DAYS"
            delMehtod.append(methodName, delType, imp, day)
        }
        else if (ele.method == "5085") {
            let methodName = document.createElement("h4")
            methodName.textContent = "DELIVERY METHOD:"
            let delType = document.createElement("p")
            delType.textContent = "STANDARD"
            let imp = document.createElement("p")
            imp.textContent = " NO ADDITIONAL IMPORT CHARGES AT DELIVERY"
            let day = document.createElement("p")
            day.textContent = "06-21 BUSINESS DAYS"
            delMehtod.append(methodName, delType, imp, day)
        }
    })

}

function ADDRESSDEATIL(data) {
    let delADDRESS = document.getElementById("del-address")
    delADDRESS.innerHTML = null;
    data.forEach((ele) => {

        let methodName = document.createElement("h4")
        methodName.textContent = "DELIVERY ADDRESS:"
        let delName = document.createElement("p")
        delName.textContent = ele.fname+" "+ele.lname
        let add = document.createElement("p")
        add.textContent = ele.address
        let city = document.createElement("p")
        city.textContent = ele.city
        let country = document.createElement("p")
        country.textContent = ele.country

        delADDRESS.append(methodName, delName, add,city,country)
    })

}
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