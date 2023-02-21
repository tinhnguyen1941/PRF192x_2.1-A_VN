"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
console.log(getFromStorage("currentUser"));
let currentUser = JSON.parse(getFromStorage("currentUser"));

// Tạo hàm nếu ngườI dùng đăng nhập thì hiển thị thẻ main-content, ngược lại hiển thị thẻ login-modal:
function displayHome() {
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${currentUser.firtname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
displayHome();
// Tạo sự kiện cho nút Logout:
btnLogout.addEventListener("click", function () {
  //Xóa User hiện tại ở LocalStorage:
  localStorage.removeItem("currentUser");
  console.log(getFromStorage("currentUser"));
  // saveToStorage("currentUser", JSON.stringify(currentUser));
  //Đưa người dùng trở lại trang Login:
  loginModal.style.display = "block";
  mainContent.style.display = "none";
});
