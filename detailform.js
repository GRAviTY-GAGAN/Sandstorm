let deliveryLsdata = JSON.parse(localStorage.getItem("deliveryAddress")) || []
let cartAddedProd = JSON.parse(localStorage.getItem("cart")) || []
// let methodToggle = JSON.parse(localStorage.getItem("method-toggle")) || ""
let carttotal = JSON.parse(localStorage.getItem("totalcart")) || ""
let texas = JSON.parse(localStorage.getItem("texes")) || ""
let totalitem = JSON.parse(localStorage.getItem("totalitem")) || ""
 

totalSection(carttotal, texas, totalitem)
showCartItem(cartAddedProd)

methoddel(deliveryLsdata)
ADDRESSDEATIL(deliveryLsdata)


let orderplaceBtn = document.getElementById("placeorderBtn")
orderplaceBtn.addEventListener("click", () => {

    alert("congratulation! User  Your Order is Placed Succefully,Visit Again")
    localStorage.setItem("purchsed", JSON.stringify(cartAddedProd))
    localStorage.removeItem("cart")
    localStorage.removeItem("deliveryAddress")
    window.location.href="./index.html"
})

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

        let methodName = document.createElement("h3")
        methodName.textContent = "DELIVERY ADDRESS:"
        let delName = document.createElement("p")
        delName.textContent = ele.fname.toUpperCase() + " " + ele.lname.toUpperCase()
        let add = document.createElement("p")
        add.textContent = ele.address.toUpperCase()
        let city = document.createElement("p")
        city.textContent = ele.city.toUpperCase()
        let state = document.createElement("p")
        state.textContent = ele.state.toUpperCase()

        let country = document.createElement("p")
        country.textContent = ele.location

        delADDRESS.append(methodName, delName, add, city, state, country)
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
        desc.textContent = ele.description.substring(50, 0)

        let title = document.createElement("h3")
        title.textContent = ele.title

        let price = document.createElement("h3")
        price.textContent = ` Rs.${ele.price}`

        let cate = document.createElement("p")
        cate.textContent = ele.category

        let size = document.createElement("p")
        size.textContent = `Size :${ele.size}`

        let ratting = document.createElement("h4")
        ratting.textContent = ` Rating ${ele.rating}`

        divCont.append(title, desc, ratting, price, size)
        divcard.append(image, divCont)
        // console.log(divcard)
        itemShow.append(divcard)
    });

}

// cart total section 
function totalSection(carttotal, texas, totalitem) {
    var cardToTal_Section = document.getElementById("cardToTalSection")

    cardToTal_Section.innerHTML = null

    let div1 = document.createElement("div")
    div1.classList = "totalvalue"
    let p1 = document.createElement("p")
    p1.textContent = "ITEM"
    p2 = document.createElement("p")
    p2.textContent =totalitem;

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
    p6.textContent = `RS. ${texas}`

    let div4 = document.createElement("div")
    div4.classList = "totalvalue"
    let p7 = document.createElement("p")
    p7.textContent = "TOTAL VALUE"
    p8 = document.createElement("p")
    p8.textContent =` RS.${ carttotal}`

    div1.append(p1, p2)
    div2.append(p3, p4)
    div3.append(p5, p6)
    div4.append(p7, p8)
    cardToTal_Section.append(div1, div2, div3, div4)
}

