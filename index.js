let adminAccess = document.getElementById("adminAccess");
let adminFormCont = document.getElementById("adminFormCont");
let adminLoginForm = document.getElementById("adminLoginForm");
let adminFormClose = document.getElementById("adminFormClose");
let adminFormUsername = document.getElementById("adminFormUsername");
let adminFormPassword = document.getElementById("adminFormPassword");

let baseURL = "http://localhost:3000";

// navBar Category start---------------------------------------------------------------
let home__categoryName = document.querySelectorAll("#home__categoryName");
let home__subCategoryCont = document.querySelectorAll("#home__subCategoryCont");
let home__subCategoryMainCont = document.getElementById(
  "home__subCategoryMainCont"
);
let home__nav = document.getElementById("home__nav");

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
let home__searchBar = document.getElementById("home__searchBar");
let home__carousalPrevBtn = document.getElementById("home__carousalPrevBtn");

home__searchBar.addEventListener("click", () => {
  window.location.href = "Singlepage.html";
});
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
