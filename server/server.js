const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const DB = {
  todo: [],
};

app.listen(3000, function () {
  console.log("NodaddTodo!!e.js Start..");
});

app.get("/", function (req, res) {
  res.send("Hello Node.js @@@@@@@");
});

app.get("/deleteTodo", function (req, res) {
  DB.todo = [];

  res.send({
    code: "success",
    msg: "성공적으로 삭제되었습니다",
  });
});

app.get("/delete", function (req, res) {
  const index = req.query.index;

  console.log("삭제 전 ===> ", DB.todo);

  DB.todo.splice(index, 1);

  console.log("삭제 후 ===> ", DB.todo);

  res.send({});
});

app.get("/getTodos", function (req, res) {
  res.send(DB.todo);
});

app.get("/addTodo", function (req, res) {
  const todo = req.query.todo;

  //   DB.todo.push('안녕하세요...');
  //   DB.todo.push('안녕하세요...1111');

  // prepend
  // DB.todo : ['','','안녕하세요...','안녕하세요...1111']
  //   console.log(DB.todo)
  DB.todo.unshift(todo);

  // prepend  push

  // todo
  res.send({
    code: "success",
    msg: "성공적으로 저장되었습니다 !!!",
  });
});
