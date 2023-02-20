let adminAccess = document.getElementById("adminAccess");
let adminFormCont = document.getElementById("adminFormCont");
let adminLoginForm = document.getElementById("adminLoginForm");
let adminFormClose = document.getElementById("adminFormClose");
let adminFormUsername = document.getElementById("adminFormUsername");
let adminFormPassword = document.getElementById("adminFormPassword");

let baseURL = "http://localhost:3000";

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
