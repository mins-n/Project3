var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var year = urlParams.get("year");
var semester = urlParams.get("semester");
var lec_name = urlParams.get("lec_name");
var lec_code = urlParams.get("lec_code");

const lec_txt = document.getElementById("lec_txt");

lec_txt.innerHTML =
  year + "년 " + semester + "학기 " + lec_name + " 공지게시판";

user_lec_boards(year, semester, lec_code);

function user_lec_boards(year, semester, lecture_code) {
  console.log(year, semester, lecture_code);
  axios
    .get("/boards/boardList/professor", {
      params: {
        year: year,
        semester: semester,
        board_name: "공지게시판",
        lecture_code: lecture_code,
      },
    })
    .then(function (response) {
      data = response.data.list;
      console.log(data);
      board_list = [];
      post_codes = [];
      i = 1;
      data.forEach(function (item) {
        var boardData = [
          i,
          item.title,
          item.name,
          item.post_date.substr(0, 10),
          item.view_count,
        ];
        post_codes.push(item.post_code);
        board_list.push(boardData);
        i++;
      });
      if (board_list.length == 0) {
        alert("해당 과목의 공지가 없습니다.");
        basic_table();
      } else {
        lec_table(board_list, post_codes);
      }
    })
    .catch(function (error) {});
}

function lec_table(data, post_codes) {
  var itemsPerPage = 10; // 한 페이지에 표시할 항목 수
  var currentPage = 1; // 현재 페이지
  var totalPages = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수

  function renderTable() {
    // 계산된 시작 인덱스와 끝 인덱스를 사용하여 현재 페이지에 표시할 데이터를 가져옵니다.
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var currentPageData = data.slice(startIndex, endIndex);

    // 기존 테이블 제거
    var oldTable = document.getElementById("table");
    if (oldTable) {
      oldTable.remove();
    }
    // Create the table element
    var table = document.createElement("table");
    table.className = "table table-hover";
    table.id = "table";

    // Create the table header
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    var headers = ["번호", "제목", "작성자", "등록일", "조회수"];

    headers.forEach(function (headerText) {
      var th = document.createElement("th");
      th.style.width = "10%";
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    currentPageData.forEach(function (row) {
      var rowElement = document.createElement("tr");

      i = 0;
      row.forEach(function (cellData, index) {
        var cell = document.createElement("td");
        if (index === 0) {
          cell.style.width = "5%";
        }
        // /boards/post/:post_code 링크로 연결
        if (index === 1) {
          var a = document.createElement("a");
          a.href = "/boards/board.html?post_value=" + post_codes[i];
          a.appendChild(document.createTextNode(cellData));
          cell.appendChild(a);
        } else {
          cell.appendChild(document.createTextNode(cellData));
        }
        rowElement.appendChild(cell);
        tbody.appendChild(rowElement);
        i++;
      });
    });
    table.appendChild(tbody);

    // Add the table to the document body or a specific container
    var lec_table_container = document.getElementById("lec_table_container");
    lec_table_container.innerHTML = ""; // 기존 내용을 초기화
    lec_table_container.appendChild(table);

    // 페이지 네이션 버튼 생성
    var paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";

    var previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.className = "btn btn-primary previous-button";
    previousButton.appendChild(document.createTextNode("이전"));
    previousButton.addEventListener("click", goToPreviousPage);
    paginationContainer.appendChild(previousButton);

    for (var i = 1; i <= totalPages; i++) {
      var pageButton = document.createElement("button");
      pageButton.type = "button";
      pageButton.className = "btn btn-primary";
      if (i === currentPage) {
        pageButton.className += " current-page";
      }
      pageButton.appendChild(document.createTextNode(i));
      pageButton.addEventListener(
        "click",
        (function (page) {
          return function () {
            goToPage(page);
          };
        })(i)
      ); // 클로저로 현재의 i 값을 캡처하여 사용
      paginationContainer.appendChild(pageButton);
    }

    var nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "btn btn-primary next-button";
    nextButton.appendChild(document.createTextNode("다음"));
    nextButton.addEventListener("click", goToNextPage);
    paginationContainer.appendChild(nextButton);

    lec_table_container.appendChild(paginationContainer);
  }

  function goToPage(page) {
    // 현재 페이지 갱신
    currentPage = page;

    // 테이블 다시 렌더링
    renderTable();
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }

  // 초기 테이블 렌더링
  renderTable();
}

// 빈 테이블 생성
function basic_table() {
  var table = document.createElement("table");
  table.className = "table table-hover";
  table.id = "table";

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["번호", "제목", "작성자", "등록일", "조회수"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.style.width = "10%";
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  var tbody = document.createElement("tbody");
  var rowElement = document.createElement("tr");
  var cell = document.createElement("td");
  cell.appendChild(document.createTextNode("등록된 게시글이 없습니다."));
  cell.colSpan = 5;
  cell.style.textAlign = "center";
  rowElement.appendChild(cell);
  tbody.appendChild(rowElement);
  table.appendChild(tbody);

  // Add the table to the document body or a specific container
  var lec_table_container = document.getElementById("lec_table_container");
  lec_table_container.innerHTML = ""; // 기존 내용을 초기화
  lec_table_container.appendChild(table);
}

function openWritePopup() {
  document.getElementById("writePopup").style.display = "block";
}

function closeWritePopup() {
  var writePopup = document.getElementById("writePopup");
  writePopup.style.display = "none";
}

window.addEventListener("DOMContentLoaded", function () {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var year = urlParams.get("year");
  var semester = urlParams.get("semester");
  var lec_name = urlParams.get("lec_name");
  var lec_code = urlParams.get("lec_code");

  var ratingWriteTable = document.getElementById("rating_write_table");

  // 게시글 작성 폼 생성
  var form = document.createElement("form");
  form.classList.add("p-4", "bg-light");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // 작성된 게시글 내용을 처리하는 함수 호출
    handlePostFormSubmit();
  });

  // 제목 입력 필드
  var titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "제목";
  titleInput.classList.add("form-control", "mb-3");
  form.appendChild(titleInput);

  // 내용 입력 필드
  var contentTextarea = document.createElement("textarea");
  contentTextarea.placeholder = "내용";
  contentTextarea.classList.add("form-control", "mb-3");
  form.appendChild(contentTextarea);

  // 파일 입력 필드
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.classList.add("form-control", "mb-3");
  form.appendChild(fileInput);

  // 작성 버튼
  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "작성";
  submitButton.classList.add("btn", "btn-primary");
  form.appendChild(submitButton);

  ratingWriteTable.appendChild(form);

  function handlePostFormSubmit() {
    var title = titleInput.value;
    var content = contentTextarea.value;
    var file = fileInput.files[0];

    console.log("제목:", title);
    console.log("내용:", content);
    console.log("파일:", file);

    var formData = new FormData();
    formData.append("board_name", "과제게시판");
    formData.append("lecture_code", lec_code);
    formData.append("title", title);
    formData.append("post_contents", content);
    formData.append("file", file);

    axios
      .post("/boards/post/write", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // 게시글 작성 후 팝업안에 값 초기화
    titleInput.value = "";
    contentTextarea.value = "";
    fileInput.value = "";

    closeWritePopup();

    user_lec_boards(year, semester, lec_code);
  }
});
