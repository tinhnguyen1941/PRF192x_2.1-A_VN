"use strict";
// Hàm lưu dữ liêu:
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// Hàm lấy dữ liệu:
function getFromStorage(key) {
  return localStorage.getItem(key);
}
// Chuyển đổi về dang class Istance:
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}
//
// const userArr = user.map((u) => parseUser(u));
// console.log(userArr);
