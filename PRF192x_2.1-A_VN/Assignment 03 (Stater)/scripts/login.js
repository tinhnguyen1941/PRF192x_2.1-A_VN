"use strict";
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);
// Valudate dữ liệu đầu vào:
function valuedate() {
  let isValue = true;
  if (inputUserName.value.trim() === "") {
    alert("Vui lòng nhập UserName");
    isValue = false;
  }
  if (inputPassWord.value === "") {
    alert("Vui lòng nhập PassWord");
    isValue = false;
  }
  return isValue;
}
console.log(valuedate());
// Tạo sự kiện cho nút Login:
btnSubmit.addEventListener("click", function () {
  // let user = new User(inputUserName.value, inputPassWord.value);
  const isValue = valuedate();
  console.log(isValue);
  if (isValue) {
    let currentUser = userArr.find(
      (item) =>
        (item.username === inputUserName.value) &
        (item.password === inputPassWord.value)
    );
    console.log(currentUser);
    if (currentUser) {
      // Lưu vào localStorage tài khoản người đăng nhập:
      saveToStorage("currentUser", JSON.stringify(currentUser));
      alert("Bạn đã đăng nhập thành công");
      // // Chuyển về trang chủ:
      window.location.href = "../index.html";
    } else {
      alert("Thông tin không chính xác, vui lòng đăng nhập lại");
    }
  }
});
