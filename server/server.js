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

app.get("/getTodos", function (req, res) {
  res.send(DB.todo);
});

app.get("/addTodo", function (req, res) {
  const todo = req.query.todo;

  // push는 z다

  //   DB.todo.push('안녕하세요...');
  //   DB.todo.push('안녕하세요...1111');

  // DB.todo : ['안녕하세요...','안녕하세요...1111']
  //   console.log(DB.todo)
  DB.todo.push(todo);

  // todo
  res.send({
    code: "success",
    msg: "성공적으로 저장되었습니다 !!!",
  });
});
