"use strict";
class User {
  constructor(
    firtname,
    lastname,
    username,
    password,
    pagesize = 10,
    category = "sports"
  ) {
    this.firtname = firtname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.pagesize = pagesize;
    this.category = category;
  }
}
// Tạo class Task:
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
