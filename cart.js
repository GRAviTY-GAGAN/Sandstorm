// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

home__searchBar.addEventListener("click", () => {
  window.location.href = "Singlepage.html";
});

home__cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

// navbar End------------------------------------------------------------------------

//start to append products..............................................
cartpagedatamain=document.getElementById("cartpagedatamain")
imageofcart=document.getElementById("imageofcart")
detailofcartpoducts=document.getElementById("detailofcartpoducts")
let cartLength=document.getElementById("home__cartLength")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let itemscount=document.getElementById("totalitemcount")

cartLength.innerText=cart.length;
itemscount.innerText =cart.length;

displayandShow(cart)

function displayandShow(cart){
itemscount.innerText =cart.length;
cartLength.innerText=cart.length;
    cartpagedatamain.innerHTML = ''
  let totalprice=document.getElementById("total-price")
    cart.forEach(ele => {

      let cardMainCont = document.createElement('div');
      cardMainCont.classList = 'cart__singleProductCard'; //give display flex

      let imageCont = document.createElement('div');
        
        let img=document.createElement("img")
        img.src=ele.image

        let qtyBtnsCont = document.createElement('div'); 
        qtyBtnsCont.id = 'cart__qtyBtnsCont'

        let increasequantity=document.createElement("button")
        increasequantity.classList = 'button'
        increasequantity.innerText="+"

        let quantity=document.createElement("span1")
        quantity.innerText="Qty: "+ele.quantity;

        let decreasequantity=document.createElement("button")
        decreasequantity.classList = 'button'
        decreasequantity.innerText="-"

        increasequantity.addEventListener("click", () => {
          itemscount.innerText=ele.quantity++
          localStorage.setItem("cart",JSON.stringify(cart))
        console.log(ele);
          cart = JSON.parse(localStorage.getItem("cart"));
          displayandShow(cart);
        
          // window.location.reload()
        });
        decreasequantity.addEventListener("click", (e) => {
          e.preventDefault()
          if(ele.quantity>1){
            itemscount.innerText=ele.quantity--
            
          localStorage.setItem("cart",JSON.stringify(cart))
          cart = JSON.parse(localStorage.getItem("cart"));
          displayandShow(cart);
          // window.location.reload()
          }
        });

        qtyBtnsCont.append(increasequantity,quantity,decreasequantity)

        imageCont.append(img,qtyBtnsCont);
        
        let productDetailsCont = document.createElement('div');
        productDetailsCont.id = 'cart__productDetailsCont'

        let tiltle = document.createElement("h1");
        tiltle.innerText = ele.title;

        let description = document.createElement("p");
    description.innerText = ele.description;

    let rating = document.createElement("p");
    rating.classList = 'p1';
    rating.innerText = "Rating " + ele.rating;

    let price = document.createElement("h1");
    price.innerText = "INR " + ele.price;

    let remove = document.createElement("button");
    remove.classList = 'span'
    remove.innerText ="REMOVE";

    remove.addEventListener("click",(e)=>{
        let filteredCart=cart.filter((element,i)=>{
                return ele.id != element.id;                  
            })
    
            localStorage.setItem("cart",JSON.stringify(filteredCart))
            cart = JSON.parse(localStorage.getItem("cart"));
            cartLength.innerText=cart.length
            itemscount.innerText=cart.length
        displayandShow(filteredCart)
    })
    productDetailsCont.append(tiltle,description,rating,price,remove)
    cardMainCont.append(imageCont,productDetailsCont);
        cartpagedatamain.append(cardMainCont)
        

    // imageofcart.append(img,increasequantity,quantity,decreasequantity)
    //     detailofcartpoducts.append(tiltle,description,rating,price,remove)
    //     cartpagedatamain.append(imageofcart,detailofcartpoducts)
    });


    let totalpricesum=0
    for(let i=0;i<cart.length;i++){
      totalpricesum+=cart[i].price*cart[i].quantity
    }
 totalprice.textContent="₹"+totalpricesum

}