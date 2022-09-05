/**
 * 구현 Todo List
 *
 * ========== 입력한 Todo 기록하기 ==========
 * 1. form 으로 감싸서 submit을 이벤트로 받는다 [완료]
 * 2. event.???? (submit 새로고침을 막아준다) [완료]
 * 3. 입력한 값 가져오기 [완료]
 * 4. 위로 쌓아주기 (prepend)
 * 5. 쌓은다음 내가 todo로 입력한 input 빈값만들기
 *
 * ========== Clear 버튼 구현 ==========
 * 1. clear라는 버튼에 이벤트 onclick 넣은다음
 * 2. todo 없애주기
 *
 * ========== 단일 삭제 버튼 구현 ==========
 * 1. 삭제 버튼에 이벤트 넣기
 * 2. 삭제하면 되겠죠?
 *
 * ========== 단일 수정 버튼 구현 ==========
 * 1. 수정 버튼에 이벤트 넣기
 * 2. input으로 바꾸기전에 텍스트[엘리먼트.text()]
 * 기억하기 (왜냐면 ? input val(텍스트) )
 *
 * ========== 검색 기능 구현 ==========
 * 1. 검색 input에 Event onKeyup
 * 2. event , this  내가 입력하고 있는 값 가져오기 => [].val()
 * 3. todo 내용 가져온다음에 반복문돌리기 힌트 : $(선택자).each(function (index,element) {})
 * 4. span 태그 접근해서 text 확인하기 힌트 : javascript startsWith 문법
 * 5. 일치하지 않는 element hide처리 해주기
 */
$(document).ready(function () {
  getTodos();

  addEvents();
});

function getTodos() {
  $.ajax({
    url: "http://127.0.0.1:3000/getTodos",
    success: function (response) {
      /*****
       * ['안녕하세요', '안녕하세요1', '안녕하세요2']
       */
    },
  });
}

function deleteTodo(event) {
  const target = $(event.target);
  target.parent().remove();
}

function showUpdateInput(event) {
  const nowUpdate =
    $("#todo-update-form").find("input[type=text]").length === 0 ? false : true;

  if (nowUpdate === true) {
    $("#todo-update-form").find("input[type=text]").focus();
    return;
  }

  const target = $(event.target);
  const todo = target.siblings("span");
  const todoText = todo.text();

  const html = `<input type="text" value='${todoText}' />`;

  const nowTagName = target.siblings().first().prop("tagName");

  if (nowTagName === "INPUT") {
    return;
  }

  target.parent().prepend(html);
  todo.remove();
}

/**
 * 이벤트 넣는곳
 */
function addEvents() {
  /**
   *
   */
  $("#todo-update-form").on("submit", function (event) {
    event.preventDefault();
    const updateInput = $("#todo-update-form").find("input[type=text]");
    const updateTodo = updateInput.val();

    updateInput.parent().prepend(`<span>${updateTodo}</span>`);
    updateInput.remove();
  });
  $("#todo-form").on("submit", function (event) {
    event.preventDefault();

    const todo = $("form > input[type=text]").val();

    // 템플릿 리터럴
    /**
     * 인라인 이벤트
     */
    const html = `<li>
        <span>${todo}</span>
        <button type="button" onclick="deleteTodo(event);">삭제</button>
        <button type="button" onclick="showUpdateInput(event)">수정</button>
    </li>`;

    $("form > ul").prepend(html);
    $("form > input[type=text]").val("");

    /**
     *
     * CORS
     * 쿼리스트링 !!
     * localhost = 127.0.0.1
     */
    $.ajax({
      url: `http://127.0.0.1:3000/addTodo?todo=${todo}`,
      success: function (response) {
        console.log(response);
      },
    });
  });

  $("form > div > button").on("click", function () {
    /**
     * empty()
     */
    $("form > ul").empty();
  });

  $("#search-input").on("keyup", function (event) {
    const target = $(event.target);
    const searchText = target.val();
    const todos = $("#todo-update-form > ul > li");

    if (searchText === "") {
      todos.show();
      return;
    }

    /**
     * 선택자 70%
     */
    todos.each(function (index, element) {
      const todo = $(element).children("span").text();

      if (todo.startsWith(searchText) === false) {
        $(element).hide();
      }
    });
  });
}
