"use strict";

if (JSON.parse(getFromStorage("currentUser"))) {
  const inputTask = document.getElementById("input-task");
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");
  const KEY = "TODO_ARRAY";
  const todoArr = JSON.parse(getFromStorage(KEY)) || [];
  console.log(todoArr);
  displayTask(todoArr);

  // Tạo sự kiện cho nút Add:
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim() === "") {
      alert("Vui lòng điền nội dung");
    } else {
      let task = new Task(
        inputTask.value,
        JSON.parse(getFromStorage("currentUser")).username,
        false
      );
      // console.log(task);
      // Thêm task vào mảng todoArr:
      todoArr.push(task);
      // console.log(todoArr);
      // Lưu xuống localstorage:
      saveToStorage(KEY, JSON.stringify(todoArr));
      // Hiển thị nội dung Task
      displayTask(todoArr);
      // Trả về giá trị trống:
      inputTask.value = "";
    }
  });

  // Tạo hàm hiển thị các task:
  function displayTask(taskArr) {
    let taskCurrentUser = [];
    // Lọc danh sách những task theo tài khoản đang đăng nhập:
    taskCurrentUser = taskArr.filter(
      (taskCurrentUser) =>
        taskCurrentUser.owner ===
        JSON.parse(getFromStorage("currentUser")).username
    );
    let html = "";
    taskCurrentUser.forEach(function (todo) {
      html += `<li class=${todo.isDone ? "checked" : ""} >${
        todo.task
      }<span class="close">×</span></li>`;
    });
    todoList.innerHTML = html;
    eventToggleTasks();
    eventDeleteTasks();
  }
  // Tạo toggle task:
  function eventToggleTasks() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // Phần tử đích cần loại bỏ phần tử con của li (trường hợp này chỉ có 1 con nên chỉ số là 0)
        if (e.target !== liEl.children[0]) {
          // Tạo sự kiện tonggle cho từng li
          liEl.classList.toggle("checked");
          // Tìm lọc những task nào thoả mãn điều kiện:
          const todo = todoArr.find(
            (todo) =>
              // điều kiện 1: tên sở hữu của todoArr phải trùng với tên của người đang đăng nhập:
              todo.owner ===
                JSON.parse(getFromStorage("currentUser")).username &&
              // điều kiện 2: tìm ra những task thuộc todoArr phải trùng với nội dung của từng li sau khi xoá dấU X:
              todo.task === liEl.textContent.slice(0, -1)
          );
          // Sau khi có todo đã lọc xong cần kiểm tra nếu isDone của todo đó so sánh với li đó, nếu có class checked rồi thì biến isDone thành true, và ngược lại
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          //Cập nhât lưu lại todoArr bằng mảng todo mới được lọc xong:
          saveToStorage(KEY, JSON.stringify(todoArr));
        }
      });
    });
  }
  // Tạo sự kiện xoá task:
  function eventDeleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        const isDeleta = confirm("Bạn có chắc muốn xoá không?");
        if (isDeleta) {
          const index = todoArr.findIndex(
            (ind) =>
              // Chọn ra vị trí nào có tên tên nhặp và tên người đang dùng trong todoArr
              ind.owner ===
                JSON.parse(getFromStorage("currentUser")).username &&
              // Chọn ra task nào ở todoAr trùng với phần tử cha của nút X sau khi đã xoá nút X:
              ind.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          // Xoá task đã chọn ra khỏi todoArr:
          todoArr.splice(index, 1);
          // Lưu vào lại localstorage:
          saveToStorage(KEY, JSON.stringify(todoArr));
          // Hiển thị lại todolist:
          displayTask(todoArr);
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập để có thể sử dụng ứng dụng!");
  window.location.href = "../index.html";
}
