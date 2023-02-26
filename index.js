let adminAccess = document.getElementById("adminAccess");
let adminFormCont = document.getElementById("adminFormCont");
let adminLoginForm = document.getElementById("adminLoginForm");
let adminFormClose = document.getElementById("adminFormClose");
let adminFormUsername = document.getElementById("adminFormUsername");
let adminFormPassword = document.getElementById("adminFormPassword");
let home__nav = document.getElementById("home__nav");

let baseURL = "http://localhost:3000";
let currentUser = localStorage.getItem("currentUser") || null;
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];

// navbar start-------------------------------------------------------------------
let home__searchBar = document.getElementById("home__searchBar");
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__cartLength = document.getElementById("home__cartLength");
let home__purchase = document.getElementById("home__purchase");
let home__login = document.getElementById("home__login");
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

if (currentUser) {
  home__login.innerText = `Hi, ${currentUser}`;
} else {
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

window.addEventListener("load", () => {
  home__cartLength.innerText = cart.length;
});

// navbar End------------------------------------------------------------------------

// navBar Category start---------------------------------------------------------------
let home__categoryName = document.querySelectorAll("#home__categoryName");
let home__subCategoryCont = document.querySelectorAll("#home__subCategoryCont");
let home__subCategoryMainCont = document.getElementById(
  "home__subCategoryMainCont"
);

home__categoryName.forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    let target = e.target.dataset.name;
    // console.log(target);
    home__subCategoryCont.forEach((element) => {
      element.style.display = "none";
      let subCategoryTarget = element.dataset.name;
      if (subCategoryTarget == target) {
        element.style.display = "block";
        // console.log(subCategoryTarget, "sun");
        element.addEventListener("mouseleave", () => {
          element.style.display = "none";
        });
        home__nav.addEventListener("mouseenter", () => {
          element.style.display = "none";
        });
        // el.addEventListener("mouseleave", () => {
        //   element.style.display = "none";
        // });
      }
    });
  });
});

// navBar Category End---------------------------------------------------------------

// landing page carousal start-----------------------------------------------------------

let home__slides = document.querySelectorAll(".home__slides");
let home__carousalNextBtn = document.getElementById("home__carousalNextBtn");

let home__carousalPrevBtn = document.getElementById("home__carousalPrevBtn");

// console.log(home__slides.length);

let slidesCount = 0;

home__carousalPrevBtn.addEventListener("click", () => {
  slidesCount--;
  if (slidesCount < 0) {
    slidesCount = home__slides.length - 1;
  }
  slideCaurosal();
  debounceCarousal(slideCaurosal, 3000);
});

function nextSlide() {
  slidesCount++;
  if (slidesCount > home__slides.length - 1) {
    slidesCount = 0;
  }
}

home__carousalNextBtn.addEventListener("click", () => {
  nextSlide();
  slideCaurosal();
  debounceCarousal(slideCaurosal, 3000);
});

let idOfTimer = null;
let idOfInterval = null;
function debounceCarousal(func, delay) {
  if (idOfTimer || idOfInterval) {
    clearTimeout(idOfTimer);
    clearInterval(idOfInterval);
    autoSlide();
  }
  // console.log(idOfTimer);
  idOfTimer = setTimeout(() => {
    func();
  }, delay);
}

function autoSlide() {
  idOfInterval = setInterval(() => {
    nextSlide();
    slideCaurosal();
  }, 3000);
}
autoSlide();

home__slides.forEach((item, index) => {
  item.style.left = `${index * 100}%`;
});

function slideCaurosal() {
  home__slides.forEach((el) => {
    el.style.transform = `translateX(-${slidesCount * 100}%)`;
  });
}

// landing page carousal end-----------------------------------------------------------

// landing page carousal2 start--------------------------------

let home__slides2 = document.querySelectorAll(".home__slides2");
let home__carousalNextBtn2 = document.getElementById("home__carousalNextBtn2");
let home__carousalPrevBtn2 = document.getElementById("home__carousalPrevBtn2");

let slidesCount2 = 0;

home__carousalPrevBtn2.addEventListener("click", () => {
  slidesCount2--;
  if (slidesCount2 < 0) {
    slidesCount2 = home__slides2.length - 1;
  }
  slideCaurosal2();
  debounceCarousal2(slideCaurosal2, 3000);
});

function nextSlide2() {
  slidesCount2++;
  if (slidesCount2 > home__slides2.length - 1) {
    slidesCount2 = 0;
  }
}

home__carousalNextBtn2.addEventListener("click", () => {
  nextSlide2();
  slideCaurosal2();
  debounceCarousal2(slideCaurosal2, 3000);
});

let idOfTimer2 = null;
let idOfInterval2 = null;
function debounceCarousal2(func, delay) {
  if (idOfTimer2 || idOfInterval2) {
    clearTimeout(idOfTimer2);
    clearInterval(idOfInterval2);
    autoSlide2();
  }
  // console.log(idOfTimer);
  idOfTimer2 = setTimeout(() => {
    func();
  }, delay);
}

function autoSlide2() {
  idOfInterval2 = setInterval(() => {
    nextSlide2();
    slideCaurosal2();
  }, 3000);
}
autoSlide2();

home__slides2.forEach((item, index) => {
  item.style.left = `${index * 100}%`;
});

function slideCaurosal2() {
  home__slides2.forEach((el) => {
    el.style.transform = `translateX(-${slidesCount2 * 100}%)`;
  });
}

//landing page carousal2 end----------------------------------

// landing page carousal3 start----------------------------------------------

let home__slides3 = document.querySelectorAll(".home__slides3");
let home__carousalNextBtn3 = document.getElementById("home__carousalNextBtn3");
let home__carousalPrevBtn3 = document.getElementById("home__carousalPrevBtn3");

let slidesCount3 = 0;

home__carousalPrevBtn3.addEventListener("click", () => {
  slidesCount3--;
  if (slidesCount3 < 0) {
    slidesCount3 = home__slides3.length - 1;
  }
  slideCaurosal3();
  debounceCarousal3(slideCaurosal3, 3000);
});

function nextSlide3() {
  slidesCount3++;
  if (slidesCount3 > home__slides3.length - 1) {
    slidesCount3 = 0;
  }
}

home__carousalNextBtn3.addEventListener("click", () => {
  nextSlide3();
  slideCaurosal3();
  debounceCarousal3(slideCaurosal3, 3000);
});

let idOfTimer3 = null;
let idOfInterval3 = null;
function debounceCarousal3(func, delay) {
  if (idOfTimer3 || idOfInterval3) {
    clearTimeout(idOfTimer3);
    clearInterval(idOfInterval3);
    autoSlide3();
  }
  // console.log(idOfTimer);
  idOfTimer3 = setTimeout(() => {
    func();
  }, delay);
}

function autoSlide3() {
  idOfInterval3 = setInterval(() => {
    nextSlide3();
    slideCaurosal3();
  }, 3000);
}
autoSlide3();

home__slides3.forEach((item, index) => {
  item.style.left = `${index * 100}%`;
});

function slideCaurosal3() {
  home__slides3.forEach((el) => {
    el.style.transform = `translateX(-${slidesCount3 * 100}%)`;
  });
}

// landing page carousal3 end----------------------------------------------

// landing page carousal4 start---------------------------------------------

let home__slides4 = document.querySelectorAll(".home__slides4");
let home__carousalNextBtn4 = document.getElementById("home__carousalNextBtn4");
let home__carousalPrevBtn4 = document.getElementById("home__carousalPrevBtn4");

let slidesCount4 = 0;

home__carousalPrevBtn4.addEventListener("click", () => {
  slidesCount4--;
  if (slidesCount4 < 0) {
    slidesCount4 = home__slides4.length - 1;
  }
  slideCaurosal4();
  debounceCarousal4(slideCaurosal4, 3000);
});

function nextSlide4() {
  slidesCount4++;
  if (slidesCount4 > home__slides4.length - 1) {
    slidesCount4 = 0;
  }
}

home__carousalNextBtn4.addEventListener("click", () => {
  nextSlide4();
  slideCaurosal4();
  debounceCarousal4(slideCaurosal4, 3000);
});

let idOfTimer4 = null;
let idOfInterval4 = null;
function debounceCarousal4(func, delay) {
  if (idOfTimer4 || idOfInterval4) {
    clearTimeout(idOfTimer4);
    clearInterval(idOfInterval4);
    autoSlide4();
  }
  // console.log(idOfTimer);
  idOfTimer4 = setTimeout(() => {
    func();
  }, delay);
}

function autoSlide4() {
  idOfInterval4 = setInterval(() => {
    nextSlide4();
    slideCaurosal4();
  }, 4000);
}
autoSlide4();

home__slides4.forEach((item, index) => {
  item.style.left = `${index * 100}%`;
});

function slideCaurosal4() {
  home__slides4.forEach((el) => {
    el.style.transform = `translateX(-${slidesCount4 * 100}%)`;
  });
}

// landing page carousal4 end---------------------------------------------

// adminForm Start -----------------------------------------------------------

adminAccess.addEventListener("click", () => {
  adminFormCont.style.display = "block";
});

adminFormClose.addEventListener("click", () => {
  adminFormCont.style.display = "none";
});

adminLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let adminDetails = {
    id: adminFormUsername.value,
    password: adminFormPassword.value,
  };

  verifyAdminLoginDetails(adminDetails);
});

async function verifyAdminLoginDetails(data) {
  try {
    let request = await fetch(`${baseURL}/admin/${data.id}`);
    let response = await request.json();
    // console.log(response);
    // console.log(data.id, data.password);
    if (data.password == response.password && data.id == response.id) {
      alert("Login Successful");
      window.location.href = "admin.html";
    } else {
      alert("Something Went Wrong Try Again!");
    }
  } catch (error) {
    console.log(error);
  }
}

// adminForm End-----------------------------------------------------------
