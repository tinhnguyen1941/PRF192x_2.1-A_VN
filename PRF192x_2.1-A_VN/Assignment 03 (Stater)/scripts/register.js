"use strict";
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const inputPassWordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);
// Tạo sự kiện cho button:
btnSubmit.addEventListener("click", function () {
  //Lấy dữ liệu nhập vào từ form:
  let user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassWord.value
  );
  console.log(user);
  const isValidate = validate(user);
  if (isValidate) {
    // Thêm user vào mảng, lưu mảng vào localStorage:
    userArr.push(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    alert("Bạn đã đăng ký thành công");
    // Chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});

// Gọi hàm validate để kiểm tra form hợp lệ:

function validate(user) {
  let isValidate = true;
  // Không có trường nào bị bỏ trống.
  if (user.firtname.trim() === "") {
    alert("Vui lòng nhập Fistname");
    isValidate = false;
  }
  if (user.lastname.trim() === "") {
    alert("Vui lòng nhập Lastname");
    isValidate = false;
  }
  if (user.username.trim() === "") {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }
  if (user.password === "") {
    alert("Vui lòng nhập Password");
    isValidate = false;
  }
  if (inputPassWordConfirm === "") {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }
  // Username không được trùng với Username của các người dùng trước đó.
  for (let i = 0; i < userArr.length; i++) {
    if (user.username === userArr[i].username) {
      alert("UserName đã bị trùng");
      isValue = false;
      break;
    }
  }
  // Password và Confirm Password phải giống nhau.
  if (user.password !== inputPassWordConfirm.value) {
    alert("Mật khẩu không khớp");
    isValidate = false;
  }
  // Password phải có nhiều hơn 8 ký tự.
  if (user.password.length <= 8) {
    alert("Mật khẩu phải dài hơn 8 ký tự!");
    isValidate = false;
  }
  return isValidate;
}
