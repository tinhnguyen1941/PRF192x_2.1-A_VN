"use strict";
const inputPagesize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);
let currentUser = JSON.parse(getFromStorage("currentUser"));
console.log(currentUser.category);

// Tạo hàm valuedate cho dữ liệu input:
if (currentUser) {
  function valuedate() {
    let isValuedate = true;
    if (Number.isNaN(Number.parseInt(inputPagesize.value))) {
      alert("News per page không hợp lệ!");
      isValuedate = false;
    }
    if (inputCategory.value == "") {
      alert("Vui lòng lựa chọn Category");
      isValuedate = false;
    }
    return isValuedate;
  }
  console.log(currentUser.pagesize);
  // Tạo sự kiện cho nút Save Setting:
  btnSubmit.addEventListener("click", function () {
    if (valuedate()) {
      // Gán lại giá trị pagesize:
      currentUser.pagesize = Number.parseInt(inputPagesize.value);
      // Gán lại giá trị của catelogy:
      currentUser.category = inputCategory.value;
      // Lưu currentUser mới vào localstorage
      saveToStorage("currentUser", JSON.stringify(currentUser));
      // Lưu userArr mới lại:
      // Tìm chỉ số của tài khoản đang đăng nhập bằng cách so sánh username của chúng:
      const index = userArr.findIndex(
        (item) => item.username === currentUser.username
      );
      // Thay giá trị mới cho userArr:
      userArr[index] = currentUser;
      // Lưu laij vao localstorage:
      saveToStorage(KEY, JSON.stringify(userArr));
      alert("Bạn đã cài đặt thành công!");
      // Reset lại form:
      inputCategory.value = "";
      inputPagesize.value = "General";
    }
  });
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../index.html";
}
